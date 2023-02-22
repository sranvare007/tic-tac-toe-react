import { LottiePlayer } from "lottie-web";
import React, { useEffect, useRef, useState } from "react";
import { WinnerModalProps } from "../types";

export default function WinnerModal({
  playerWon,
  resetGame,
  closeModal,
}: WinnerModalProps) {
  const confettiRef = useRef<HTMLDivElement>(null);
  const trophyRef = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie) {
      if (confettiRef.current && trophyRef.current) {
        const animation = lottie.loadAnimation({
          container: confettiRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/confetti-animation.json",
        });

        const animation2 = lottie.loadAnimation({
          container: trophyRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/trophy-animation.json",
        });

        return () => {
          animation.destroy();
          animation2.destroy();
        };
      }
    }
  }, [lottie]);

  return (
    <div
      className={`w-screen h-screen absolute top-0 left-0 right-0 bottom-0 bg-[#56585c] bg-opacity-30 flex flex-row justify-center items-center`}
      onClick={() => {
        closeModal();
      }}
    >
      <div
        className={`w-1/3 h-2/3 bg-white rounded-md relative flex flex-row justify-center items-center`}
      >
        <div
          className={`absolute top-0 left-0 right-0 bottom-0`}
          ref={confettiRef}
        ></div>
        <div className={`flex flex-col items-center`}>
          <div className={`w-32 h-32`} ref={trophyRef}></div>
          <p className={`font-bold text-6xl font-serif mt-4`}>Congrats!</p>
          <p className={`font-semibold text-3xl font-mono mt-10 text-center`}>
            Player {playerWon} has won the game
          </p>
          <div
            className={`flex flex-row w-full justify-center items-center bg-blue-300 py-4 rounded-md mt-6 cursor-pointer z-10`}
            onClick={() => {
              resetGame();
            }}
          >
            <p className={`text-white font-semibold font-mono text-2xl`}>
              Restart Game
            </p>
          </div>
          <div
            className={`flex flex-row w-full justify-center items-center bg-blue-300 py-4 rounded-md mt-6 cursor-pointer z-10`}
            onClick={() => {
              closeModal();
            }}
          >
            <p className={`text-white font-semibold font-mono text-2xl`}>
              Close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
