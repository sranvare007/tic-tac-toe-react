import { MouseEventHandler } from "react";

export type BoardBtnProps = {
  btnText: string;
  onBtnClick: MouseEventHandler<HTMLElement>;
  isBtnSelected: boolean;
};

export type WinnerModalProps = {
  playerWon: string;
  resetGame: Function;
  closeModal: Function;
};

export type GameDrawnModalProps = {
  resetGame: Function;
  closeModal: Function;
};
