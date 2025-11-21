import React, { useEffect, useState } from "react";
import Parallax from "./Parallax";
import "./OrbitingText.css";

const OrbitingText = ({
  src,
  alt,
  radiusVw = 15,
  speed = 1,
  parallaxSpeed = 0.01,
  startAngle = 0,
  size = 150,
  direction = "clockwise",
  ellipseRatio = 2,
}) => {
  const [angle, setAngle] = useState(startAngle);

  useEffect(() => {
    const directionMultiplier = direction === "clockwise" ? 1 : -1;
    const intervalId = setInterval(() => {
      setAngle((prev) => (prev + 0.05 * speed * directionMultiplier) % 360);
    }, 16);

    return () => clearInterval(intervalId);
  }, [speed, direction]);

  // Convert vw to pixels
  const radius = (radiusVw * window.innerWidth) / 100;

  const x = Math.cos((angle * Math.PI) / 180) * radius * ellipseRatio;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <div
      className="orbiting-text"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        width: "15vw",
      }}
    >
      <Parallax speed={parallaxSpeed} maxMove={20}>
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            mixBlendMode: "difference",
          }}
        />
      </Parallax>
    </div>
  );
};

export default OrbitingText;
