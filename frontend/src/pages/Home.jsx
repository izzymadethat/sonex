import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spacer,
  Tab,
  Tabs,
  Tooltip
} from "@nextui-org/react";
import FancyButton from "../components/FancyButton";
import Header from "../sections/Header";
import PricingPlan from "../components/PricingPlan";
import Features from "../sections/Features";
import MarketedUsers from "../components/MarketedUsers";
import { faqs } from "../constants";
import Footer from "../sections/Footer";
import WhatsIncluded from "../sections/WhatsIncluded";
import HeaderChip from "../components/HeaderChip";

const Home = () => {
  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="h-screen  flex flex-col items-center justify-center">
        <h1 className="text-7xl text-center font-bold max-w-5xl">
          Audio{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent underline">
            collaboration and communication
          </span>{" "}
          for you and your clients.
        </h1>
        <Spacer y={8} />
        <p className="text-lg max-w-2xl text-center">
          Sonex is a seamless audio collaboration platform where you can store,
          share, and manage audio projects with clients, while handling payments
          and revisions all in one place.
        </p>
        <Spacer y={8} />
        <FancyButton />
      </section>

      {/* What's Included */}
      <WhatsIncluded />

      {/* Features */}
      <section className="mb-32">
        <HeaderChip text="Why Use Sonex?" />
        <Features />
      </section>

      {/* Ways to use sonex */}
      <section className="h-screen px-6 py-10 my-20">
        <HeaderChip text="How can I use Sonex?" />
        <div className="my-8">
          <p className="italic">Use Sonex as:</p>
          <MarketedUsers />
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-4 px-6 py-12 my-20">
        <HeaderChip text="Pricing" />
        <div className="max-w-4xl mx-auto space-y-8">
          <h3 className="text-4xl text-center">Choose your Sonex</h3>
          <PricingPlan />
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 py-12">
        <HeaderChip text="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto">
          <Accordion
            variant="splitted"
            className="p-2 flex flex-col gap-1 w-full"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} title={faq.question}>
                <p>{faq.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
