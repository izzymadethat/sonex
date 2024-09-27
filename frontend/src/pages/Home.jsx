import { Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react";
import FancyButton from "../components/FancyButton";
import Header from "../sections/Header";
import PricingPlan from "../components/PricingPlan";
import Features from "../sections/Features";

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
        <Features />
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
