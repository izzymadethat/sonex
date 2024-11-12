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
import { toast } from "@/hooks/use-toast";
// import { formatTime } from "@/helper/formatters";

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
  const [currentTimestamp, setCurrentTimestamp] = useState(timestamp || "00:00");

  // Generate a persistent client ID if it doesn't exist
  useEffect(() => {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      const newClientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('clientId', newClientId);
    }
  }, []);

  // Update the timestamp when it changes from props
  useEffect(() => {
    if (timestamp) {
      setCurrentTimestamp(timestamp);
    }
  }, [timestamp]);

  useEffect(() => {
    if (existingClient) {
      setEmailInput(existingClient);
    }
  }, [existingClient]);

  // Submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    const clientId = localStorage.getItem('clientId');
    const formData = {
      email: emailInput,
      text: commentInput,
      type: isTimeStampedComment ? "revision" : "feedback",
      timestamp: isTimeStampedComment ? currentTimestamp : null,
      clientId, // Add persistent client ID
      userAgent: window.navigator.userAgent // Keep as backup identifier
    };

    try {
      await dispatch(addComment({ projectId, comment: formData }));

      // Store the email mapping to the client ID
      const emailMappings = JSON.parse(localStorage.getItem('emailMappings') || '{}');
      emailMappings[emailInput] = clientId;
      localStorage.setItem('emailMappings', JSON.stringify(emailMappings));

      // Store current email
      localStorage.setItem('clientEmail', emailInput);

      if (onClientEmailChange) {
        onClientEmailChange(emailInput);
      }

      toast({
        title: "Comment submitted",
        description: "Your comment has been submitted successfully"
      });

      setCommentInput("");

    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to submit comment. Please try again. (${error.message})`,
        variant: "destructive"
      });
    }
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
              <Label>Leave a comment @ {currentTimestamp}</Label>
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
