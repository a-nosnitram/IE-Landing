import React from "react";
import CosmicBackground from "./components/CosmicBackground";
import CosmicParticles from "./components/CosmicParticles";
import EyeGrid from "./components/EyeGrid";
import CursorLight from "./components/CursorLight";
import GradientOverlay from "./components/GradientOverlay";
import Parallax from "./components/Parallax";
import { MouseProvider } from "./context/MouseContext";
import "./App.css";

function App() {
  return (
    <MouseProvider>
      <div className="App">
        <CosmicBackground />
        <CosmicParticles count={50} />
        <CursorLight />

        <EyeGrid spacing={40} offsetX={10} offsetY={10} />

        <div className="top-text-content">
          <Parallax style={{ marginTop: "-100px"}} speed={0.01} maxMove={30}>
            <h1 className="parallax-title">ILLUSTRIOUS EMPIRE</h1>
          </Parallax>
        </div>

        <div style={{ position: "absolute", top: "23rem", left: "17rem", mixBlendMode: "difference", width: "40vh" , zIndex:400}}>
          <Parallax speed={0.02} maxMove={30}>
            <img
              src="/assets/text/muz.svg"
              alt="muz"
              style={{ width: "100%", height: "auto", display: "block",  mixBlendMode: "difference"}}
            />
          </Parallax>
        </div>


        <div style={{ position: "absolute", top: "27rem", right: "17rem", mixBlendMode: "difference", width: "40vh" , zIndex:400}}>
          <Parallax speed={0.02} maxMove={30}>
            <img
              src="/assets/text/ish.svg"
              alt="ish"
              style={{ width: "100%", height: "auto", display: "block",  mixBlendMode: "difference"}}
            />
          </Parallax>
        </div>


        <div style={{ position: "absolute", top: "37rem", left: "50%", transform: "translateX(-50%)", mixBlendMode: "difference", width: "30vh" , zIndex:700}}>
          <Parallax speed={0.02} maxMove={30}>
            <img
              src="/assets/text/reliz.svg"
              alt="reliz"
              style={{ width: "100%", height: "auto", display: "block",  mixBlendMode: "difference"}}
            />
          </Parallax>
        </div>

        <div className="center-content">
          <Parallax speed={0.005} maxMove={20}>
            <img
              src="/assets/simian-no-bg.png"
              alt="Simian"
              // className="center-image"
              style={{ width: "100vh", height: "auto", bottom: "0px", marginBottom: "10px", mixBlendMode: "difference" }}
            />
          </Parallax>
        </div>
        <GradientOverlay />
        <div className="bottom-ombre"></div>
      </div>
    </MouseProvider>
  );
}
export default App;
