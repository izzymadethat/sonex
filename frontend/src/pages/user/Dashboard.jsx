import { Link } from "react-router-dom";
import { CreditCard, FolderOpenDot, User2 } from "lucide-react";
import { Divider, Button } from "@nextui-org/react";
import BtnSecondary from "../../components/buttons/BtnSecondary";
import { notifications } from "../../constants/notifications";
import NotificationCard from "../../components/customs/NotificationCard";
import { userExample } from "../../constants/user";
import "../../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="space-y-4 dashboard--layout">
        <div className="dashboard--header">
          <h1 className="text-3xl font-bold">Hello Dashboard</h1>
          <p className="text-sm italic">What should we do today?</p>
        </div>

        {/* Top level */}
        <div className="flex flex-col space-y-4">
          <section className="grid grid-cols-3 gap-4 text-background">
            <div className="w-full p-4 rounded-lg bg-primary">
              <h2 className="text-xl font-bold">Start a new project</h2>
              <Button>Go to Projects</Button>
            </div>
            <div className="w-full p-4 rounded-lg bg-primary">
              <h2 className="text-xl font-bold">Add A New Client</h2>
              <Button>Go to Clients</Button>
            </div>
            <div className="w-full p-4 rounded-lg bg-primary">
              <h2 className="text-xl font-bold">Record a Payment</h2>
              <Button>Manage Payments</Button>
            </div>
          </section>

          <section className="mt-8 space-y-6 At-a-glance">
            <div>
              <h3 className="text-xl font-bold uppercase">At a glance</h3>
              <Divider />
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 p-4 space-y-4 border-2 rounded-lg border-primary">
                <div>
                  <h4 className="text-lg font-bold text-primary">
                    Incomplete Tasks
                  </h4>
                  <Divider />
                </div>
                <Button>See all tasks</Button>
              </div>
              <div className="relative h-full col-span-2 p-4 space-y-4 overflow-y-auto border-2 rounded-lg border-primary">
                <div>
                  <h4 className="text-lg font-bold text-primary">
                    Notifications
                  </h4>
                  <Divider />
                </div>
                {notifications.map((notification) => (
                  <NotificationCard notification={notification} />
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="grid grid-cols-5 rounded-md border-3 border-primary">
          {/* Left section - Revisions/Feedback to Review */}
          <div className="col-span-2 px-4 py-2 space-y-4 overflow-y-scroll border-r-2 border-primary">
            <div>
              <h4 className="text-lg font-semibold uppercase">Payments</h4>
              <Divider />
            </div>
            <div className="flex flex-col gap-2"></div>
            <Button fullWidth>See all Payments</Button>
          </div>

          {/* Right section - Systemwide Notifications */}
          <div className="col-span-3 px-4 py-2 space-y-4">
            <div>
              <h4 className="text-lg font-semibold uppercase">
                Something will go here
              </h4>
              <Divider />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;

// const Dashboard = ({ user }) => {
//   return (
//     <div className="h-screen p-12 space-y-6 rounded-lg shadow-lg bg-neutral-900">
//       {/* Top grid (1fr 1fr) */}
//       <section className="grid grid-cols-2 gap-8">
//         {/* Left section -Get Started */}
//         <div className="flex flex-col items-center justify-center w-full space-y-2 border rounded-sm border-primary">
//           <p className="text-xs">
//             Welcome back, <span className="font-bold">{user.firstName}</span>!
//           </p>
//           <div>
//             <h2 className="text-xl font-bold">Get Started</h2>
//             <Divider />
//           </div>
//           <div className="flex flex-col text-xs text-center">
//             <Link to="projects/new" className="hover:text-primary">
//               Start a new project
//             </Link>
//             <Link to="clients/new" className="hover:text-primary">
//               Add a new client
//             </Link>
//           </div>
//         </div>

//         {/* Right section - Recent Projects */}
//         <div className="flex flex-col items-center justify-center w-full p-4 space-y-4 border rounded-sm border-primary">
//           <div className="text-center">
//             <h2 className="text-xl font-bold">Projects all done!</h2>
//             <p>Start a new one?</p>
//           </div>
//           <Button>Build a new project</Button>
//         </div>
//       </section>

//       {/* Quick access section */}
//       <section className="w-full space-y-2 overflow-x-auto">
//         <h4 className="text-xs font-bold uppercase">Quick Access</h4>
//         <div className="flex">
//           <div className="flex flex-grow flex-nowrap">
//             <BtnSecondary
//               text="Create project"
//               icon={<FolderOpenDot size={20} />}
//             />
//             <BtnSecondary text="Create client" icon={<User2 size={20} />} />
//             <BtnSecondary
//               text="View Payments"
//               icon={<CreditCard size={20} />}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Bottom grid (1fr 3fr) */}
//       <section className="grid h-full grid-cols-5 rounded-sm border-3 border-primary">
//         {/* Left section - Revisions/Feedback to Review */}
//         <div className="col-span-2 px-4 py-2 space-y-4 overflow-y-scroll border-r-2 border-primary">
//           <h4 className="text-xs font-semibold uppercase">Review Comments:</h4>
//           <div className="flex flex-col gap-2"></div>
//           <Button fullWidth>See all</Button>
//         </div>

//         {/* Right section - Systemwide Notifications */}
//         <div className="col-span-3 px-4 py-2 space-y-4">
//           <h3 className="text-xs font-semibold uppercase">Notifications</h3>
//           <div className="flex flex-col gap-4 my-4">
//             {notifications.map((notification) => (
//               <NotificationCard notification={notification} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
