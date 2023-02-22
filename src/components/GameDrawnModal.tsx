import { LottiePlayer } from "lottie-web";
import React, { useEffect, useRef, useState } from "react";

export default function GameDrawnModal() {
  const gameTieRef = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie) {
      if (gameTieRef.current) {
        const animation2 = lottie.loadAnimation({
          container: gameTieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/game-tied-animation.json",
        });

        return () => {
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
        <div className={`flex flex-col items-center -mt-16`}>
          <div className={`w-40 h-4w-40`} ref={gameTieRef}></div>
          <p className={`font-bold text-6xl font-serif `}>Game Drawn!</p>
          <p className={`font-semibold text-3xl font-mono mt-10 text-center`}>
            Game is drawn since no one won.
          </p>
        </div>
      </div>
    </div>
  );
}
