import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spacer,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import FancyButton from "../components/FancyButton";
import Header from "../sections/Header";
import PricingPlan from "../components/PricingPlan";
import Features from "../sections/Features";
import MarketedUsers from "../components/MarketedUsers";

const Home = () => {
  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Audio collaboration and communication for you and your clients.
        </h1>
        <p>
          Sonex is a web-based platform built for audio collaborators to serve
          as an all-in-one project management platform.
        </p>
        <Spacer y={8} />
        <FancyButton />
      </section>

      {/* Features */}
      <section className="my-4">
        <h2 className="text-5xl text-center font-bold">Why Sonex?</h2>
        <Features />
      </section>

      {/* Ways to use sonex */}
      <section className="h-screen px-4">
        <h2 className="text-5xl font-bold">Ways you can use Sonex</h2>
        <div className="my-8">
          <p className="italic">Use Sonex as:</p>
          <MarketedUsers />
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-4">
        <h3 className="text-4xl text-center">Choose your Sonex</h3>
        <div className="max-w-4xl mx-auto">
          <PricingPlan />
        </div>
      </section>
    </div>
  );
};

export default Home;
