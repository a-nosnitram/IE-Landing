import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useMouseTracking } from "../context/MouseContext";
import "./Eye.css";

const Eye = React.memo(({ x, y, size, rotation, opacity }) => {
  // const opacity = Math.random();
  const { smoothMousePosition } = useMouseTracking();
  const [isOpen, setIsOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [irisPosition, setIrisPosition] = useState({ x: -50, y: -50 });
  const [isVisible, setIsVisible] = useState(false);
  const eyeRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const blinkTimeoutRef = useRef(null);
  const cachedRectRef = useRef(null);
  const isBlinkingRef = useRef(false);

  const OPEN_RADIUS = 70;
  const CLOSE_RADIUS = 20;
  const BLINK_DURATION = 5000; // 5 s blink
  const BLINK_FREQUENCY_MIN = 35000; // min 35 s between blinks
  const BLINK_FREQUENCY_MAX = 60000; // max 60 s between blinks

  const scheduleNextBlink = useCallback(() => {
    const delay =
      BLINK_FREQUENCY_MIN +
      Math.random() * (BLINK_FREQUENCY_MAX - BLINK_FREQUENCY_MIN);
    blinkTimeoutRef.current = setTimeout(() => {
      // blink if not open from mouse hover and not already blinking
      if (!isOpen && !isBlinkingRef.current) {
        isBlinkingRef.current = true;
        setIsBlinking(true);
        // reset blinking after animation completes
        setTimeout(() => {
          setIsBlinking(false);
          isBlinkingRef.current = false;
          scheduleNextBlink();
        }, BLINK_DURATION);
      } else {
        // if eye is open, retry sooner
        setTimeout(() => {
          scheduleNextBlink();
        }, 5000);
      }
    }, delay);
  }, [isOpen]);

  useEffect(() => {
    // spread out initial blinks across a wide range to avoid synchronisation
    // some eyes blink early (0-5s), most spread across 5-30s, some delayed further
    const rand = Math.random();
    let initialDelay;

    if (rand < 0.2) {
      // 20% blink very early (0-5 seconds)
      initialDelay = Math.random() * 5000;
    } else if (rand < 0.7) {
      // 50% blink in medium range (5-30 seconds)
      initialDelay = 5000 + Math.random() * 25000;
    } else {
      // 30% blink later (30-60 seconds)
      initialDelay = 30000 + Math.random() * 30000;
    }

    blinkTimeoutRef.current = setTimeout(() => {
      // first blink
      if (!isBlinkingRef.current) {
        isBlinkingRef.current = true;
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          isBlinkingRef.current = false;
          // regular blinking with staggered start
          scheduleNextBlink();
        }, BLINK_DURATION);
      }
    }, initialDelay);

    return () => {
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, [scheduleNextBlink]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "50px" }
    );

    const currentEyeRef = eyeRef.current;
    if (currentEyeRef) {
      observer.observe(currentEyeRef);
    }

    return () => {
      if (currentEyeRef) {
        observer.unobserve(currentEyeRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // cache position less frequently for performance
    if (Math.random() < 0.05 || !cachedRectRef.current) {
      cachedRectRef.current = eyeRef.current?.getBoundingClientRect();
    }

    const eyeRect = cachedRectRef.current;
    if (!eyeRect) return;

    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const dx = smoothMousePosition.x - eyeCenterX;
    const dy = smoothMousePosition.y - eyeCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < OPEN_RADIUS) {
      if (!isOpen) {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setIsOpen(true);
      }

      const angle = Math.atan2(dy, dx);
      const maxMove = 3;
      const irisDistance = Math.min(maxMove, distance * 0.066);
      const irisX = Math.cos(angle) * irisDistance;
      const irisY = Math.sin(angle) * irisDistance;

      setIrisPosition({
        x: -50 + (irisX / eyeRect.width) * 100,
        y: -50 + (irisY / eyeRect.height) * 100,
      });
    } else if (distance > CLOSE_RADIUS && isOpen) {
      if (!closeTimeoutRef.current) {
        setIrisPosition({ x: -50, y: -50 });
        const closeDelay = Math.min(500, (distance - CLOSE_RADIUS) * 2);
        closeTimeoutRef.current = setTimeout(() => {
          setIsOpen(false);
          closeTimeoutRef.current = null;
        }, closeDelay);
      }
    } else if (
      distance >= OPEN_RADIUS &&
      distance <= CLOSE_RADIUS &&
      closeTimeoutRef.current
    ) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, [smoothMousePosition, isOpen, isVisible]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const uniqueId = useMemo(() => `${x}-${y}`, [x, y]);
  const sizeInPx = useMemo(() => 20 * size, [size]);

  return (
    <div
      ref={eyeRef}
      className={`eye ${isOpen ? "open" : ""} ${isBlinking ? "blinking" : ""}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${sizeInPx}px`,
        height: `${sizeInPx}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="eye-outer">
        <svg
          className="eye-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            opacity: opacity,
          }}
        >
          <defs>
            <mask id={`eyelid-mask-${uniqueId}`}>
              <rect width="100" height="100" fill="white" />
              <path
                className="mask-top"
                d="M 0,0 L 0,80 Q 25,65 50,60 Q 75,65 100,80 L 100,0 Z"
                fill="black"
              />
              <path
                className="mask-bottom"
                d="M 0,100 L 0,20 Q 25,35 50,40 Q 75,35 100,20 L 100,100 Z"
                fill="black"
              />
            </mask>
          </defs>
          <g mask={`url(#eyelid-mask-${uniqueId})`}>
            <ellipse cx="50" cy="50" rx="45" ry="30" fill="white" />
            <foreignObject x="5" y="20" width="90" height="60">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <div
                  className="iris color-hazel"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate3d(${irisPosition.x}%, ${irisPosition.y}%, 0)`,
                    width: "50%",
                    height: "70%",
                    borderRadius: "50%",
                  }}
                >
                  <div className="pupil"></div>
                </div>
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
    </div>
  );
});

export default Eye;
