import { restoreUser, selectUser } from "@/features/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/helper/formatters";
import { Card, CardHeader } from "@/components/ui/card";
import NavigateBackTo from "@/components/global/NavigateBackTo";
import CommentsSideBar from "./components/CommentsSideBar";
import {
  fetchProjectFiles,
  getSingleFile,
  selectCurrentTrack,
  setCurrentTime,
  setPaused,
  setPlaying,
  setTrackDuration
} from "@/features/files/filesSlice";
import CommentForm from "./components/CommentForm";
import { Loader2, MessageSquare } from "lucide-react";
import {
  fetchCommentsByProject,
  selectCommentsByProject
} from "@/features/comments/commentsSlice";
import {
  getProjects,
  getSingleProject,
  selectCurrentProject
} from "@/features/projects/projectsSlice";
import Loader from "@/components/informational/Loader/Loader";
import CustomAudioPlayer from "./components/AudioPlayer";
import axiosInstance from "@/store/csrf";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const ClientActionButton = ({
  project,
  onPaymentClick,
  onDownloadClick,
  paymentLoading
}) => {
  if (
    project.paymentStatus === "paid" ||
    project.paymentStatus === "no-charge"
  ) {
    return <Button onClick={onDownloadClick}>Download This File</Button>;
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={paymentLoading}>
            {paymentLoading ? (
              <>
                <Loader2 className="animate-spin" />{" "}
                <span>Processing Payment</span>
              </>
            ) : (
              <span>Pay Project Amount</span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">
              Total Amount: ${project.projectAmount}
            </DialogTitle>
            <DialogDescription>
              Project must be paid in full in order to have download access
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input placeholder="1234 5678 9012 3456" />
            <div className="flex">
              <Input type="date" />
              <Input type="number" placeholder="123" />
              <Input type="number" placeholder="12345" />
            </div>
            <Input placeholder="Cardholder name" />
          </div>
          <DialogFooter>
            <Button onClick={onPaymentClick} disabled={paymentLoading}>
              {paymentLoading ? (
                <>
                  <Loader2 className="animate-spin" />{" "}
                  <span>Processing payment...</span>
                </>
              ) : (
                <>
                  Pay
                  <span className="font-bold">
                    ${project.projectAmount.toFixed(2)}
                  </span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

const ViewSingleFilePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector(selectUser);
  const currentProject = useSelector(selectCurrentProject);
  const projectComments = useSelector(selectCommentsByProject) || {};
  const file = useSelector(selectCurrentTrack);
  const { projectId, fileName } = params;

  // const [currentTime, setCurrentTime] = useState(0);
  const [isATimeStampedComment, setIsATimeStampedComment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [client, setClient] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const existingClient = localStorage.getItem("clientEmail");
    if (existingClient) {
      setClient(existingClient);
    } else {
      setClient("");
      dispatch(restoreUser());
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const fetchFile = async () => {
      await dispatch(getSingleFile({ projectId, fileName }));
    };

    const restoreAccountInfo = async () => {
      // Fetch the project files, comments, project details and files

      dispatch(getProjects());
      dispatch(getSingleProject(projectId));
      dispatch(fetchCommentsByProject(projectId));
      dispatch(fetchProjectFiles(projectId));
    };

    fetchFile();
    if (user) {
      restoreAccountInfo();
    }
    setLoading(false);
  }, [dispatch, projectId, fileName]);

  // Keep track of song time while making comments
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleTimeUpdate = () => {
        dispatch(setCurrentTime(formatTime(audioElement.currentTime)));
      };

      const handlePlay = () => {
        dispatch(setPlaying());
      };

      const handlePause = () => {
        dispatch(setPaused());
      };
      const handleLoadedMetadata = () => {
        dispatch(setTrackDuration(audioElement.duration));
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [dispatch, audioRef]);

  const handleTimestampCommentCheckChange = () =>
    setIsATimeStampedComment(!isATimeStampedComment);

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      await new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Could not process payment effectively."));
        }, 3000);
      });
    } catch (error) {
      toast({
        title: "Error while making payment",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const url = await axiosInstance.get(
        `/projects/${projectId}/uploads/${file.name}/download`
      );

      if (url) {
        setDownloadLink(url.data.downloadUrl);
      }
      // temporary link
      const link = document.createElement("a");
      link.href = downloadLink;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast({
        title: "Error while downloading file",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (!file || loading || !user || !audioRef) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-2xl p-8 mx-auto space-y-8 lg:max-w-4xl">
      <NavigateBackTo
        route={`/user/me/projects/${params.projectId}`}
        pageName="this project details"
      />
      {/* Track Information */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-4xl font-bold ">{file.name}</h2>
          <p>
            uploaded by {user.firstName} /{" "}
            <span>added on {file.createdAt}</span>
          </p>
        </div>

        {client && (
          <ClientActionButton
            project={currentProject}
            onPaymentClick={handlePayment}
            onDownloadClick={handleDownload}
            paymentLoading={paymentLoading}
          />
        )}
        {user && !client && <CommentsSideBar />}
      </div>
      {/* Player and Comment Button */}
      <div className="flex flex-col justify-center gap-4">
        <audio
          src={file.streamUrl}
          ref={audioRef}
          controls
          className="rounded-sm"
        />
      </div>

      {/*
      *** Future Update
      FIXME: Add a custom audio player 
      <CustomAudioPlayer audioSrc={file.streamUrl} /> 
      */}
      {/* Comment Form */}
      <div className="grid grid-cols-5 gap-4">
        {client && !user && (
          <>
            <div className="col-span-3">
              <CommentForm
                existingClient={client}
                timestamp={file.currentTime}
                isTimeStampedComment={isATimeStampedComment}
                onCheckedChange={handleTimestampCommentCheckChange}
                onClientEmailChange={setClient}
                projectId={projectId}
              />
            </div>
            <div className="flex flex-col items-center col-span-2 gap-4 p-8 text-center border-2 border-dashed rounded-md">
              {currentProject && currentProject.length > 0 ? (
                <>
                  {currentProject.map((comment) => (
                    <Dialog key={comment._id}>
                      <DialogTrigger asChild>
                        <Card
                          key={comment._id}
                          className="cursor-pointer hover:bg-primary hover:text-secondary"
                        >
                          <CardHeader>{comment.text}</CardHeader>
                        </Card>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <h4 className="text-2xl font-bold text-center">
                            {" "}
                            Comment type: {comment.type.toUpperCase()}
                          </h4>
                        </DialogHeader>
                        <div className="flex flex-col justify-center gap-4 text-center">
                          <p className="text-lg">{comment.text}</p>
                          {comment.type === "revision" && (
                            <p className="text-lg text-primary">
                              {" "}
                              Comment made by {comment.email || "you"} @{" "}
                              {comment.timestamp}
                            </p>
                          )}
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                          <Button variant="destructive">Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ))}
                </>
              ) : (
                <>
                  <MessageSquare size={64} className="text-primary" />
                  <p className="max-w-sm text-lg font-bold">
                    You haven't made any comments yet.
                  </p>
                  <p className="italic max-w-52">
                    Use the form to add your revision or provide feedback.
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewSingleFilePage;
