import { useState } from "react";
import "./App.css";
import BoardBtn from "./components/BoardBtn";
import BoardComp from "./components/BoardComp";

function App() {
  return (
    <div
      className={`w-screen h-screen flex flex-row justify-center items-center`}
    >
      <BoardComp />
    </div>
  );
}

export default App;
