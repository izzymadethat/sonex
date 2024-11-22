import { pricingPlans } from "@/constants";
import "./pricing-plan.css";
import { Button } from "@/components/ui/button";


const PricingPlan = () => {
  const monthly = pricingPlans[0].plans.monthly;
  const yearly = pricingPlans[0].plans.yearly;
  return (
    <div className="pricing-plans">
      <article className="relative plan">
        <section className="content">
          <div className={`plan active-${monthly.planId}`}>
            <h3>Monthly</h3>
            <h2 className="price">${monthly.price}/mo</h2>
            <span className="text-sm">+ 3.5% payment processing per transaction **</span>

            <ul className="mt-4 list">
              <p>Includes:</p>
              {monthly.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Button
              type="button"
              className="mt-2 bg-primary text-background"
            >
              Coming Soon
            </Button>
          </div>
        </section>

        <section className="col-span-2 space-y-8 ">
          <h4 className="my-2 text-lg font-bold text-primary">
            Need more storage?
          </h4>
          <ul className="list">
            {monthly.extras.map((extra) => (
              <li key={extra}>{extra}</li>
            ))}
          </ul>
          <div className="space-y-2">
            <p className="text-sm italic">
              * 256Gb storage included for $15/mo. Extra storage currently
              available in increments of 256GB. Adds $7/mo per 256Gb to
              subscription.
            </p>
            <p className="text-sm italic">
              ** 3.5% payment fee = Stripe's processing fee of (2.9% + $0.30) +
              plus ~1.5% service fee from Sonex. Stripe terms and conditions
              apply.
            </p>
          </div>
        </section>
        <div className="absolute z-10 px-4 py-2 text-sm font-bold transition-transform duration-300 rounded-md cursor-default -right-3 -top-3 bg-primary text-background hover:translate-x-3">
          Most Popular!
        </div>
      </article>


      <article className="relative plan">
        <section className="content">
          <div className="plan">
            <h3>Yearly</h3>
            <h2 className="price">${yearly.price.toFixed(2)}/mo</h2>
            <span className="text-sm">+ 3.5% payment processing per transaction **</span>
            <ul className="mt-4 list">
              <p>Includes:</p>
              {yearly.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Button
              type="button"
              className="mt-2 bg-primary text-background"
            >
              Coming Soon
            </Button>
          </div>
        </section>

        <section className="col-span-2 space-y-8 ">
          <h4 className="my-2 text-lg font-bold text-primary">
            Need more storage?
          </h4>
          <ul className="list">
            {yearly.extras.map((extra) => (
              <li key={extra}>{extra}</li>
            ))}
          </ul>
          <div className="space-y-2">
            <p className="text-sm italic">
              * 256Gb storage included for $149/yr. This price is limited time only. Extra storage currently
              available in increments of 256GB. Adds $5.81/yr per 256Gb to
              subscription.
            </p>
            <p className="text-sm italic">
              ** 3.5% payment fee = Stripe's processing fee of (2.9% + $0.30) +
              plus ~1.5% service fee from Sonex. Stripe terms and conditions
              apply.
            </p>
          </div>
        </section>

        <div className="absolute px-4 py-2 text-sm font-bold transition-transform duration-300 rounded-md shadow-md cursor-default shadow-primary/50 -right-3 -top-3 bg-primary text-background hover:translate-x-3">
          Save 17% All Around!
        </div>
      </article>
    </div>
  );
};

export default PricingPlan;

