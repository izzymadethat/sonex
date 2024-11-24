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
import BtnSecondary from "../../../components/buttons/SecondaryButton/BtnSecondary";
import { notifications } from "../../../constants/notifications";
import NotificationCard from "../../../components/informational/NotificationCard/NotificationCard";
import { userExample } from "../../../constants/user";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser, selectUser } from "@/store/userSlice";
import {
  getProjects,
  selectAllProjects
} from "@/store/projectSlice";
import RecentProjects from "./components/RecentProjects";
import { selectAllComments } from "@/store/commentSlice";
import UnfinishedComments from "./components/UnfinishedComments";
import SupportForm from "./components/SupportForm";
import NewProjectFormPopup from "@/components/popups/NewProjectForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { convertStorageInMBToGB } from "@/helper/equations";
import { add, format, formatDistanceToNow } from "date-fns";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser: user } = useSelector(selectUser);
  const projects = useSelector(selectAllProjects);
  const comments = useSelector(selectAllComments);
  const [loading, setLoading] = useState(true);
  const [totalStorageUsed, setTotalStorageUsed] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderedProjects, setOrderedProjects] = useState([]);

  // TODO: change test date to use actual subscription end date in dashboard
  const testSubscriptionEndDateObj = add(new Date(), { days: 18 });
  const testSubscriptionEndDate = format(testSubscriptionEndDateObj, "MMM dd");
  const testSubscriptionEndDateInTime = formatDistanceToNow(
    testSubscriptionEndDateObj
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getProjects());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const restoreAccountInfo = () => {
      // Order first 6 projects when data has been loaded/updated
      const projectsOrdered = projects
        .slice(0, 6)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      // Calculate total storage used and total revenue when projects change
      const calculatedTotalStorageUsed = projects.reduce((acc, curr) => {
        return (
          acc +
          (curr.storageUsed ? convertStorageInMBToGB(curr.storageUsed) : 0)
        );
      }, 0);

      const calculatedTotalRevenue = projects.reduce(
        (acc, curr) => acc + (curr.projectAmount || 0),
        0
      );

      setOrderedProjects(projectsOrdered);
      setTotalStorageUsed(calculatedTotalStorageUsed);
      setTotalRevenue(calculatedTotalRevenue);
    };

    restoreAccountInfo();
    setLoading(false);
  }, [projects]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 my-8 rounded-md shadow-md cursor-pointer">
        <Loader2 size={64} className="animate-spin" />
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
          <CardHeader>
            <div className="flex flex-col items-end md:items-center md:gap-4 md:my-6 lg:text-center lg:items-end lg:my-0 lg:gap-0">
              <h2>Total Storage Used </h2>
              <h3 className="flex flex-col items-center text-2xl font-bold md:text-4xl lg:flex-row xl:text-3xl ">
                <span>
                  {totalStorageUsed === 0
                    ? totalStorageUsed
                    : totalStorageUsed.toFixed(2)}
                  GB
                </span>
                {"  "}
                <span>/ 256 GB</span>
              </h3>
            </div>
          </CardHeader>
          {/* <CardFooter className="flex justify-end md:justify-center lg:justify-end">
            <Button>Upgrade Storage</Button>
          </CardFooter> */}
        </Card>
        <Card className="w-full h-full">
          <CardHeader className="flex flex-col items-end md:items-center md:gap-4 md:my-6 lg:text-center lg:items-end lg:my-0 lg:gap-0">
            <h2>Total Projects</h2>
            <h3 className="flex justify-center text-5xl font-bold lg:text-5xl">
              {projects.length}
            </h3>
          </CardHeader>
          <CardFooter className="flex justify-center lg:justify-end">
            {projects.length > 0 && (
              <Button onClick={() => navigate("/user/me/projects")}>
                View Projects
              </Button>
            )}
          </CardFooter>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>
            <div className="flex flex-col items-end md:items-center md:my-6 lg:text-center lg:items-end lg:my-0">
              <h2>Total Revenue</h2>
              <h3 className="text-4xl font-bold lg:text-5xl xl:text-4xl">
                ${totalRevenue.toFixed(2)}
              </h3>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>
            <div className="flex flex-col items-end md:items-center md:my-6 lg:text-center lg:items-end lg:my-0">
              <h2>Next Bill Due</h2>
              <h3 className="text-3xl font-bold xl:text-2xl md:text-2xl">
                {testSubscriptionEndDate} ({testSubscriptionEndDateInTime})
              </h3>
            </div>
          </CardHeader>
        </Card>
      </div>

      {projects.length > 0 ? (
        <RecentProjects projects={orderedProjects} />
      ) : (
        <NewProjectFormPopup
          triggerElement={
            <div className="flex items-center justify-center p-4 my-8 rounded-md shadow-md cursor-pointer bg-secondary hover:bg-primary hover:text-secondary">
              No projects! Click to create a new one.
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
