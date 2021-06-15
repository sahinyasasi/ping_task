import React from "react";
import { render } from "react-dom";
import Home from "./components/Home";

const rootElement = document.getElementById("mount");
const App = () => {
  return (
    <div>
      <h1> Hi there</h1>
      <Home />
    </div>
  );
};

render(<App />, rootElement);
