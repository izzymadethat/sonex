import { Link } from "react-router-dom";
import {
  CreditCard,
  DiscAlbum,
  DollarSign,
  FolderOpenDot,
  HardDrive,
  Mic2,
  Music2,
  User2
} from "lucide-react";
import BtnSecondary from "../../../components/buttons/BtnSecondary";
import { notifications } from "../../../constants/notifications";
import NotificationCard from "../../../components/customs/NotificationCard";
import { userExample } from "../../../constants/user";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import { selectAllProjects } from "@/features/projects/projectsSlice";
import RecentProjects from "./RecentProjects";
import { selectAllComments } from "@/features/comments/commentsSlice";
import UnfinishedComments from "./UnfinishedComments";
import SupportForm from "./SupportForm";

const SampleTask = ({ projectNum }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-md shadow-md cursor-pointer   ${
        clicked
          ? "bg-secondary-foreground/30"
          : "hover:bg-primary hover:font-bold bg-secondary hover:text-secondary"
      }`}
      onClick={() => setClicked(!clicked)}
    >
      <span className="w-5 h-5 border rounded-full shadow-sm bg-primary"></span>
      <span className={clicked ? "line-through" : ""}>
        {clicked
          ? `Completed: Task ${projectNum}`
          : `You'll need to complete task ${projectNum}`}
      </span>
    </div>
  );
};

// const UnfinishedCommentsGrid = () => {
//   return (
//     <div className="grid grid-cols-1 gap-2 max-h-[225px] lg:max-h-[300px] overflow-scroll px-6 lg:px-0">
//       {Array.from({ length: 5 }).map((_, index) => (
//         <SampleTask key={index} projectNum={index + 1} />
//       ))}
//       <Button>Mark all as completed</Button>
//     </div>
//   );
// };

function Dashboard() {
  const user = useSelector(selectUser);
  const projects = useSelector(selectAllProjects);
  const comments = useSelector(selectAllComments);
  const orderedProjects = projects
    .slice()
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="dashboard">
      <h1 className="my-4 text-3xl font-bold">Hello, {user.firstName}</h1>

      <div className="flex flex-col w-full mb-6">
        <h4 className="text-sm font-bold uppercase">Quick Actions:</h4>
        <div className="grid grid-cols-3 gap-2 my-2">
          <div
            className="flex items-center gap-2 p-2 transition-all duration-300 shadow-sm cursor-pointer rounded-2xl bg-secondary hover:bg-primary hover:-translate-y-2 hover:shadow-lg"
            onClick={() => alert("Page coming soon")}
          >
            <span className="p-4 border border-black rounded-full shadow-lg">
              <Mic2 size={16} />
            </span>
            <span className="text-sm font-bold">Start New Session</span>
          </div>
          <div
            className="flex items-center gap-2 p-2 transition-all duration-300 shadow-sm cursor-pointer rounded-2xl bg-secondary hover:bg-primary hover:-translate-y-2 hover:shadow-lg"
            onClick={() => alert("Page coming soon")}
          >
            <span className="p-4 border border-black rounded-full shadow-lg">
              <DollarSign size={16} />
            </span>
            <span className="text-sm font-bold">Record Payment</span>
          </div>
          <div
            className="flex items-center gap-2 p-2 transition-all duration-300 shadow-sm cursor-pointer rounded-2xl bg-secondary hover:bg-primary hover:-translate-y-2 hover:shadow-lg"
            onClick={() => alert("Page coming soon")}
          >
            <span className="p-4 border border-black rounded-full shadow-lg">
              <HardDrive size={16} />
            </span>
            <span className="text-sm font-bold">Add Storage</span>
          </div>
        </div>
      </div>

      {/* Projects. TODO: Replace with actual project data, sort recent projects by date, and add pagination */}
      {projects.length > 0 ? (
        <RecentProjects projects={orderedProjects} />
      ) : (
        <div className="flex items-center justify-center p-4 my-8 rounded-md shadow-md cursor-pointer bg-secondary hover:bg-primary hover:text-secondary">
          No projects found. Click to create a new one.
        </div>
      )}

      <div className="flex flex-col w-full gap-6 mb-6 lg:flex-row">
        {/* Unfinished tasks. TODO: Replace with actual task data, sort by date, and add pagination */}
        <UnfinishedComments comments={comments} />
        <SupportForm />
      </div>
    </div>
  );
}

export default Dashboard;
