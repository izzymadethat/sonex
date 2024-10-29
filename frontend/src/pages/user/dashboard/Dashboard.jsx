import { Link, useNavigate } from "react-router-dom";
import {
  CreditCard,
  DiscAlbum,
  DollarSign,
  FolderOpenDot,
  HardDrive,
  Loader2,
  Mic2,
  Music2,
  User2
} from "lucide-react";
import BtnSecondary from "../../../components/buttons/BtnSecondary";
import { notifications } from "../../../constants/notifications";
import NotificationCard from "../../../components/customs/NotificationCard";
import { userExample } from "../../../constants/user";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "@/features/user/userSlice";
import {
  getProjects,
  selectAllProjects
} from "@/features/projects/projectsSlice";
import RecentProjects from "./RecentProjects";
import { selectAllComments } from "@/features/comments/commentsSlice";
import UnfinishedComments from "./UnfinishedComments";
import SupportForm from "./SupportForm";
import NewProjectFormPopup from "@/components/popups/NewProjectForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { convertStorageInMBtoGB } from "@/helper/equations";
import { add, format, formatDistanceToNow } from "date-fns";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser: user, status } = useSelector(selectUser);
  const projects = useSelector(selectAllProjects);
  const comments = useSelector(selectAllComments);
  const orderedProjects = projects
    .slice(0, 6)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const totalStorageUsed = projects.reduce((acc, curr) => {
    const formattedStorage = parseFloat(curr.storageUsed.toFixed(2));
    return acc + convertStorageInMBtoGB(formattedStorage);
  }, 0);
  const totalMoney = projects.reduce(
    (acc, curr) => acc + curr.projectAmount,
    0
  );

  // TODO: change test date to use actual subscription end date in dashboard
  const testSubscriptionEndDateObj = add(new Date(), { days: 18 });
  const testSubscriptionEndDate = format(testSubscriptionEndDateObj, "MMM dd");
  const testSubscriptionEndDateInTime = formatDistanceToNow(
    testSubscriptionEndDateObj
  );

  useEffect(() => {
    if (user) {
      dispatch(getProjects());
    }
  }, [user, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center p-4 my-8 rounded-md shadow-md cursor-pointer bg-secondary hover:bg-primary hover:text-secondary">
        <Loader2 size={24} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="my-4 text-3xl font-bold">Hello, {user.firstName}!</h1>

      {/* TODO: The bottom is code for quick actions to be implemented in future update */}
      {/* <div className="flex flex-col w-full mb-6">
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
      </div> */}

      {/* Overall account statistics */}
      <div className="grid items-center justify-center h-full grid-cols-2 gap-8 my-8 text-center xl:gap-8 xl:grid-cols-4 xl:place-items-center xl:text-start xl:max-h-64">
        <Card className="w-full h-full">
          <CardHeader>Total Storage Used</CardHeader>
          <CardContent className="flex justify-center">
            <h3 className="flex flex-col items-center text-2xl font-bold lg:text-5xl">
              <span>{totalStorageUsed.toFixed(2)} GB</span>{" "}
              <span>/ 256 GB</span>
            </h3>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>Upgrade Storage</Button>
          </CardFooter>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>Total Projects</CardHeader>
          <CardContent>
            <h3 className="flex justify-center mb-6 text-5xl font-bold lg:text-7xl">
              {projects.length}
            </h3>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate("/user/me/projects")}>
              View Projects
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>Total Revenue</CardHeader>
          <CardContent>
            <h3 className="flex items-center text-5xl font-bold place-content-center place-items-center">
              ${totalMoney.toFixed(2)}
            </h3>
          </CardContent>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>Next Bill Due</CardHeader>
          <CardContent>
            <h3 className="text-3xl font-bold xl:text-5xl">
              {testSubscriptionEndDate} ({testSubscriptionEndDateInTime})
            </h3>
          </CardContent>
        </Card>
      </div>

      {projects.length > 0 ? (
        <RecentProjects projects={orderedProjects} />
      ) : (
        <NewProjectFormPopup
          triggerElement={
            <div className="flex items-center justify-center p-4 my-8 rounded-md shadow-md cursor-pointer bg-secondary hover:bg-primary hover:text-secondary">
              No projects found. Click to create a new one.
            </div>
          }
        />
      )}

      <div className="flex flex-col w-full gap-6 mb-6 lg:flex-row">
        <UnfinishedComments comments={comments} />
        <SupportForm />
      </div>
    </div>
  );
}

export default Dashboard;
