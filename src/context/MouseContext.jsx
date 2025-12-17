import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

const MouseContext = createContext();

export const useMouseTracking = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMouseTracking must be used within MouseProvider");
  }
  return context;
};

export const MouseProvider = ({ children }) => {
  const [smoothMousePosition, setSmoothMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const animationFrameRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const MAX_MOUSE_VELOCITY = 5000;
  const SMOOTHING_FACTOR = 0.7;

  const updateMousePosition = useCallback((e) => {
    const targetX = e.clientX;
    const targetY = e.clientY;
    const now = Date.now();
    const deltaTime = (now - lastUpdateTimeRef.current) / 1000;

    const dx = targetX - lastMouseRef.current.x;
    const dy = targetY - lastMouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const velocity = distance / deltaTime;

    lastMouseRef.current = { x: targetX, y: targetY };
    lastUpdateTimeRef.current = now;

    if (velocity > MAX_MOUSE_VELOCITY) {
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setSmoothMousePosition((prev) => ({
        x: prev.x + (targetX - prev.x) * SMOOTHING_FACTOR,
        y: prev.y + (targetY - prev.y) * SMOOTHING_FACTOR,
      }));
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", updateMousePosition);
    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateMousePosition]);

  return (
    <MouseContext.Provider value={{ smoothMousePosition }}>
      {children}
    </MouseContext.Provider>
  );
};
