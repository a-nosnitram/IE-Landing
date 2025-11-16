import React, { useRef, useEffect, useState } from "react";
import "./Parallax.css";

const Parallax = ({ children, speed = 0.05, className = "" , maxMove = 100 }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = Math.max(Math.min((e.clientX - centerX) * speed, maxMove), -maxMove);
      const offsetY = Math.max(Math.min((e.clientY - centerY) * speed, maxMove), -maxMove);

      setOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [speed]);

  return (
    <div
      className={`parallax ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default Parallax;
