import React, { useState } from "react";
import BoardBtn from "./BoardBtn";
import GameDrawnModal from "./GameDrawnModal";
import WinnerModal from "./WinnerModal";

export default function BoardComp() {
  const [boardSelections, setBoardSelections] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [activePlayer, setActivePlayer] = useState(1);
  const [winnerPlayer, setWinnerPlayer] = useState(-1);
  const [gameDrawn, setGameDrawn] = useState(false);

  const gameCompleted = () => {
    console.log(boardSelections);
    if (
      (boardSelections[0][0] != "" &&
        boardSelections[0][0] == boardSelections[0][1] &&
        boardSelections[0][1] == boardSelections[0][2]) ||
      (boardSelections[0][1] != "" &&
        boardSelections[0][1] == boardSelections[1][1] &&
        boardSelections[1][1] == boardSelections[2][1]) ||
      (boardSelections[0][2] != "" &&
        boardSelections[0][2] == boardSelections[1][2] &&
        boardSelections[1][2] == boardSelections[2][2]) ||
      (boardSelections[0][0] != "" &&
        boardSelections[0][0] == boardSelections[1][0] &&
        boardSelections[1][0] == boardSelections[2][0]) ||
      (boardSelections[0][0] != "" &&
        boardSelections[0][0] == boardSelections[1][1] &&
        boardSelections[1][1] == boardSelections[2][2]) ||
      (boardSelections[1][0] != "" &&
        boardSelections[1][0] == boardSelections[1][1] &&
        boardSelections[1][1] == boardSelections[1][2]) ||
      (boardSelections[2][0] != "" &&
        boardSelections[2][0] == boardSelections[2][1] &&
        boardSelections[2][1] == boardSelections[2][2]) ||
      (boardSelections[1][0] != "" &&
        boardSelections[1][0] == boardSelections[1][1] &&
        boardSelections[1][1] == boardSelections[2][1]) ||
      (boardSelections[2][0] != "" &&
        boardSelections[2][0] == boardSelections[2][1] &&
        boardSelections[2][1] == boardSelections[2][2]) ||
      (boardSelections[0][2] != "" &&
        boardSelections[0][2] == boardSelections[1][1] &&
        boardSelections[1][1] == boardSelections[2][0])
    ) {
      return {
        gameOver: true,
        ganeDrawn: false,
      };
    } else if (
      boardSelections[0][0] != "" &&
      boardSelections[0][1] != "" &&
      boardSelections[0][2] != "" &&
      boardSelections[1][0] != "" &&
      boardSelections[1][1] != "" &&
      boardSelections[1][2] != "" &&
      boardSelections[2][0] != "" &&
      boardSelections[2][1] != "" &&
      boardSelections[2][2] != ""
    ) {
      return {
        gameOver: true,
        gameDrawn: true,
      };
    }
  };

  return (
    <div className={`flex w-full h-full justify-center items-center relative`}>
      <div className={`flex flex-col`}>
        {boardSelections.map((item, row) => (
          <div className={`flex flex-row items-center mb-1`} key={row}>
            {item.map((item, col) => (
              <div className={`mr-1`} key={col}>
                <BoardBtn
                  btnText={item}
                  onBtnClick={() => {
                    if (item == "" && winnerPlayer == -1) {
                      const tempBoardSelections = [...boardSelections];
                      tempBoardSelections[row][col] =
                        activePlayer == 1 ? "X" : "O";
                      setActivePlayer(activePlayer == 1 ? 2 : 1);
                      setBoardSelections(tempBoardSelections);
                      const gameResult = gameCompleted();
                      if (gameResult?.gameOver && !gameResult.gameDrawn) {
                        setWinnerPlayer(activePlayer);
                      } else if (gameResult?.gameOver && gameResult.gameDrawn) {
                        setGameDrawn(true);
                      }
                    } else {
                      alert("Invalid move!");
                    }
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {winnerPlayer != -1 && (
        <WinnerModal playerWon={activePlayer == 1 ? "2" : "1"} />
      )}
      {gameDrawn && <GameDrawnModal />}
    </div>
  );
}
