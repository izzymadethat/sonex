import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import FancyButton from "../components/FancyButton";
import Header from "../sections/Header";
import PricingPlan from "../components/PricingPlan";
import Features from "../sections/Features";
import { useState } from "react";
import { users } from "../constants";

const Home = () => {
  const [selected, setSelected] = useState("engineer");
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
      <section>
        <h2>Why Sonex?</h2>
        <div className="flex">
          <Features />
        </div>
      </section>

      {/* Ways to use sonex */}
      <section className="h-screen">
        <h2 className="text-5xl font-bold">Ways you can use Sonex</h2>
        <div className="my-8">
          <p>Use Sonex as:</p>
          <Tabs items={users} variant="bordered" isVertical>
            {(usr) => (
              <Tab key={usr.id} title={usr.tabTitle}>
                <div className="ml-10">
                  <h2 className="text-2xl font-extrabold">
                    Built for {usr.header}
                  </h2>
                  <div className="grid grid-cols-5">
                    <div className="col-span-2">
                      <h4 className="text-lg">{usr.contentTitle}</h4>
                      <p>{usr.content}</p>
                    </div>
                    <div className="col-span-3">
                      {usr.images.map((imgLink) => (
                        <img
                          src={imgLink}
                          alt={`Sonex works for ${usr.header}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Tab>
            )}
          </Tabs>
        </div>
      </section>

      {/* Pricing */}
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
