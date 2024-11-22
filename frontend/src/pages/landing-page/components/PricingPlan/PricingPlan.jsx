import { pricingPlans } from "@/constants";
import "./pricing-plan.css";

const PricingPlan = () => {
  return <p>Prices</p>;
};

export default PricingPlan;

// (
//   <div className="pricing-plans">
//   {pricingPlans.map((plan) => (
//     <div key={plan.id} className={`plan active-${plan.id}`}>
//       <div className="content">
//         <h3>{plan.name}</h3>
//         {plan.id === 1 ? (
//           <p className="italic">Pay for the storage you use!*</p>
//         ) : (
//           <p className="italic">Build from our current source code!</p>
//         )}
//         <div className="flex flex-col">
//           <span className="price">${plan.price}/mo </span>
//           {plan.id === 1 && (
//             <span className="text-sm">
//               + 3.5% payment processing per transaction **
//             </span>
//           )}
//         </div>
//       </div>

//       <ul className="list">
//         <p>Includes:</p>
//         {plan.features.map((feature, index) => (
//           <li key={index}>{feature}</li>
//         ))}
//       </ul>
//       <Button
//         disabled
//         fullWidth
//         className="mt-2 bg-primary text-background"
//       >
//         Coming Soon
//       </Button>
//     </div>
//   ))}

//   <div className="col-span-2 space-y-8 plan">
//     <Divider className="bg-primary" />

//     <h4 className="my-2 text-lg font-bold text-primary">
//       Need more storage?
//     </h4>
//     <ul className="list">
//       {pricingPlans[0].extras.map((extra, index) => (
//         <li key={index}>{extra}</li>
//       ))}
//     </ul>
//     <div>
//       <p className="text-sm italic">
//         * 256Gb storage included for $15/mo. Extra storage currently
//         available in increments of 256GB. Adds $7/mo per 256Gb to
//         subscription.
//       </p>
//       <p className="text-sm italic">
//         ** 3.5% payment fee = Stripe's processing fee of (2.9% + $0.30) +
//         plus ~1.5% service fee from Sonex. Stripe terms and conditions
//         apply.
//       </p>
//     </div>
//     <Divider className="bg-primary" />
//   </div>
// </div>
// )
