import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const CommentForm = ({
  onSubmit,
  existingClient,
  timestamp,
  isTimeStampedComment,
  onCheckedChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thoughts?</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={onSubmit}>
          <Input
            name="client-name"
            placeholder="Your name"
            defaultValue={existingClient?.client_name}
            required
          />
          <Input
            name="client-email"
            placeholder="Your email"
            defaultValue={existingClient?.client_email}
            required
          />
          <Textarea
            name="client-comment"
            placeholder="Enter your thoughts (200 characters max)"
            maxLength={200}
            required
          />

          <div>
            <div>
              <Checkbox
                name="comment-timestamp"
                checked={isTimeStampedComment}
                onCheckedChange={onCheckedChange}
              />
              <Label>Leave a comment @ {timestamp} </Label>
            </div>

            <Button>Submit Comment</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default CommentForm;
