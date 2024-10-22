import { Button } from "@/components/ui/button";
import { useState } from "react";

const UnfinishedComment = ({ projectNum, comment }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`flex items-center w-full gap-2 p-4 rounded-md shadow-md cursor-pointer ${
        clicked
          ? "bg-secondary-foreground/30"
          : "hover:bg-primary hover:font-bold bg-secondary hover:text-secondary"
      }`}
      onClick={() => setClicked(!clicked)}
    >
      <div className="w-4 h-4 rounded-full bg-primary"></div>
      <span className={clicked ? "line-through" : ""}>
        {clicked
          ? `Completed: ${comment.text}`
          : `${comment.text} : Project ${projectNum}`}
      </span>
    </div>
  );
};

const UnfinishedCommentsGrid = ({ unfinishedComments }) => {
  return (
    <div className="grid grid-cols-1 gap-2 max-h-[225px] lg:max-h-[300px] overflow-scroll px-6 lg:px-0">
      {unfinishedComments.map((comment) => (
        <UnfinishedComment
          key={comment.id}
          projectNum={comment.projectId}
          comment={comment}
        />
      ))}
      <Button>Mark all as completed</Button>
    </div>
  );
};

const UnfinishedComments = ({ comments }) => {
  const unfinishedComments = comments.filter(
    (comment) => !comment.isCompleted && comment.type === "revision"
  );

  return (
    <div className="w-full p-6 border rounded-md shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-bold uppercase">Unfinished Tasks:</h3>
        <p className="italic">Don&apos;t leave your clients hanging!</p>
      </div>

      {/* Unfinished Comments Grid */}
      <UnfinishedCommentsGrid unfinishedComments={unfinishedComments} />
    </div>
  );
};
export default UnfinishedComments;
