import React, { useMemo } from "react";
import Eye from "./Eye";

const EyeGrid = ({ spacing = 100, offsetX = 10, offsetY = 10 }) => {
  const eyes = useMemo(() => {
    const eyeArray = [];
    const width = window.innerWidth + spacing;
    const height = window.innerHeight + spacing;

    for (let y = offsetY; y < height; y += spacing) {
      for (let x = offsetX; x < width; x += spacing) {
        // render 40% of potential eye positions for performance, this is slow af
        if (Math.random() > 0.4) continue;

        const randomX = x + (Math.random() - 0.5) * 40;
        const randomY = y + (Math.random() - 0.5) * 40;
        const randomSize = 0.6 + Math.random() * 0.8;
        const randomRotation = Math.random() * 360;

        eyeArray.push({
          id: `eye-${x}-${y}`,
          x: randomX,
          y: randomY,
          size: randomSize,
          rotation: randomRotation,
          opacity: 0.1 + Math.random() * 0.3,
        });
      }
    }

    return eyeArray;
  }, [spacing, offsetX, offsetY]);

  return (
    <>
      {eyes.map((eye) => (
        <Eye
          key={eye.id}
          x={eye.x}
          y={eye.y}
          size={eye.size}
          rotation={eye.rotation}
          opacity={eye.opacity}
        />
      ))}
    </>
  );
};

export default EyeGrid;
