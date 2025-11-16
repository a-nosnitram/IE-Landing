import React, { useMemo } from "react";
import "./CosmicParticles.css";

const CosmicParticles = ({ count = 50 }) => {
  const particles = useMemo(() => {
    const colors = ["#8b5cf6", "#6366f1", "#ec4899", "#a855f7", "#3b82f6"];

    return Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 3 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 10 + Math.random() * 20;
      const glowDuration = 3 + Math.random() * 4;
      const delay = Math.random() * 5;

      return {
        id: i,
        size,
        color,
        left,
        top,
        duration,
        glowDuration,
        delay,
      };
    });
  }, [count]);

  return (
    <div className="cosmic-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animation: `float ${particle.duration}s ease-in-out infinite, glow ${particle.glowDuration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CosmicParticles;
