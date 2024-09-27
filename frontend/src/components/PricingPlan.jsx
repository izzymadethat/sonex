import { Button, Divider, Link } from "@nextui-org/react";
import { pricingPlans } from "../constants";
import "../styles/pricing-plan.css";

const PricingPlan = () => {
  return (
    <div className="pricing-plans">
      {pricingPlans.map((plan) => (
        <div key={plan.id} className={`plan active-${plan.id}`}>
          <div className="content">
            <h3>{plan.name}</h3>
            {plan.id === 1 ? (
              <p className="italic">Pay for the storage you use!**</p>
            ) : (
              <p className="italic">Build from our current source code!</p>
            )}
            <div className="flex flex-col">
              <span className="price">${plan.price}/mo </span>
              {plan.id === 1 && (
                <span className="text-sm">
                  + 3.5% payment processing per transaction*
                </span>
              )}
            </div>
          </div>

          <ul className="list">
            <p>Includes:</p>
            {plan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <Button disabled fullWidth className="mt-2 bg-[#ffff00]">
            Coming Soon
          </Button>
        </div>
      ))}

      <div className="plan col-span-2 ">
        <Divider className="bg-[#ffff00]" />
        <h4 className="text-[#ffff00] font-bold mt-2">Need more storage?</h4>
        <ul className="list">
          {pricingPlans[0].extras.map((extra, index) => (
            <li key={index}>{extra}</li>
          ))}
        </ul>
        <p className="text-sm italic">
          * 3.5% payment fee = Stripe's processing fee of (2.9% + $0.30) + plus
          ~1.5% service fee from Sonex. Stripe terms and conditions apply.
        </p>
        <p className="text-sm italic">
          ** Subscription only covers storage. No additional fees for any extra
          services Sonex provides except payment processing fee.
        </p>
      </div>
    </div>
  );
};

export default PricingPlan;
