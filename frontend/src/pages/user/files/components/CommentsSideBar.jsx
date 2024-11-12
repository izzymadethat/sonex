import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByProject, updateComment, deleteComment } from '@/features/comments/commentsSlice';
import { useEffect } from 'react';
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CommentsSideBar = ({ user, projectId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state =>
    state.comments.commentsByProject?.[projectId] || []
  );
  const status = useSelector(state => state.comments.status);
  const error = useSelector(state => state.comments.error);

  useEffect(() => {
    if (projectId && status === 'idle') {
      dispatch(fetchCommentsByProject(projectId));
    }
  }, [dispatch, projectId, status]);

  if (error) {
    return <div>Error loading comments: {error}</div>;
  }

  if (status === 'loading') {
    return <div>Loading comments...</div>;
  }

  const clientId = localStorage.getItem('clientId');
  const emailMappings = JSON.parse(localStorage.getItem('emailMappings') || '{}');

  const handleCommentComplete = (comment) => {
    if (!user) return;
    dispatch(updateComment({
      ...comment,
      isCompleted: !comment.isCompleted,
      completedAt: !comment.isCompleted ? new Date().toISOString() : null
    }));
  };

  // Function to check if the current client owns a comment
  const isCommentOwner = (comment) => {
    return comment.clientId === clientId ||
      Object.keys(emailMappings).some(email =>
        email === comment.email && emailMappings[email] === clientId
      );
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(deleteComment({ projectId, commentId })).unwrap();
      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete comment. Please try again. ${error.message}`,
        variant: "destructive"
      });
    }
  };

  return (
    <>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="uppercase">Show Comments</Button>
        </SheetTrigger>
        <SheetContent className="max-h-screen overflow-y-auto">
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>
            Comments from your clients that have been submitted for review. Once
            you have completed the request, simply check it off. They will be
            notified of your completion
          </SheetDescription>

          <div className="mt-8 space-y-8">
            {comments.map((comment) => (
              <div key={comment._id} className="mt-4">
                <div className="flex items-center gap-4">
                  <h2 className="underline text-lg/relaxed">
                    {comment.email}
                  </h2>
                  {comment.type === "revision" ? (
                    <Badge className="text-sm">Revision</Badge>
                  ) : (
                    <Badge className="text-sm">Feedback</Badge>
                  )}
                  {comment.timestamp && (
                    <span className="text-sm text-muted-foreground">
                      @{comment.timestamp}
                    </span>
                  )}
                  {isCommentOwner(comment) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <form>
                    <input type="text" value={comment._id} className="hidden" />
                    <div className="flex items-center gap-2">
                      {comment.type === "revision" && user && (
                        <Checkbox
                          checked={comment.isCompleted}
                          onCheckedChange={() => { handleCommentComplete(comment); }}
                        />
                      )}
                      <p className={`max-w-xs leading-5 ${comment.isCompleted ? "line-through" : ""}`}>{comment.text}</p>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </div>

          {/* Option to check all */}
        </SheetContent>
      </Sheet>

    </>
  );
};
export default CommentsSideBar;
