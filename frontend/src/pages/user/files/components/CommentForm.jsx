import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "@/features/comments/commentsSlice";

const CommentForm = ({
  existingClient,
  timestamp,
  isTimeStampedComment,
  onCheckedChange,
  onClientEmailChange,
  projectId
}) => {
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const requiredInfoEntered = emailInput && commentInput;

  useEffect(() => {
    if (existingClient) {
      setEmailInput(existingClient);
    }
  }, [existingClient]);

  // Submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const formData = {
      email: emailInput,
      text: commentInput,
      type: isTimeStampedComment ? "revision" : "feedback"
    };
    if (isTimeStampedComment) {
      formData.timestamp = timestamp;
    }

    await dispatch(addComment({ projectId, comment: formData }));
    localStorage.setItem("clientEmail", emailInput);
    if (onClientEmailChange) {
      onClientEmailChange(emailInput);
    }
    setCommentInput("");
  };

  return (
    <Card>
      <CardHeader className="text-xl text-center">
        <CardTitle>Share Your Thoughts and Revisions</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Make a comment at the specific time you need to make a revision. You
          may also scroll through the song and pause at certain point. Comments
          unchecked are considered as feedback.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitComment} className="flex flex-col gap-4">
          <Input
            name="client-email"
            placeholder="Your email"
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
          <Textarea
            name="client-comment"
            placeholder="Enter your thoughts (200 characters max)"
            maxLength={200}
            required
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />

          <div>
            <div className="flex gap-1">
              <Checkbox
                name="comment-timestamp"
                checked={isTimeStampedComment}
                onCheckedChange={onCheckedChange}
              />
              <Label>Leave a comment @ {timestamp} </Label>
            </div>
          </div>
        </form>
        <CardFooter className="flex items-center justify-end">
          <Button
            type="button"
            disabled={!requiredInfoEntered}
            onClick={handleSubmitComment}
          >
            Submit Comment
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
export default CommentForm;
