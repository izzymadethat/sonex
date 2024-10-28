import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card";

import { convertStorageInMBtoGB } from "@/helper/equations";
import FileTable from "./FileTable";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2 } from "lucide-react";
import EditProjectForm from "@/components/popups/EditProjectForm";
import CopyProjectLink from "@/components/popups/CopyProjectLink";
import NavigateBackTo from "@/components/global/NavigateBackTo";
import {
  getSingleProject,
  selectCurrentProject
} from "@/features/projects/projectsSlice";
import { useEffect } from "react";
import PaymentStatusBadge from "./components/PaymentStatusBadge";
import ProjectStatusBadge from "./components/ProjectStatusBadge";
import {
  fetchProjectFiles,
  selectProjectFiles
} from "@/features/files/filesSlice";
import { fetchCommentsByProject } from "@/features/comments/commentsSlice";

const ViewSingleProjectPage = () => {
  const params = useParams();
  const { projectId } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector(selectCurrentProject);
  const files = useSelector(selectProjectFiles);
  const totalFileSize = files.reduce((acc, file) => acc + file.size, 0);
  // payment status badge

  useEffect(() => {
    dispatch(getSingleProject(projectId));
    dispatch(fetchCommentsByProject(projectId));
    dispatch(fetchProjectFiles(projectId));
  }, [dispatch, projectId]);

  if (!project) return <p>Loading...</p>;
  return (
    <section className="m-8 space-y-8">
      {/* Project Details */}
      <div className="grid items-center justify-between grid-cols-1 space-y-4 lg:space-y-0 lg:grid-cols-5">
        <div className="flex flex-col items-center justify-center col-span-3 gap-4 lg:items-start">
          <NavigateBackTo route="/user/me/projects" pageName="projects" />
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <ProjectStatusBadge projectStatus={project.status} />
            <PaymentStatusBadge paymentStatus={project.paymentStatus} />
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Project Buttons */}
        <div className="flex items-center gap-4">
          <EditProjectForm project={project} />
          <CopyProjectLink project={project} />
        </div>
      </div>

      {/* Project Overview and Stats */}
      <div className="grid items-start grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg lg:text-xl">
                Project Balance
              </CardTitle>
              <CardDescription className="text-lg font-extrabold text-muted-foreground">
                {project.paymentStatus === "no-charge"
                  ? `No Charge`
                  : `$${project.projectAmount.toFixed(2)}`}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg lg:text-xl">Storage Used</CardTitle>
              <CardDescription className="text-lg font-extrabold text-muted-foreground">
                {convertStorageInMBtoGB(project.storageUsed)}Gb / 256Gb
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* TODO: Add Clients View (Later update) */}
      <FileTable projectId={params.projectId} />
    </section>
  );
};

export default ViewSingleProjectPage;
