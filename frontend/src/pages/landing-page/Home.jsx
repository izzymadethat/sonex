import { FancyButton } from "../../components/buttons";
import {
  Header,
  Features,
  WhatsIncluded,
  Footer,
} from "../landing-page/sections";
import { PricingPlan, MarketedUsers } from "../../components/customs/sections";
import { HeaderChip } from "../../components/misc";
import { faqs } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "@/features/user/userSlice";
import { useEffect } from "react";
import { getProjects } from "@/features/projects/projectsSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser: user, status, error } = useSelector(selectUser);

  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/user/me", { replace: true });
  //   }
  // }, [user, navigate]);

  return (
    <div>
      <Header user={user} />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center h-screen space-y-8">
        <h1 className="max-w-5xl font-bold text-center text-7xl">
          Audio{" "}
          <span className="text-transparent underline bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
            collaboration and communication
          </span>{" "}
          for you and your clients.
        </h1>

        <p className="max-w-2xl text-lg text-center">
          Sonex is a seamless audio collaboration platform where you can store,
          share, and manage audio projects with clients, while handling payments
          and revisions all in one place.
        </p>

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
      <section className="px-6 py-12 my-20 space-y-4">
        <HeaderChip text="Pricing" />
        <div className="max-w-4xl mx-auto space-y-8">
          <h3 className="text-4xl text-center">Choose your Sonex</h3>
          <PricingPlan />
        </div>
      </section>

      {/* FAQs */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

// <div>
//   <Header />

//   {/* Hero */}
//   <section className="flex flex-col items-center justify-center h-screen">
//     <h1 className="max-w-5xl font-bold text-center text-7xl">
//       Audio{" "}
//       <span className="text-transparent underline bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
//         collaboration and communication
//       </span>{" "}
//       for you and your clients.
//     </h1>
//     <Spacer y={8} />
//     <p className="max-w-2xl text-lg text-center">
//       Sonex is a seamless audio collaboration platform where you can store,
//       share, and manage audio projects with clients, while handling payments and
//       revisions all in one place.
//     </p>
//     <Spacer y={8} />
//     <FancyButton />
//   </section>

//   {/* What's Included */}
//   <WhatsIncluded />

//   {/* Features */}
//   <section className="mb-32">
//     <HeaderChip text="Why Use Sonex?" />
//     <Features />
//   </section>

//   {/* Ways to use sonex */}
//   <section className="h-screen px-6 py-10 my-20">
//     <HeaderChip text="How can I use Sonex?" />
//     <div className="my-8">
//       <p className="italic">Use Sonex as:</p>
//       <MarketedUsers />
//     </div>
//   </section>

//   {/* Pricing */}
//   <section className="px-6 py-12 my-20 space-y-4">
//     <HeaderChip text="Pricing" />
//     <div className="max-w-4xl mx-auto space-y-8">
//       <h3 className="text-4xl text-center">Choose your Sonex</h3>
//       <PricingPlan />
//     </div>
//   </section>

//   {/* FAQs */}
//   <section className="px-6 py-12">
//     <HeaderChip text="Frequently Asked Questions" />
//     <div className="max-w-3xl mx-auto">
//       <Accordion variant="splitted" className="flex flex-col w-full gap-1 p-2">
//         {faqs.map((faq, index) => (
//           <AccordionItem key={index} title={faq.question}>
//             <p>{faq.answer}</p>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   </section>

//   {/* Footer */}
//   <Footer />
// </div>;
