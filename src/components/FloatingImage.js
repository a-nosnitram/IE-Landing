import React, { useRef, useEffect, useState } from "react";
import "./FloatingImage.css";

const FloatingImage = ({ src, alt, x, y, size = 200, parallaxSpeed = 0.5 }) => {
  const imageRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // parallax offset based on mouse position
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (e.clientX - centerX) * parallaxSpeed;
      const offsetY = (e.clientY - centerY) * parallaxSpeed;

      setPosition({ x: offsetX, y: offsetY });
    };

    const handleScroll = () => {
      // scroll-based parallax
      const scrollY = window.scrollY;
      setPosition((prev) => ({
        ...prev,
        y: prev.y + scrollY * parallaxSpeed * 0.3,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [parallaxSpeed]);

  return (
    <div
      ref={imageRef}
      className="floating-image"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

export default FloatingImage;
