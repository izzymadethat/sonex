import { useEffect, useState } from "react";
import { Eye, FolderKanban, Inbox, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  getProjects,
  selectAllProjects
} from "@/features/projects/projectsSlice";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import NewProjectFormPopup from "@/components/popups/NewProjectForm";

export default function ViewProjectsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(selectAllProjects);
  const formattedProjects = projects.map((project) => {
    const date = parseISO(project.createdAt);
    const timePeriod = formatDistanceToNow(date);
    const timeAgo = `${timePeriod} ago`;

    return {
      id: project._id,
      title: project.title,
      createdAt: timeAgo,
      status: project.status
    };
  });

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const handleDeleteProject = async (projectId) => {
    await dispatch(deleteProject(projectId));
  };
  return (
    <section className="m-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="mb-4 text-2xl font-bold">Projects</h3>
        <NewProjectFormPopup />
      </div>
      {formattedProjects.length === 0 ? (
        <div className="relative flex flex-col items-center justify-center p-10 text-center border-2 border-dashed h-fit">
          <FolderKanban size={64} className="dark:text-primary" />
          <h4 className="text-xl font-bold">You have no projects!</h4>
          <p className="max-w-sm">
            Start by creating a new project so that you can work with your
            clients and get paid.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formattedProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.createdAt}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell className="flex justify-center gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() =>
                            navigate(`/user/me/projects/${project.id}`)
                          }
                        >
                          <Eye />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="mt-4">
            <TableRow>
              <TableCell colSpan={3}>Total Projects</TableCell>
              <TableCell className="text-right">{projects.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </section>
  );
}
