import { LottiePlayer } from "lottie-web";
import React, { useEffect, useRef, useState } from "react";
import BoardBtn from "./BoardBtn";
import GameDrawnModal from "./GameDrawnModal";
import WinnerModal from "./WinnerModal";

export default function VsComp() {
  const [boardSelections, setBoardSelections] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [activePlayer, setActivePlayer] = useState(1);
  const [winnerPlayer, setWinnerPlayer] = useState(-1);
  const [gameDrawn, setGameDrawn] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie) {
      if (player1Ref.current && player2Ref.current) {
        const player1Animation = lottie.loadAnimation({
          container: player1Ref.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/player1-animation.json",
        });

        const player2Animation = lottie.loadAnimation({
          container: player2Ref.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/player2-animation.json",
        });

        return () => {
          player1Animation.destroy();
          player2Animation.destroy();
        };
      }
    }
  }, [lottie, isGameComplete]);

  const resetGame = () => {
    setIsGameComplete(false);
    setBoardSelections([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setActivePlayer(1);
    setGameDrawn(false);
    setWinnerPlayer(-1);
  };

  const closeModal = () => {
    setWinnerPlayer(-1);
    setGameDrawn(false);
  };

  const gameCompleted = () => {
    if (
      // Col-1
      (boardSelections[0][0] != "" &&
        boardSelections[0][0] == boardSelections[1][0] &&
        boardSelections[1][0] == boardSelections[2][0]) ||
      // Col-2
      (boardSelections[0][1] != "" &&
        boardSelections[0][1] == boardSelections[1][1] &&
        boardSelections[1][1] == boardSelections[2][1]) ||
      // Col-3
      (boardSelections[0][2] != "" &&
        boardSelections[0][2] == boardSelections[1][2] &&
        boardSelections[1][2] == boardSelections[2][2]) ||
      // Row-1
      (boardSelections[0][0] != "" &&
        boardSelections[0][0] == boardSelections[0][1] &&
        boardSelections[0][1] == boardSelections[0][2]) ||
      // Row-2
      (boardSelections[1][0] != "" &&
        boardSelections[1][0] == boardSelections[1][1] &&
        boardSelections[1][1] == boardSelections[1][2]) ||
      // Row-3
      (boardSelections[2][0] != "" &&
        boardSelections[2][0] == boardSelections[2][1] &&
        boardSelections[2][1] == boardSelections[2][2]) ||
      // Diagonal-1
      (boardSelections[0][0] != "" &&
        boardSelections[0][0] == boardSelections[1][1] &&
        boardSelections[1][1] == boardSelections[2][2]) ||
      // Diagonal-2
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

  function checkForWinner(playerSymbol: string) {
    for (let i = 0; i < 3; i++) {
      if (
        boardSelections[i][0] === playerSymbol &&
        boardSelections[i][1] === playerSymbol &&
        boardSelections[i][2] === playerSymbol
      ) {
        return playerSymbol;
      }
    }

    for (let j = 0; j < 3; j++) {
      if (
        boardSelections[0][j] === playerSymbol &&
        boardSelections[1][j] === playerSymbol &&
        boardSelections[2][j] === playerSymbol
      ) {
        return playerSymbol;
      }
    }

    if (
      boardSelections[0][0] === playerSymbol &&
      boardSelections[1][1] === playerSymbol &&
      boardSelections[2][2] === playerSymbol
    ) {
      return playerSymbol;
    }

    if (
      boardSelections[0][2] === playerSymbol &&
      boardSelections[1][1] === playerSymbol &&
      boardSelections[2][0] === playerSymbol
    ) {
      return playerSymbol;
    }

    return null;
  }

  const makeCompMove = () => {
    // if (boardSelections[1][1] == "") {
    //   const tempBoardSelections = [...boardSelections];
    //   tempBoardSelections[1][1] = "O";
    //   setBoardSelections(tempBoardSelections);
    //   setActivePlayer(1);
    // } else {
    //   //   for (var rowArr of boardSelections) {
    //   //     for (var ele of rowArr) {
    //   //       console.log(ele);
    //   //     }
    //   //   }
    //   const playerSelectedMoves = [];
    //   boardSelections.map((item, row) => {
    //     item.map((item, col) => {
    //       if (item == "X") {
    //         playerSelectedMoves.push([row, col]);
    //       }
    //     });
    //   });
    //   console.log(playerSelectedMoves);
    //   let row = Math.floor(Math.random() * 3);
    //   let col = Math.floor(Math.random() * 3);
    //   while (boardSelections[row][col] != "") {
    //     row = Math.floor(Math.random() * 3);
    //     col = Math.floor(Math.random() * 3);
    //   }
    //   const tempBoardSelections = [...boardSelections];
    //   tempBoardSelections[row][col] = "O";
    //   setBoardSelections(tempBoardSelections);
    //   setActivePlayer(1);
    // }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boardSelections[i][j] === null) {
          boardSelections[i][j] = "O";
          if (checkForWinner("O") === "O") {
            const tempBoardSelections = [...boardSelections];
            setBoardSelections(tempBoardSelections);
            setActivePlayer(1);
            return boardSelections;
          }
          boardSelections[i][j] = "";
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boardSelections[i][j] === "") {
          boardSelections[i][j] = "X";
          if (checkForWinner("X") === "X") {
            boardSelections[i][j] = "O";
            const tempBoardSelections = [...boardSelections];
            setBoardSelections(tempBoardSelections);
            setActivePlayer(1);
            return boardSelections;
          }
          boardSelections[i][j] = "";
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boardSelections[i][j] === "") {
          boardSelections[i][j] = "O";
          const tempBoardSelections = [...boardSelections];
          setBoardSelections(tempBoardSelections);
          setActivePlayer(1);
          return boardSelections;
        }
      }
    }
  };

  useEffect(() => {
    if (activePlayer == 2 && !isGameComplete && !gameDrawn) {
      setTimeout(() => {
        // const row = Math.floor(Math.random() * 3);
        // const col = Math.floor(Math.random() * 3);
        // const tempBoardSelections = [...boardSelections];
        // tempBoardSelections[row][col] = "O";
        // setBoardSelections(tempBoardSelections);
        // setActivePlayer(1);
        setTimeout(() => {
          makeCompMove();
        }, 500);
        const gameResult = gameCompleted();
        if (gameResult?.gameOver && !gameResult.gameDrawn) {
          setWinnerPlayer(activePlayer);
          setIsGameComplete(true);
        } else if (gameResult?.gameOver && gameResult.gameDrawn) {
          setGameDrawn(true);
          setIsGameComplete(true);
        }
      }, 1000);
    }
  }, [activePlayer]);

  const onPlayerMove = (item: string, row: number, col: number) => {
    if (item == "" && !isGameComplete) {
      const tempBoardSelections = [...boardSelections];
      tempBoardSelections[row][col] = activePlayer == 1 ? "X" : "O";
      setActivePlayer(activePlayer == 1 ? 2 : 1);
      setBoardSelections(tempBoardSelections);
      const gameResult = gameCompleted();
      if (gameResult?.gameOver && !gameResult.gameDrawn) {
        setWinnerPlayer(activePlayer);
        setIsGameComplete(true);
      } else if (gameResult?.gameOver && gameResult.gameDrawn) {
        setGameDrawn(true);
        setIsGameComplete(true);
      }
    } else {
      // alert("Invalid move!");
    }
  };

  return (
    <div className={`flex w-full h-full justify-center items-center relative`}>
      <div className={`flex flex-row w-full justify-center items-center`}>
        {!isGameComplete && (
          <div
            className={`w-48 h-4w-48 ${
              activePlayer == 1 ? "opacity-100" : "opacity-0"
            }`}
            ref={player1Ref}
          ></div>
        )}
        <div className={`flex flex-col mx-24`}>
          {boardSelections.map((item, row) => (
            <div className={`flex flex-row items-center mb-1`} key={row}>
              {item.map((item, col) => (
                <div className={`mr-1`} key={col}>
                  <BoardBtn
                    btnText={item}
                    onBtnClick={() => {
                      onPlayerMove(item, row, col);
                    }}
                    isBtnSelected={
                      boardSelections[row][col] != "" || isGameComplete
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        {!isGameComplete && (
          <div
            className={`w-48 h-4w-48 ${
              activePlayer == 2 ? "opacity-100" : "opacity-0"
            }`}
            ref={player2Ref}
          ></div>
        )}
      </div>
      {winnerPlayer != -1 && (
        <WinnerModal
          playerWon={activePlayer == 2 ? "You" : "Computer"}
          resetGame={resetGame}
          closeModal={closeModal}
        />
      )}
      {gameDrawn && (
        <GameDrawnModal resetGame={resetGame} closeModal={closeModal} />
      )}
    </div>
  );
}
