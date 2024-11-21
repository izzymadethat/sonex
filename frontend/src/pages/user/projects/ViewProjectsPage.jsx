import { useEffect, useState } from "react";
import { Eye, FolderKanban, Trash2 } from "lucide-react";
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
} from "@/store/projectSlice";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import NewProjectFormPopup from "@/components/popups/NewProjectForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ViewProjectsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(selectAllProjects);
  const formattedProjects = projects
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((project) => {
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

  const [deleteInput, setDeleteInput] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (!deleteDialogOpen) {
      setDeleteInput("");
    }
  }, [deleteDialogOpen]);

  const handleDeleteInput = (e) => {
    setDeleteInput(e.target.value);
  };
  const handleDeleteProject = async (projectId) => {
    await dispatch(deleteProject(projectId));
  };

  return (
    <section className="m-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="mb-4 text-2xl font-bold">Projects</h3>
        <NewProjectFormPopup triggerElement={<Button>New Project</Button>} />
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
                        <AlertDialog
                          open={deleteDialogOpen}
                          onOpenChange={setDeleteDialogOpen}
                        >
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                              <Trash2 />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirm Delete Project?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div>
                              <Label>
                                Type <em>'{project.title}'</em> to confirm
                              </Label>
                              <Input
                                type="text"
                                value={deleteInput}
                                onChange={handleDeleteInput}
                              />
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Take me back
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProject(project.id)}
                                disabled={deleteInput !== project.title}
                              >
                                Yes, delete this project
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
