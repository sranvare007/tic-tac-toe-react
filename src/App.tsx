import { useState } from "react";
import "./App.css";
import BoardComp from "./components/BoardComp";
import VsComp from "./components/VsComp";

function App() {
  const playType = ["1v1", "vComp"];
  const [showMenu, setShowMenu] = useState(true);
  const [activePlayType, setActivePlayType] = useState("");
  return (
    <div
      className={`w-screen h-screen flex flex-row justify-center items-center`}
    >
      {showMenu && (
        <div className={`flex flex-row items-center gap-x-20`}>
          <div
            className={`w-60 h-60 bg-red-400 rounded-lg flex flex-row items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 drop-shadow-2xl not-selectable`}
            onClick={() => {
              setActivePlayType(playType[0]);
              setShowMenu(false);
            }}
          >
            <p className={`font-semibold text-white text-6xl text-center`}>
              1 v 1
            </p>
          </div>
          <div
            className={`w-60 h-60 bg-red-400 rounded-lg flex flex-row items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110  drop-shadow-2xl not-selectable`}
            onClick={() => {
              setActivePlayType(playType[1]);
              setShowMenu(false);
            }}
          >
            <p className={`font-semibold text-white text-6xl text-center`}>
              <span className={`block`}>Vs</span>
              <span className={`block`}>Comp</span>
            </p>
          </div>
        </div>
      )}
      {activePlayType == playType[0] && <BoardComp />}
      {activePlayType == playType[1] && <VsComp />}
    </div>
  );
}

export default App;
