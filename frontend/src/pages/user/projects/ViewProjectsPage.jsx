import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
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
import { useSelector } from "react-redux";
import { selectAllProjects } from "@/features/projects/projectsSlice";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

export default function ViewProjectsPage() {
  const navigate = useNavigate();
  const projects = useSelector(selectAllProjects);
  const formattedProjects = projects.map((project) => {
    const date = parseISO(project.createdAt);
    const timePeriod = formatDistanceToNow(date);
    const timeAgo = `${timePeriod} ago`;

    return {
      id: project.id,
      title: project.title,
      createdAt: timeAgo,
      status: project.status
    };
  });

  const [selected, setSelected] = useState([]);
  return (
    <section className="m-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="mb-4 text-2xl font-bold">Projects</h3>
        <Button asChild>
          <Link to="new">New Project</Link>
        </Button>
      </div>
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
                      <Button variant="destructive">
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
    </section>
  );
}
