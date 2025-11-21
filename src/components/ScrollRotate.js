import React, { useEffect, useState, useRef } from "react";

const ScrollRotate = ({
  children,
  maxRotation = 20,
  direction = "clockwise",
}) => {
  const [rotation, setRotation] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // calculate when element enters viewport (bottom of element reaches bottom of screen)
      // to when it leaves viewport (top of element reaches top of screen)
      const elementTop = rect.top;

      // total distance the element travels through the viewport
      const totalDistance = windowHeight + rect.height;

      // current progress: 0 when element just enters, 1 when it's about to leave
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - elementTop) / totalDistance)
      );

      // apply rotation based on progress and direction
      const directionMultiplier = direction === "clockwise" ? 1 : -1;
      const newRotation = scrollProgress * maxRotation * directionMultiplier;
      setRotation(newRotation);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial rotation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [maxRotation, direction]);

  return (
    <div
      ref={elementRef}
      style={{
        transform: `rotate(${rotation}deg)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollRotate;
