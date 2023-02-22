import React, { useState } from "react";
import { BoardBtnProps } from "../types";

export default function BoardBtn({
  btnText,
  onBtnClick,
  isBtnSelected,
}: BoardBtnProps) {
  return (
    <div
      className={`flex flex-row h-28 w-28 bg-[#D61355] justify-center items-center drop-shadow-lg cursor-pointer not-selectable rounded-lg ${
        !isBtnSelected
          ? "hover:scale-105 hover:opacity-95 transition-all duration-150"
          : ""
      }`}
      onClick={onBtnClick}
    >
      <p className={`text-5xl text-white font-semibold font-sans`}>{btnText}</p>
    </div>
  );
}
