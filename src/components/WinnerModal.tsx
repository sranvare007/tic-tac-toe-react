import { LottiePlayer } from "lottie-web";
import React, { useEffect, useRef, useState } from "react";

export type WinnerModalProps = {
  playerWon: string;
};

export default function WinnerModal({ playerWon }: WinnerModalProps) {
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
    >
      <div
        className={`w-1/3 h-1/2 bg-white rounded-md relative flex flex-row justify-center items-center`}
      >
        <div
          className={`w-full h-full absolute top-0 left-0 right-0 bottom-0`}
          ref={confettiRef}
        ></div>
        <div className={`flex flex-col items-center -mt-16`}>
          <div className={`w-32 h-32`} ref={trophyRef}></div>
          <p className={`font-bold text-6xl font-serif mt-4`}>Congrats!</p>
          <p className={`font-semibold text-3xl font-mono mt-10 text-center`}>
            Player {playerWon} has won the game
          </p>
        </div>
      </div>
    </div>
  );
}
