"use client";   

import React, { useState } from "react";
import { Input } from "./input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputPassword = ({ field }: { field: any }) => {
  const [hidden, setHidden] = useState(true);
  const toggleModal = (prev: any) => {
    setHidden((prev) => !prev);
  };
  return (
    <div className="relative">
      <Input {...field} type={hidden ? "password" : "text"} />
      <button
        className="absolute right-0 -translate-y-1/2 shrink-0 top-1/2"
        onClick={toggleModal}
        type="button"
      >
        {hidden ? (
          <AiOutlineEyeInvisible fontSize={26} />
        ) : (
          <AiOutlineEye fontSize={26} />
        )}
      </button>
    </div>
  );
};

export default InputPassword;
