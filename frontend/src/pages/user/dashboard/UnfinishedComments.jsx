import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  findProjectById,
  selectAllProjects
} from "@/features/projects/projectsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UnfinishedComment = ({ comment, projects }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");

  useEffect(() => {
    const getProjectTitle = async () => {
      const project = projects.find((p) => p._id === comment.projectId);
      setProjectTitle(project.title);
    };
    getProjectTitle();
  }, [dispatch]);

  return (
    <Badge
      className={`flex items-center w-full gap-2 p-4 rounded-md shadow-md cursor-pointer `}
      variant={clicked ? "" : "secondary"}
      onClick={() => setClicked(!clicked)}
    >
      <span className={clicked ? "line-through" : ""}>
        {clicked ? (
          `Completed: ${comment.text}`
        ) : (
          <>
            {comment.text} :{" "}
            <span className="font-bold uppercase">{projectTitle}</span>
          </>
        )}
      </span>
    </Badge>
  );
};

const UnfinishedCommentsGrid = ({ unfinishedComments }) => {
  const projects = useSelector(selectAllProjects);
  return (
    <div className="grid grid-cols-1 gap-2 max-h-[225px] lg:max-h-[300px] overflow-scroll px-6 lg:px-0">
      {unfinishedComments.map((comment) => (
        <UnfinishedComment
          key={comment.id}
          comment={comment}
          projects={projects}
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
