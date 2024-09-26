import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bug, CircleUserRound, CreditCard, SquareLibrary } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Button,
} from "@nextui-org/react";
import GoPremiumButton from "../../components/GoPremiumButton";
import FancyButton from "../../components/FancyButton";
import FancyCheckbox from "../../components/FancyCheckbox";

const userExample = {
  id: 1,
  firstName: "Izzy",
  lastName: "Vickers",
  email: "izzy@gmail.com",
  username: "izzyvickers",
  bio: "I am a software engineer turned musician",
  isVerified: true,
  avatar:
    "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611704.jpg?w=740&t=st=1727365641~exp=1727366241~hmac=9e4ba6e22ae261c2d643eb541ecd70240381ffe90ed5e0a529e008cef6e997c4",

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
          isVerified: true,
        },
      ],
      comments: [
        {
          text: "This hasn't been started yet",
          clientId: [
            {
              name: "The best client",
              email: "client@gmail.com",
              isVerified: true,
            },
          ],
          projectId: 1,
          timestamp: "01:34",
          isCompleted: false,
          type: "revision",
        },
        {
          text: "This is just a comment about the song",
          clientId: [
            {
              name: "The best client",
              email: "client@gmail.com",
              isVerified: true,
            },
          ],
          projectId: 1,
          timestamp: null,
          isCompleted: true,
          type: "general feedback",
        },
      ],
    },
  ],

  clients: [
    {
      name: "The best client",
      email: "client@gmail.com",
      isVerified: true,
    },
  ],
};

