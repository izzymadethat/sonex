import { useEffect, useState } from "react";
import FancyFeature from "../components/FancyFeature";
import FeatureCard from "../components/FeatureCard";
import { features } from "../constants";
import "../styles/feature-animate.css";

const Features = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    const addAnimation = () => {
      scrollers.forEach((scroller) => {
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    };

    addAnimation();
  }, []);

  return (
    <section className="scroller">
      <div className="flex gap-2 p-4 scroller__inner">
        <FancyFeature />
        {features.map((feature) => (
          <div key={feature.id}>
            <FeatureCard feature={feature} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
