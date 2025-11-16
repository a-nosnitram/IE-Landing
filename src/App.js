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
          <Parallax style={{ marginTop: "-100px"}} speed={0.02} maxMove={50}>
            <h1 className="parallax-title">ILLUSTRIOUS EMPIRE</h1>
          </Parallax>
        </div>

        <div className="center-content">
          <Parallax speed={0.01} maxMove={30}>
            <img
              src="/assets/simian-no-bg.png"
              alt="Simian"
              className="center-image"
              style={{ width: "100vh", height: "auto", bottom: "0px", marginBottom: "-50px" }}
            />
          </Parallax>
        </div>
        <GradientOverlay />
      </div>
    </MouseProvider>
  );
}

export default App;
