"use client";

import { ButtonProps } from "@/app/types";

import React from "react";

const Button = ({
  title,
  containerStyles,
  handleClick,
  btnType = "button",
}: ButtonProps) => {
  return (
    <button
      disabled={false}
      type={btnType}
      className={`flex flex-row relative justify-center items-center py-3 px-6 outline-none ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1`}>{title}</span>
    </button>
  );
};

export default Button;
