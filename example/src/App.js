import React from "react";
import "./App.css";
import { Paper } from "../../build/index";
import { main } from "./three/main";
import { Text } from "./Text";

function App() {
  return (
    <>
      <Text />
      <Paper
        script={main}
        style={{
          background: "radial-gradient(circle, rgba(51,71,78,1) 0%, rgba(43,48,50,1) 51%)",
        }}
        onEntry={() => console.log("Paper has entered the viewport!")}
        onExit={() => console.log("Paper has left the viewport!")}
        onError={() => console.log("Oops! Something went wrong")}
      />
    </>
  );
}

export default App;
