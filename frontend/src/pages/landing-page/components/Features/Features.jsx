import { useEffect, useState } from "react";
import FancyFeature from "../FeatureCard/FancyFeature";
import FeatureCard from "../FeatureCard/FeatureCard";
import { features } from "../../../../constants";
import "./feature-animate.css";

const Features = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    const addAnimation = () => {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // Avoid cloning if already duplicated to prevent glitches
        if (!scrollerInner.hasAttribute("data-duplicated")) {
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
          });
          // Mark as duplicated to prevent further cloning
          scrollerInner.setAttribute("data-duplicated", true);
        }
      });
    };

    // Check for reduced motion preference
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, []);
  return (
    <div className="scroller ">
      <div className="scroller__inner">
        <div className="transition-transform duration-300 hover:scale-105">
          <FancyFeature />
        </div>
        {features.map((feature) => (
          <div
            key={feature.id}
            className="transition-transform duration-300 hover:scale-105"
          >
            <FeatureCard feature={feature} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
