import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Ensure viewport CSS variables are set early so mobile vh-related sizes stay stable
import "./setViewportVars";
import App from "./App";

console.log(window.innerWidth, window.innerHeight);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