const Dashboard = () => {
  const [user, setUser] = useState(userExample);

  return (
    <div className="flex w-full">
      {/* Sidebar navigation */}
      <aside className="border-r-2 border-gray-200 max-w-[250px] min-h-screen overflow-y-auto p-6 flex flex-col gap-8">
        <h2 className="text-3xl font-bold">
          Sonex <span className="text-xs">Beta</span>
        </h2>
        <Divider className="bg-gray-200" />
        <nav className="flex flex-col gap-2 flex-grow">
          <NavLink to="/user/@me/clients" className="flex items-center gap-2">
            <CircleUserRound /> Clients
          </NavLink>

          <NavLink to="/user/@me/projects" className="flex items-center gap-2">
            <SquareLibrary /> Projects
          </NavLink>

          <NavLink to="/user/@me/payments" className="flex items-center gap-2">
            <CreditCard />
            Your Payments
          </NavLink>

          <NavLink to="#" className="flex items-center gap-2">
            <Bug />
            Feedback/Report Bug
          </NavLink>
        </nav>
        <div className="flex flex-col gap-4 items-start">
          <Dropdown className="bg-[#212121]">
            <DropdownTrigger>
              <User
                name={user.firstName}
                description={user.email}
                avatarProps={{
                  src: user.avatar,
                }}
                className="cursor-pointer"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="billing">Account Billing</DropdownItem>
              <DropdownItem key="support">Support</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <GoPremiumButton />
          <p className="text-xs text-gray-500">
            Copyright &copy; 2024 by 8iVisions. View and Contribute to Source
            Code on my Github
          </p>
        </div>
        <footer>
          <p className="text-center text-sm text-neutral-400">
            Sonex v1.0.0-Beta
          </p>
        </footer>
      </aside>

      {/* Main content */}
      <main className="py-3 w-full">
        {/* Top grid (1fr 1fr) */}
        <section className="grid grid-cols-2">
          {/* Left section -Get Started */}
          <div className="flex flex-col w-full items-center p-4  border-r-2 border-gray-200">
            <p>
              Welcome back, <span className="font-bold">{user.firstName}</span>!
            </p>
            <h1 className="text-3xl font-bold mb-4 underline">Get Started</h1>
            <div className="flex flex-col gap-2">
              <Link to="user/@me/projects/new">Start a new project</Link>
              <Link to="user/@me/clients/new">Add a new client</Link>
            </div>
          </div>

          {/* Right section - Recent Projects */}
          <div className="flex flex-col w-full items-center p-4">
            <div className="flex flex-col gap-2 items-center mb-4">
              <h2 className="text-2xl font-bold">Projects all done!</h2>
              <p>Start a new one?</p>
            </div>
            <FancyButton />
          </div>
        </section>

        {/* Bottom grid (1fr 3fr) */}
        <section className="grid grid-cols-5 min-h-full border-t-2 border-gray-200">
          {/* Left section - Revisions/Feedback to Review */}
          <div className="col-span-2 p-4 border-r-2 border-gray-200 overflow-y-scroll">
            <h3 className="text-center font-semibold text-lg mb-4 ">
              For your review:
            </h3>
            <div className="flex flex-col gap-2">
              <Card className="bg-neutral-800 text-neutral-400">
                <CardHeader>
                  <div className="flex justify-between w-full">
                    <h3 className="uppercase font-bold text-sm text-yellow-300">
                      {user.projects[0].title}
                    </h3>

                    <Checkbox lineThrough className="text-neutral-300">
                      Mark as done
                    </Checkbox>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-lg font-bold">
                    {user.projects[0].clients[0].name}
                  </p>
                  <p>{user.projects[0].comments[0].text}</p>
                </CardBody>
                <CardFooter className="flex justify-between gap-2">
                  <span className="text-sm text-neutral-400">
                    @{user.projects[0].comments[0].timestamp} in song
                  </span>
                  <Button size="sm">View/Listen</Button>
                </CardFooter>
              </Card>
              <Card className="bg-neutral-800 text-neutral-400">
                <CardHeader>
                  <div className="flex justify-between w-full">
                    <h3 className="uppercase font-bold text-sm text-yellow-300">
                      {user.projects[0].title}
                    </h3>

                    <Checkbox lineThrough className="text-neutral-300">
                      Mark as done
                    </Checkbox>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-lg font-bold">
                    {user.projects[0].clients[0].name}
                  </p>
                  <p>{user.projects[0].comments[1].text}</p>
                </CardBody>
                <CardFooter className="flex justify-end gap-2">
                  <Button size="sm" className="">
                    View/Listen
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <Button fullWidth className="mt-4">
              See all
            </Button>
          </div>

          {/* Right section - Systemwide Notifications */}
          <div className="col-span-3 flex flex-col gap-2 p-4">
            <h3 className="font-semibold text-3xl mb-4">Notifications</h3>
            <div className="p-4 flex flex-col gap-4">
              <Card className="bg-neutral-800 text-neutral-400">
                <CardHeader>
                  <h4 className="text-yellow-400 font-bold text-sm">
                    Sonex Team | {new Date().toLocaleDateString()}
                  </h4>
                </CardHeader>
                <CardBody>
                  <h3 className="text-lg font-bold">
                    Welcome to version 1.0.0 Beta!
                  </h3>
                  <p>
                    As the first release of Sonex, we're excited to introduce
                    you to the barebones of our platform. We're constantly
                    working to improve and expand Sonex, and we're excited to
                    hear your feedback. Please use the feedback/bug report form
                    to let us know what you think.
                  </p>
                </CardBody>
                <CardFooter className="flex justify-end gap-2">
                  <Button size="sm">View details and projected updates</Button>
                </CardFooter>
              </Card>
              <Card className="bg-neutral-800 text-neutral-400">
                <CardHeader>
                  <h4 className="text-yellow-400 font-bold text-sm">
                    Sonex Team | {new Date().toLocaleDateString()}
                  </h4>
                </CardHeader>
                <CardBody>
                  <h3 className="text-lg font-bold">
                    Your contributions are appreciated!
                  </h3>
                  <p>
                    We're looking to provide an all in one solution for audio
                    professionals of all kinds. We believe that audio
                    freelancing should be seamless. If you're interested in our
                    mission, please consider making a contribution. Thank you!
                  </p>
                </CardBody>
                <CardFooter className="flex justify-end gap-2">
                  <Button size="sm">Make a contribution</Button>
                  <Button size="sm">View/Contribute to source code</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
