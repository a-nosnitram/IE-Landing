import React, { useEffect, useState, useRef } from "react";
import "./ScrollRevealText.css";

const ScrollRevealText = ({ text, className = "" }) => {
  const [visibleWords, setVisibleWords] = useState([]);
  const containerRef = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    let rafId;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // only update if scroll changed significantly (less unnecessary updates?)
      //   if (Math.abs(currentScrollY - lastScrollY) < 5 && rafId) return;

      lastScrollY = currentScrollY;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) {
          rafId = null;
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const containerTop = rect.top;
        const containerHeight = rect.height;

        // progress: 0 when container bottom enters viewport, 1 when container top reaches top
        const scrollProgress = Math.max(
          0,
          Math.min(
            1,
            (windowHeight - containerTop) / (windowHeight + containerHeight)
          )
        );

        // how many words should be visible
        const wordsToShow = Math.floor(scrollProgress * words.length * 1.8);

        const newVisibleWords = words.map((_, index) => {
          if (index < wordsToShow) {
            // individual word progress for staggered effect
            const wordProgress = Math.min(1, (wordsToShow - index) / 3);
            return wordProgress;
          }
          return 0;
        });

        setVisibleWords(newVisibleWords);
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [words.length]);

  return (
    <div ref={containerRef} className={`scroll-reveal-text ${className}`}>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <span
            className="scroll-reveal-word"
            style={{
              opacity: visibleWords[index] || 0,
              filter: `blur(${(1 - (visibleWords[index] || 0)) * 10}px)`,
              transform: `translateY(${
                (1 - (visibleWords[index] || 0)) * 20
              }px)`,
            }}
          >
            {word}
          </span>
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ScrollRevealText;
