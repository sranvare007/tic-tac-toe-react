import { MouseEventHandler } from "react";

export type BoardBtnProps = {
  btnText: string;
  onBtnClick: MouseEventHandler<HTMLElement>;
};
