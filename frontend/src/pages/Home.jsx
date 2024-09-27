import { Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react";
import FancyButton from "../components/FancyButton";

const Home = () => {
  return (
    <div>
      <header className="flex justify-between">
        <div>Logo</div>
        <nav>
          <ul className="flex gap-4">
            <li>
              <a href="#">Product</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
          </ul>
        </nav>
        <div>
          <button>Login</button>
          <button>Signup</button>
        </div>
      </header>

      <section className="grid grid-cols-5">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold">
            Safe and Secure audio collaboration and communication for you and
            your clients
          </h1>
          <p>
            Sonex is a web-based platform built for audio collaborators to serve
            as an all-in-one project management platform
          </p>
          <FancyButton />
        </div>
      </section>

      {/* Features */}
      <h2>Why Sonex?</h2>
      <section className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <h3>All in one Platform</h3>
          </CardHeader>
          <CardBody>
            No more jumping between tools. Store your audio sessions, manage
            client projects, handle payments, and communicate—all in one place.
            <ul>
              <li>Unlimited Projects</li>
              <li>
                No More Juggling Multiple Services: Manage everything easily,
                from one platform.
              </li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3>Seamless Client Collaboration</h3>
          </CardHeader>
          <CardBody>
            Add clients, collaborate effortlessly, and keep everything organized
            in one space.
            <ul>
              <Tooltip
                showArrow
                content="Client must verify email to gain access to projects."
              >
                <li>
                  Clients Don’t Need Accounts: They can upload files, request
                  revisions, and pay—without ever having to log in!*
                </li>
              </Tooltip>
              <li>
                Streamlined Workflow: Keep track of revisions, payments, and
                communications without searching through emails and messages
              </li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3>Open-Source Flexibility</h3>
          </CardHeader>
          <CardBody>
            Need custom features? Sonex is open-source! You can download the
            code, tweak it, and make it your own.
            <ul>
              <li>
                For developers, Sonex is more than just a tool—it's a platform
                you can build on.
              </li>

              <li>
                Built by pros, for pros: Designed and maintained by a passionate
                team of developers and audio professionals.
              </li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3>No Lost Revisions, No Late Payments </h3>
          </CardHeader>
          <CardBody>
            Need custom features? Sonex is open-source! You can download the
            code, tweak it, and make it your own.
            <ul>
              <li>
                We take care of it. Keep all client revisions in one spot, and
                when it’s time for payment, files remain locked behind a paywall
                until the payment clears. You’ll never have to worry about late
                payments again.
              </li>
            </ul>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};

export default Home;
