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
import { fetchCommentsByProject, selectCommentsByProject, updateComment } from '@/features/comments/commentsSlice';
import { useEffect } from 'react';

const CommentsSideBar = ({ user, projectId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state =>
    state.comments.commentsByProject?.[projectId] || []
  );
  const status = useSelector(state => state.comments.status);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchCommentsByProject(projectId));
    }
  }, [dispatch, projectId]);

  const handleCommentComplete = (comment) => {
    dispatch(updateComment({
      ...comment,
      isCompleted: !comment.isCompleted,
      completedAt: !comment.isCompleted ? new Date().toISOString() : null
    }));
  };

  return (
    <>
      {status === 'loading' ? (
        <div>Loading comments...</div>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="uppercase">Show all revisions</Button>
          </SheetTrigger>
          <SheetContent className="max-h-screen overflow-y-auto">
            <SheetTitle>Revisions</SheetTitle>
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
                  </div>
                  <div className="flex items-center gap-4">
                    <form>
                      <input type="text" value={comment.id} className="hidden" />
                      <div className="flex items-center gap-2">
                        {comment.type === "revision" && (
                          <Checkbox
                            checked={comment.isCompleted}
                            onCheckedChange={() => { handleCommentComplete(comment); }}
                          />
                        )}
                        <p className="max-w-xs leading-5">{comment.text}</p>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>

            {/* Option to check all */}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};
export default CommentsSideBar;
