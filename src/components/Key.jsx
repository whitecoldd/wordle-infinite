import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ value, bigKey, wrong, correct, almost }) {
  const { onEnter, onDelete, onTypeLetter } = useContext(AppContext);

  const onKeyboardAction = () => {
    if (value.toLowerCase() === "enter") {
      onEnter();
    } else if (value.toLowerCase() === "delete") {
      onDelete();
    } else {
      onTypeLetter(value);
    }
  };
  return (
    <div
      onClick={onKeyboardAction}
      className={`h-[70px] m-[5px] rounded grid place-items-center text-xl  text-white cursor-pointer ${
        bigKey ? "w-[100px]" : "w-[50px]"
      }  ${
        correct
          ? "bg-green-600"
          : almost
          ? "bg-yellow-500"
          : wrong
          ? "bg-gray-700"
          : "bg-gray-500"
      }`}
    >
      {value}
    </div>
  );
}

export default Key;
