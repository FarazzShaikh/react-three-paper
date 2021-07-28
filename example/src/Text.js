import React from "react";

export function Text() {
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
          pointerEvents: "none",
        }}
      >
        <h2>65k particles in React using Three.js</h2>
        <p>
          ThreeJS demo run using <code>react-three-paper</code> within a React app compiled with <code>react-static</code>. Canvas size and color set via JSX. Cursor set via CSS.
          <br />
          <br />
          After scrolling, notice the FPS count stop. This means the render loop has paused. When scrolling back up, the counter should start at 0, indecating it has resumed from a paused state.
        </p>
        <h4>
          <a href="https://github.com/farazzshaikh/react-three-paper">React-Three-Paper</a>
          <b>&ensp;•&ensp;</b>
          <a href="https://github.com/farazzshaikh/react-three-paper/example">Source code</a>
        </h4>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          color: "white",
          fontFamily: "sans-serif",
          padding: "8px 16px",
        }}
      >
        <button
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "none",
            cursor: "all-scroll",
          }}
        >
          <h4>Hover here and scroll!</h4>
        </button>
      </div>
    </>
  );
}
