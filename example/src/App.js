import React from "react";
import { Paper } from "../../build/index";
import "./App.css";
import { main } from "./three/main";

function App() {
  const script = main;

  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          color: "white",
          fontFamily: "sans-serif",
          padding: "8px 16px",
          width: "500px",
        }}
      >
        <h2>65k particles in React using Three.js</h2>
        <p>
          ThreeJS demo run using <code>react-three-paper</code> within a React app compiled with <code>react-static</code>. Canvas size and color set via JSX. Cursor set via CSS.
        </p>
        <h4>
          <a href="https://github.com/farazzshaikh/react-three-paper">React-Three-Paper</a>
          <b>&ensp;•&ensp;</b>
          <a href="https://github.com/farazzshaikh/react-three-paper/example">Source code</a>
        </h4>
      </div>
      <Paper
        script={script}
        style={{
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(circle, rgba(51,71,78,1) 0%, rgba(43,48,50,1) 51%)",
        }}
      />
    </>
  );
}

export default App;
