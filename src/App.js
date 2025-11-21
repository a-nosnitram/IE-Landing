import React from "react";
import CosmicBackground from "./components/CosmicBackground";
import CosmicParticles from "./components/CosmicParticles";
import EyeGrid from "./components/EyeGrid";
import CursorLight from "./components/CursorLight";
import GradientOverlay from "./components/GradientOverlay";
import Parallax from "./components/Parallax";
import ScrollRotate from "./components/ScrollRotate";
import OrbitingText from "./components/OrbitingText";
import { MouseProvider } from "./context/MouseContext";
import "./App.css";

function App() {
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
              <h1 className="parallax-title">ILLUSTRIOUS EMPIRE</h1>
            </Parallax>
          </div>

          <div className="text-muz">
            <Parallax speed={0.02} maxMove={30}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/text/muz.svg`}
                alt="muz"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  mixBlendMode: "difference",
                }}
              />
            </Parallax>
          </div>

          <div className="text-ish">
            <Parallax speed={0.02} maxMove={30}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/text/ish.svg`}
                alt="ish"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  mixBlendMode: "difference",
                }}
              />
            </Parallax>
          </div>

          <div className="text-reliz">
            <Parallax speed={0.02} maxMove={30}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/text/reliz.svg`}
                alt="reliz"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  mixBlendMode: "difference",
                }}
              />
            </Parallax>
          </div>

          <div className="center-content">
            <Parallax speed={0.005} maxMove={20}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/simian-no-bg.png`}
                alt="Simian"
                // className="center-image"
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
              radius={1}
              speed={0}
              startAngle={0}
              size={180}
              parallaxSpeed={0.09}
              direction="counter-clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/imperia.svg`}
              alt="imperia"
              radius={200}
              speed={0.8}
              startAngle={51}
              size={200}
              parallaxSpeed={0.04}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/intrigi.svg`}
              alt="intrigi"
              radius={200}
              speed={0.8}
              startAngle={103}
              size={170}
              parallaxSpeed={0.03}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/pere.svg`}
              alt="pere"
              radius={200}
              speed={0.8}
              startAngle={154}
              size={160}
              parallaxSpeed={0.05}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/pers.svg`}
              alt="pers"
              radius={200}
              speed={0.8}
              startAngle={206}
              parallaxSpeed={0.03}
              size={190}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/poisk.svg`}
              alt="poisk"
              radius={200}
              speed={0.8}
              startAngle={257}
              size={175}
              parallaxSpeed={0.03}
              direction="clockwise"
            />
            <OrbitingText
              src={`${process.env.PUBLIC_URL}/assets/text/cluster/proto.svg`}
              alt="proto"
              radius={200}
              speed={0.95}
              startAngle={320}
              size={180}
              parallaxSpeed={0.05}
              direction="clockwise"
            />
          </div>
        </section>
      </div>
    </MouseProvider>
  );
}
export default App;
