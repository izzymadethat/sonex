import { Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react";
import FancyButton from "../components/FancyButton";
import Header from "../sections/Header";
import PricingPlan from "../components/PricingPlan";

const Home = () => {
  return (
    <div>
      <Header />
      <section>
        <div>
          <h1 className="text-2xl font-bold">
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
      <section className="flex">
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
                For developers, Sonex is more than just a tool — it's a platform
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
      <section>
        <h3>Pricing</h3>
        <div className="max-w-4xl mx-auto">
          <PricingPlan />
        </div>
      </section>
    </div>
  );
};

export default Home;
