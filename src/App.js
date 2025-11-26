import React, { useRef, useState, useEffect } from "react";
import CosmicBackground from "./components/CosmicBackground";
import CosmicParticles from "./components/CosmicParticles";
import EyeGrid from "./components/EyeGrid";
import CursorLight from "./components/CursorLight";
import GradientOverlay from "./components/GradientOverlay";
import Parallax from "./components/Parallax";
import ScrollRotate from "./components/ScrollRotate";
import OrbitingText from "./components/OrbitingText";
import ScrollRevealText from "./components/ScrollRevealText";
import CharacterCarousel from "./components/Carousel";
import AuthorPanel from "./components/AuthorPanel";
import { MouseProvider } from "./context/MouseContext";
import "./App.css";

function App() {
  const trailerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (trailerRef.current) {
      trailerRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleSound = () => setIsMuted((m) => !m);

  const authorRef = useRef(null);
  const toggleAuthor = () => {
    const el = authorRef.current;
    if (!el) return;
    const isOpen = el.classList.toggle("open");
    const appEl = document.querySelector(".App");
    if (appEl) appEl.classList.toggle("author-open", isOpen);
  };

  return (
    <MouseProvider>
      <div className="App">
        <section className="hero-section">
          <CosmicBackground />
          <CosmicParticles count={50} />
          <CursorLight />

          <EyeGrid spacing={40} offsetX={10} offsetY={10} />

          <div className="top-text-content">
            <Parallax style={{ marginTop: "-100px" }} speed={0.01} maxMove={30}>
              <h1 className="parallax-title">Ксения W. Маничевская</h1>
            </Parallax>
          </div>

          <div className="text-muz">
            <Parallax speed={0.02} maxMove={30}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/text/avtor.svg`}
                alt="avtor"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  mixBlendMode: "difference",
                }}
              />
            </Parallax>
          </div>

          <div className="text-pis">
            <Parallax speed={0.02} maxMove={30}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/text/pis.svg`}
                alt="pis"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  mixBlendMode: "difference",
                }}
              />
            </Parallax>
          </div>

          <div className="text-vmir">
            <Parallax speed={0.02} maxMove={30}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/text/vmir.svg`}
                alt="vmir"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  mixBlendMode: "difference",
                }}
              />
            </Parallax>
          </div>

          {/* <Parallax speed={0.005} maxMove={20}> */}
          <button
            className="right-arrow"
            onClick={toggleAuthor}
            aria-label="Open author panel"
          >
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              aria-hidden="true"
            >
              <path
                d="M12 7.5l7 7-1.4 1.4L12 10.3l-5.6 5.6L5 14.5z"
                fill="currentColor"
              />
            </svg>
          </button>
          {/* </Parallax> */}

          <div className="center-content">
            <Parallax speed={0.005} maxMove={20}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/simian-no-bg.png`}
                alt="Simian"
                style={{
                  height: "105vh",
                  width: "auto",
                  bottom: "0px",
                  marginBottom: "10px",
                  mixBlendMode: "difference",
                }}
              />
            </Parallax>
          </div>

          {/* <Parallax speed={0.005} maxMove={20}> */}
          <button
            className="down-arrow"
            onClick={() => {
              const el = document.querySelector(".section-one");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll down"
          >
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              aria-hidden="true"
            >
              <path
                d="M12 16.5l-7-7 1.4-1.4L12 13.7l5.6-5.6L19 9.5z"
                fill="currentColor"
              />
            </svg>
          </button>
          {/* </Parallax> */}

          <GradientOverlay />
          <div className="bottom-ombre"></div>
        </section>

        <section className="section-one">
          <div className="top-ombre"></div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/section-1-bg.png`}
              alt="Section 1 Background"
              className="section-one-bg"
            />
            <div className="bottom-ombre" style={{ zIndex: 10 }}></div>
          </div>

          <div className="ish-book">
            <ScrollRotate maxRotation={10} direction="clockwise">
              <Parallax speed={0.005} maxMove={20}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/ish.png`}
                  alt="Ish Book"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    mixBlendMode: "difference",
                  }}
                />
              </Parallax>
            </ScrollRotate>
          </div>
          <div className="litnet-text">
            <Parallax speed={0.01} maxMove={30}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/text/litnet.svg`}
                alt="litnet"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  zIndex: "20",
                  mixBlendMode: "difference",
                }}
              />
            </Parallax>
          </div>
        </section>

        <section className="section-two">
          <div className="top-ombre" style={{ zIndex: 10 }}></div>
          <div className="cosmic-cluster">
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/cosm.svg`}
              alt="cosm"
              radiusVw={0}
              speed={0}
              startAngle={0}
              size={180}
              parallaxSpeed={0.09}
              direction="counter-clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/imperia.svg`}
              alt="imperia"
              radiusvw={15}
              speed={0.8}
              startAngle={60}
              size={200}
              parallaxSpeed={0.04}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/intrigi.svg`}
              alt="intrigi"
              radiusvw={15}
              speed={0.8}
              startAngle={120}
              size={170}
              parallaxSpeed={0.03}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/pere.svg`}
              alt="pere"
              radiusvw={15}
              speed={0.8}
              startAngle={180}
              size={160}
              parallaxSpeed={0.05}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/pers.svg`}
              alt="pers"
              radiusvw={15}
              speed={0.8}
              startAngle={240}
              parallaxSpeed={0.03}
              size={190}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/poisk.svg`}
              alt="poisk"
              radiusvw={15}
              speed={0.8}
              startAngle={300}
              size={175}
              parallaxSpeed={0.03}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/proto.svg`}
              alt="proto"
              radiusvw={15}
              speed={0.8}
              startAngle={360}
              size={180}
              parallaxSpeed={0.05}
              direction="clockwise"
            />
          </div>
        </section>

        {/* Floating back button for author panel (keeps it outside transformed panel) */}
        <button
          className="left-arrow"
          onClick={toggleAuthor}
          aria-label="Back to main"
        >
          <svg viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 16.5l-7-7 1.4-1.4L12 13.7l5.6-5.6L19 9.5z"
              fill="currentColor"
            />
          </svg>
        </button>

        <AuthorPanel ref={authorRef} />

        {/* summary */}
        <section className="section-three">
          <ScrollRevealText
            text="Следователю особого подразделения Фэмеру в качестве наказания поручают нераскрытые дела и урезают зарплату. Мечтая выкупить дом своего детства, он расследует убийство принца"
            className="summary-text"
          />
        </section>
        <section className="section-three">
          <ScrollRevealText
            text="...и оказывается втянут в заговор древнего культа."
            className="summary-text"
          />
          <div className="bottom-ombre" style={{ zIndex: 10 }}></div>
        </section>

        {/* trailer video */}
        <section className="section-four">
          <div className="trailer-container">
            <div className="top-ombre" style={{ zIndex: 10 }}></div>
            {/* Trailer video with sound toggle */}
            <video
              ref={trailerRef}
              id="trailerVideo"
              src={`${process.env.PUBLIC_URL}/assets/trailer.mp4`}
              className="trailer-video"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />

            <button
              className="video-sound-btn"
              onClick={toggleSound}
              aria-pressed={!isMuted}
              aria-label={isMuted ? "Unmute trailer" : "Mute trailer"}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden>
                  <path
                    d="M16.5 12a4.5 4.5 0 0 0-4.5-4.5v9A4.5 4.5 0 0 0 16.5 12zM5 9v6h4l5 4V5L9 9H5z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden>
                  <path d="M5 9v6h4l5 4V5L9 9H5z" fill="currentColor" />
                  <path
                    d="M19 12c0-1.77-.77-3.36-2-4.47v8.94A5.985 5.985 0 0 0 19 12z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>

            <div
              className="bottom-ombre"
              style={{ zIndex: 10, marginBottom: "0px" }}
            ></div>
          </div>
        </section>

        {/* carousel */}
        <section className="section-five">
          <div className="top-ombre" style={{ zIndex: 10 }}></div>
          <CharacterCarousel />
          <div className="bottom-ombre" style={{ zIndex: 0 }}></div>
        </section>

        <section className="section-six">
          <div>
            <div className="top-ombre" style={{ zIndex: 10 }}></div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/section-6-bg.jpg`}
              alt="Section 6 Background"
              className="section-six-bg"
            />
            <div className="bottom-ombre" style={{ zIndex: 10 }}></div>
          </div>
        </section>
      </div>
    </MouseProvider>
  );
}
export default App;
