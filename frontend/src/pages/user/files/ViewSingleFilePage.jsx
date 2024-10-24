import { selectUser } from "@/features/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
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

const ViewSingleFilePage = () => {
  const params = useParams();
  const user = useSelector(selectUser);
  const client = !user;

  const [currentTime, setCurrentTime] = useState(0);
  const [isATimeStampedComment, setIsATimeStampedComment] = useState(true);
  const [loading, setLoading] = useState(false);

  const audioRef = useRef(null);

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

  // Submit comment
  const handleSubmitComment = () => {
    console.log("Submitting comment...");
  };

  const handleTimestampCommentCheckChange = () =>
    setIsATimeStampedComment(!isATimeStampedComment);

  return (
    <div className="max-w-2xl p-8 mx-auto space-y-8 lg:max-w-4xl">
      <NavigateBackTo
        route={`/user/me/projects/${params.projectId}`}
        pageName="this project details"
      />
      {/* Track Information */}
      <div>
        <h2 className="text-4xl font-bold ">Song Name</h2>
        <p>uploaded by user</p>
      </div>
      {/* Player and Comment Button */}
      <div className="flex flex-col justify-center gap-4">
        <ReactAudioPlayer
          src="https://cdn.pixabay.com/audio/2024/10/18/audio_883a8b2ed8.mp3"
          ref={audioRef}
          controls
          className="rounded-md"
        />
      </div>
      <Card>
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
      </Card>
    </div>
  );
};

export default ViewSingleFilePage;
