import { selectUser } from "@/features/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import ReactAudioPlayer from "react-audio-player";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatTime } from "@/helper/formatters";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import NavigateBackTo from "@/components/global/NavigateBackTo";
import CommentsSideBar from "./components/CommentsSideBar";
import { getSingleFile, selectCurrentTrack } from "@/features/files/filesSlice";
import CommentForm from "./components/CommentForm";
import { MessageSquare } from "lucide-react";

const ViewSingleFilePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector(selectUser);
  const file = useSelector(selectCurrentTrack);
  const { projectId, fileName } = params;

  const [currentTime, setCurrentTime] = useState(0);
  const [isATimeStampedComment, setIsATimeStampedComment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState("");

  const audioRef = useRef(null);

  useEffect(() => {
    const existingClient = localStorage.getItem("clientEmail");
    if (existingClient) {
      setClient(existingClient);
    }
  }, []);

  useEffect(() => {
    const fetchFile = async () => {
      await dispatch(getSingleFile({ projectId, fileName }));
    };

    fetchFile();
  }, [dispatch, projectId, fileName]);

  // Keep track of song time while making comments
  useEffect(() => {
    const audioElement = audioRef.current.audioEl;
    if (audioElement) {
      const timePlayed = setInterval(() => {
        setCurrentTime(formatTime(audioElement.current.currentTime));
      }, 1000);

      return () => {
        clearInterval(timePlayed);
      };
    }
  }, [audioRef]);

  const handleTimestampCommentCheckChange = () =>
    setIsATimeStampedComment(!isATimeStampedComment);

  if (!file) {
    return <div>Loading...</div>;
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
        <CommentsSideBar />
      </div>
      {/* Player and Comment Button */}
      <div className="flex flex-col justify-center gap-4">
        <ReactAudioPlayer
          src={file.streamUrl}
          ref={audioRef}
          controls
          className="rounded-md"
        />
      </div>
      {/* Comment Form */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <CommentForm
            existingClient={client}
            timestamp={currentTime}
            isTimeStampedComment={isATimeStampedComment}
            onCheckedChange={handleTimestampCommentCheckChange}
            onClientEmailChange={setClient}
          />
        </div>
        <div className="flex flex-col items-center justify-center col-span-2 gap-4 p-8 text-center border-2 border-dashed rounded-md">
          <MessageSquare size={64} className="text-primary" />
          <p className="max-w-sm text-lg font-bold">
            You haven't made any comments yet.
          </p>
          <p className="italic max-w-52">
            Use the form to add your revision or provide feedback.
          </p>
        </div>
      </div>
      {/* <Card>
        <CardHeader className="text-xl">Make a comment</CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Input placeholder="Email address" />
            <Textarea placeholder="Enter your comment" rows={10} />
            <div className="flex gap-1">
              <Checkbox id="isTimeStampedComment" defaultChecked />
              <Label htmlFor="isTimeStampedComment">
                Add comment @ {currentTime}
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end">
          <Button type="button" onClick={handleSubmitComment}>
            Submit Comment
          </Button>
        </CardFooter>
      </Card> */}
    </div>
  );
};

export default ViewSingleFilePage;
