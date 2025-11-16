import React, { useRef, useEffect } from "react";
import "./CursorLight.css";

const CursorLight = () => {
  const lightRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (lightRef.current) {
        lightRef.current.style.left = `${e.clientX}px`;
        lightRef.current.style.top = `${e.clientY}px`;

        if (!isVisibleRef.current) {
          lightRef.current.style.opacity = "1";
          isVisibleRef.current = true;
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={lightRef} className="cursor-light" style={{ opacity: 0 }} />;
};

export default CursorLight;
