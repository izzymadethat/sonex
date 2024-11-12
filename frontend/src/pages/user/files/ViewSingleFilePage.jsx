import { selectUser } from "@/features/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/helper/formatters";
// import { Card, CardHeader } from "@/components/ui/card";
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
import { Loader2 } from "lucide-react";
import {
  fetchCommentsByProject,
  // selectCommentsByProject
} from "@/features/comments/commentsSlice";
import {
  // getProjects,
  getSingleProject,
  selectCurrentProject
} from "@/features/projects/projectsSlice";
import Loader from "@/components/informational/Loader/Loader";
// import CustomAudioPlayer from "./components/AudioPlayer";
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
  }

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
};

const ViewSingleFilePage = () => {
  const params = useParams();
  const { projectId, fileName } = params;
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector(selectUser);
  const currentProject = useSelector(selectCurrentProject);
  const file = useSelector(selectCurrentTrack);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [isTimestampedComment, setIsTimestampedComment] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Always fetch the file
        await dispatch(getSingleFile({ projectId, fileName }));
        await dispatch(fetchCommentsByProject(projectId));

        // Only fetch additional data if user is authenticated
        if (user) {
          await dispatch(getSingleProject(projectId));
          await dispatch(fetchProjectFiles(projectId));
        }
      } catch (error) {
        toast({
          title: "Error",
          description: `Could not load the file. (${error.message})`,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch, projectId, fileName, user]);

  useEffect(() => {
    if (user) {
      setClient("");
    } else {
      setClient(localStorage.getItem("clientEmail") || "");
    }
  }, [user]);

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
    setIsTimestampedComment(!isTimestampedComment);

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

  if (!file || loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl p-8 mx-auto space-y-8 lg:max-w-4xl">
      {user && (
        <NavigateBackTo
          route={`/user/me/projects/${params.projectId}`}
          pageName="this project details"
        />
      )}

      {/* Track Information */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-4xl font-bold">{file.name}</h2>
          {user && (
            <p>
              uploaded by {user.firstName} /{" "}
              <span>added on {file.createdAt}</span>
            </p>
          )}
        </div>

        {user && (
          <ClientActionButton
            project={currentProject}
            onPaymentClick={handlePayment}
            onDownloadClick={handleDownload}
            paymentLoading={paymentLoading}
          />
        )}

        {user && <CommentsSideBar user={user} projectId={projectId} />}
      </div>

      {/* Player */}
      <div className="flex flex-col justify-center gap-4">
        <audio
          src={file.streamUrl}
          ref={audioRef}
          controls={true}
          className="rounded-sm"
        >
          <track kind="captions" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Comment Form - Only show if user is authenticated */}
      {!user && (
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <CommentForm
              existingClient={client}
              timestamp={file.currentTime}
              isTimeStampedComment={isTimestampedComment}
              onCheckedChange={handleTimestampCommentCheckChange}
              onClientEmailChange={setClient}
              projectId={projectId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSingleFilePage;
