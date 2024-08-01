import React, { useCallback, useContext, useEffect } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const keyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function Keyboard() {
  const { onTypeLetter, onEnter, onDelete, usedLetters } =
    useContext(AppContext);
  const handleKeyboard = useCallback((e) => {
    if (e.key.toLowerCase() === "enter") {
      onEnter();
    } else if (e.key.toLowerCase() === "backspace") {
      onDelete();
    } else {
      if (keyboardLayout.flat().includes(e.key.toUpperCase()))
        onTypeLetter(e.key.toUpperCase());
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="w-[700px] h-[300px] mt-14" onKeyDown={handleKeyboard}>
      {keyboardLayout.map((row, i) => (
        <div
          key={i}
          className="flex-[33%] flex flex-row justify-center m-[5px]"
        >
          {i === keyboardLayout.length - 1 && <Key bigKey value={"ENTER"} />}
          {row.map((value, j) => (
            <Key
              key={j}
              value={value}
              wrong={usedLetters.wrong.includes(value)}
              correct={usedLetters.correct.includes(value)}
              almost={usedLetters.almost.includes(value)}
            />
          ))}
          {i === keyboardLayout.length - 1 && <Key bigKey value={"DELETE"} />}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
