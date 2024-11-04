import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card";
import {
  convertFileSizeInBytestoMB,
  convertStorageInMBtoGB
} from "@/helper/equations";
import FileTable from "./FileTable";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditProjectForm from "@/components/popups/EditProjectForm";
import CopyProjectLink from "@/components/popups/CopyProjectLink";
import NavigateBackTo from "@/components/global/NavigateBackTo";
import {
  getProjects,
  getSingleProject,
  selectCurrentProject
} from "@/features/projects/projectsSlice";
import { useEffect, useState } from "react";
import PaymentStatusBadge from "./components/PaymentStatusBadge";
import ProjectStatusBadge from "./components/ProjectStatusBadge";
import {
  fetchProjectFiles,
  selectProjectFiles
} from "@/features/files/filesSlice";
import { fetchCommentsByProject } from "@/features/comments/commentsSlice";
import Loader from "@/components/informational/Loader/Loader";
import { restoreUser, selectUser } from "@/features/user/userSlice";
import { Button } from "@/components/ui/button";

const ViewSingleProjectPage = () => {
  const params = useParams();
  const { projectId } = params;
  const [searchParams] = useSearchParams();
  const isClientView = searchParams.get("client_view") === "true";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector(selectCurrentProject);
  const files = useSelector(selectProjectFiles);
  const [loading, setLoading] = useState(true);
  const [totalStorageUsed, setTotalStorageUsed] = useState(0);
  const { currentUser: user } = useSelector(selectUser);

  useEffect(() => {
    setLoading(true);
    const restoreAccountInfo = async () => {
      dispatch(restoreUser());
      // Fetch the project files, comments, project details and files
      dispatch(getProjects());
      dispatch(getSingleProject(projectId)).then(() => {
        dispatch(fetchCommentsByProject(projectId));
        dispatch(fetchProjectFiles(projectId));
      });
    };

    restoreAccountInfo().finally(() => setLoading(false));
  }, [dispatch, projectId]);

  // Every time a file is uploaded, recalculate the total storage used
  useEffect(() => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    setTotalStorageUsed(convertFileSizeInBytestoMB(totalSize));
  }, [files]);

  if (loading || !project) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-48rem)]">
        <Loader />
      </div>
    );
  }

  // Determine if the current user is the project owner
  const isOwner = project.userId === user._id;

  return (
    <section className="m-8 space-y-8">
      {isClientView && (
        <div>
          <h1 className="text-2xl font-bold uppercase">{project.title}</h1>
          <p className="italic">created by {user.username}</p>
          {isOwner && (
            <Button
              className="mt-4"
              onClick={() => {
                navigate(`/user/me/projects/${project._id}`);
              }}
            >
              View project as creator
            </Button>
          )}
        </div>
      )}

      {/* Project Details */}
      {isOwner && !isClientView && (
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
      )}

      {/* Project Overview and Stats */}
      {isOwner && !isClientView && (
        <div className="grid items-start grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg lg:text-xl">
                  Project Balance
                </CardTitle>
                <CardDescription className="text-lg font-bold text-muted-foreground">
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
                <CardTitle className="text-lg lg:text-xl">
                  Storage Used
                </CardTitle>
                <CardDescription className="text-lg font-bold text-muted-foreground">
                  {convertStorageInMBtoGB(totalStorageUsed).toFixed(2)}Gb /
                  256Gb
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      )}

      {/* TODO: Add Clients View (Later update) */}
      <FileTable projectId={params.projectId} />
    </section>
  );
};

export default ViewSingleProjectPage;
