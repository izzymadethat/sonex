import { Link } from "react-router-dom";
import { CreditCard, FolderOpenDot, User2 } from "lucide-react";
import { Divider, Button } from "@nextui-org/react";
import BtnSecondary from "../../components/buttons/BtnSecondary";
import { notifications } from "../../constants/notifications";
import NotificationCard from "../../components/customs/NotificationCard";
import { userExample } from "../../constants/user";

const Dashboard = ({ user }) => {
  return (
    <div className="w-full space-y-8  bg-neutral-900 shadow-lg rounded-lg overflow-y-scroll">
      {/* Top grid (1fr 1fr) */}
      <section className="grid grid-cols-2 gap-8">
        {/* Left section -Get Started */}
        <div className="flex flex-col w-full justify-center items-center rounded-md  border border-primary space-y-2">
          <p className="text-xs">
            Welcome back, <span className="font-bold">{user.firstName}</span>!
          </p>
          <div>
            <h2 className="text-xl font-bold">Get Started</h2>
            <Divider />
          </div>
          <div className="flex flex-col text-center text-xs">
            <Link to="projects/new" className="hover:text-primary">
              Start a new project
            </Link>
            <Link to="clients/new" className="hover:text-primary">
              Add a new client
            </Link>
          </div>
        </div>

        {/* Right section - Recent Projects */}
        <div className="flex flex-col w-full items-center p-4 justify-center  rounded-md  border border-primary space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold">Projects all done!</h2>
            <p>Start a new one?</p>
          </div>
          <Button>Build a new project</Button>
        </div>
      </section>

      {/* Quick access section */}
      <section className="w-full space-y-2 overflow-x-auto">
        <h4 className="text-xs uppercase font-bold">Quick Access</h4>
        <div className="flex">
          <div className="flex flex-grow flex-nowrap">
            <BtnSecondary
              text="Create project"
              icon={<FolderOpenDot size={20} />}
            />
            <BtnSecondary text="Create client" icon={<User2 size={20} />} />
            <BtnSecondary
              text="View Payments"
              icon={<CreditCard size={20} />}
            />
          </div>
        </div>
      </section>

      {/* Bottom grid (1fr 3fr) */}
      <section className="grid grid-cols-5 border-3 h-full border-primary rounded-md">
        {/* Left section - Revisions/Feedback to Review */}
        <div className="col-span-2 px-4 py-2 border-r-2 border-primary overflow-y-scroll space-y-4">
          <h4 className="font-semibold uppercase text-xs">Review Comments:</h4>
          <div className="flex flex-col gap-2"></div>
          <Button fullWidth>See all</Button>
        </div>

        {/* Right section - Systemwide Notifications */}
        <div className="col-span-3 px-4 py-2 space-y-4">
          <h3 className="font-semibold text-xs uppercase">Notifications</h3>
          <div className="flex flex-col gap-4 my-4">
            {notifications.map((notification) => (
              <NotificationCard notification={notification} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
