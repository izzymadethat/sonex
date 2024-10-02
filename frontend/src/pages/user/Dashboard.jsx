import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CreditCard, FolderOpenDot, User2 } from "lucide-react";
import { Divider, Button } from "@nextui-org/react";

import Sidebar from "../../components/Sidebar";
import BtnSecondary from "../../components/BtnSecondary";
import { notifications } from "../../constants/notifications";
import NotificationCard from "../../components/NotificationCard";

const userExample = {
  id: 1,
  firstName: "Izzy",
  lastName: "Vickers",
  email: "izzy@gmail.com",
  username: "izzyvickers",
  bio: "I am a software engineer turned musician",
  isVerified: true,
  // avatar:
  //   "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611704.jpg?w=740&t=st=1727365641~exp=1727366241~hmac=9e4ba6e22ae261c2d643eb541ecd70240381ffe90ed5e0a529e008cef6e997c4",

  projects: [
    {
      id: 1,
      userId: 1,
      title: "Project 1",
      description: "This is project 1",
      status: "active",
      projectAmount: 100,
      paymentStatus: "unpaid",
      clients: [
        {
          name: "The best client",
          email: "client@gmail.com",
          isVerified: true
        }
      ],
      comments: [
        {
          text: "This hasn't been started yet",
          clientId: [
            {
              name: "The best client",
              email: "client@gmail.com",
              isVerified: true
            }
          ],
          projectId: 1,
          timestamp: "01:34",
          isCompleted: false,
          type: "revision"
        },
        {
          text: "This is just a comment about the song",
          clientId: [
            {
              name: "The best client",
              email: "client@gmail.com",
              isVerified: true
            }
          ],
          projectId: 1,
          timestamp: null,
          isCompleted: true,
          type: "general feedback"
        }
      ]
    }
  ],

  clients: [
    {
      name: "The best client",
      email: "client@gmail.com",
      isVerified: true
    }
  ]
};

const Dashboard = ({ user }) => {
  return (
    <main className="w-full my-4 space-y-4 p-12 bg-neutral-900 shadow-lg rounded-lg overflow-scroll">
      {/* Top grid (1fr 1fr) */}
      <section className="grid grid-cols-2 gap-4 py-2">
        {/* Left section -Get Started */}
        <div className="flex flex-col w-full justify-center items-center rounded-md bg-neutral-900 border border-primary space-y-2">
          <p className="text-xs">
            Welcome back, <span className="font-bold">{user.firstName}</span>!
          </p>
          <div>
            <h2 className="text-lg font-bold">Get Started</h2>
            <Divider />
          </div>
          <div className="flex flex-col text-center">
            <Link to="projects/new" className="text-sm hover:text-primary">
              Start a new project
            </Link>
            <Link to="clients/new" className="text-sm hover:text-primary">
              Add a new client
            </Link>
          </div>
        </div>

        {/* Right section - Recent Projects */}
        <div className="flex flex-col w-full items-center p-4 justify-center  rounded-md bg-neutral-900 border border-primary space-y-4">
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
    </main>
  );
};

export default Dashboard;
