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
import BtnSecondary from "../../components/buttons/BtnSecondary";
import { notifications } from "../../constants/notifications";
import NotificationCard from "../../components/customs/NotificationCard";
import { userExample } from "../../constants/user";
import { useState } from "react";
// import "../../styles/dashboard.css";

const ProjectSampleGrid = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 max-h-[225px] lg:max-h-[300px] overflow-scroll px-6 lg:px-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="flex items-center justify-center p-4 rounded-md shadow-md cursor-pointer bg-secondary hover:bg-primary hover:text-secondary">
            <div className="flex items-center gap-2 text-center">
              <span>
                <Music2 />
              </span>
              <span className="font-bold uppercase">
                Project #<span>{index + 1}</span>
              </span>
            </div>
          </div>
        ))}
        <button className="px-1 py-2 border rounded-md border-primary text-primary-foreground hover:bg-secondary-foreground hover:text-primary hover:border-transparent">
          View All Projects
        </button>
      </div>
    </>
  );
};

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

const UnfinishedCommentsGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-2 max-h-[225px] lg:max-h-[300px] overflow-scroll px-6 lg:px-0">
      {Array.from({ length: 5 }).map((_, index) => (
        <SampleTask key={index} projectNum={index + 1} />
      ))}
      <button className="px-1 py-2 border rounded-md border-primary text-primary-foreground hover:bg-secondary-foreground hover:text-primary hover:border-transparent">
        Mark all as completed
      </button>
    </div>
  );
};

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="my-4 text-3xl font-bold">Hello, User</h1>

      <div className="flex flex-col w-full mb-6">
        <h4 className="text-sm font-bold uppercase">Quick Actions:</h4>
        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="flex items-center gap-2 p-2 transition-all duration-300 shadow-sm cursor-pointer rounded-2xl bg-secondary hover:bg-primary hover:-translate-y-2 hover:shadow-lg">
            <span className="p-4 border border-black rounded-full shadow-lg">
              <Mic2 size={16} />
            </span>
            <span className="text-sm font-bold">Start New Session</span>
          </div>
          <div className="flex items-center gap-2 p-2 transition-all duration-300 shadow-sm cursor-pointer rounded-2xl bg-secondary hover:bg-primary hover:-translate-y-2 hover:shadow-lg">
            <span className="p-4 border border-black rounded-full shadow-lg">
              <DollarSign size={16} />
            </span>
            <span className="text-sm font-bold">Record Payment</span>
          </div>
          <div className="flex items-center gap-2 p-2 transition-all duration-300 shadow-sm cursor-pointer rounded-2xl bg-secondary hover:bg-primary hover:-translate-y-2 hover:shadow-lg">
            <span className="p-4 border border-black rounded-full shadow-lg">
              <HardDrive size={16} />
            </span>
            <span className="text-sm font-bold">Add Storage</span>
          </div>
        </div>
      </div>

      {/* Projects. TODO: Replace with actual project data, sort recent projects by date, and add pagination */}
      <div className="w-full p-6 mb-6 border rounded-md shadow-md">
        <div className="mb-4">
          <h3 className="text-lg font-bold uppercase">Recent Projects:</h3>
          <p className="italic">Get back to it...</p>
        </div>
        <ProjectSampleGrid />
      </div>

      <div className="flex flex-col w-full gap-6 mb-6 border lg:flex-row">
        {/* Unfinished tasks. TODO: Replace with actual task data, sort by date, and add pagination */}
        <div className="w-full p-6 border rounded-md shadow-md">
          <div className="mb-4">
            <h3 className="text-lg font-bold uppercase">Unfinished Tasks:</h3>
            <p className="italic">Don&apos;t leave your clients hanging!</p>
          </div>
          <UnfinishedCommentsGrid />
        </div>

        {/* Contact support..for now TODO: set button to be disabled if no message is entered */}
        <div className="w-full p-6 border rounded-md shadow-md">
          <div className="mb-4">
            <h3 className="text-lg font-bold uppercase">Contact Support:</h3>
            <p className="italic">
              Questions? Issues? Want to give feedback? Submit here and we'll
              contact you within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border rounded-md border-primary"
              placeholder="Enter your first name"
            />
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border rounded-md border-primary"
              placeholder="Enter your best email address  "
            />

            <textarea
              name="message"
              id="message"
              rows={5}
              className="w-full p-2 border rounded-md border-primary"
              placeholder="Enter your message"
            ></textarea>
            <button
              className="w-full p-2 rounded-lg hover:bg-primary bg-secondary"
              onClick={() => alert("Feature coming soon")}
            >
              Submit your message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
