import { ScrollShadow } from "@nextui-org/react";
import FancyFeature from "../components/FancyFeature";
import FeatureCard from "../components/FeatureCard";
import { features } from "../constants";
import { useEffect, useRef, useState } from "react";

const Features = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0 });
  const scrollSpeed = 10;

  function handleMouseMove(e) {
    console.log("Mouse is moving", e.clientX);
    setMousePosition({
      x: e.clientX
    });
  }

  useEffect(() => {
    const container = containerRef.current;
    console.log(container);

    if (!container) return;

    const handleScroll = () => {
      const { x } = mousePosition;
      const containerRect = container.getBoundingClientRect();
      const middle = containerRect.width / 2;

      if (x < containerRect.left + middle * 0.5) {
        // Scroll left if mouse is on the left side
        container.scrollLeft -= scrollSpeed;
      } else if (x > containerRect.left + middle * 1.5) {
        // Scroll right if mouse is on the right side
        container.scrollLeft += scrollSpeed;
      }
    };

    const interval = setInterval(handleScroll, 20);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <section
      className="flex overflow-x-auto scrollbar-hide gap-1 my-4 relative"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <FancyFeature />
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </section>
  );
};

export default Features;
