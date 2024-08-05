import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ row, position }) {
  //TODO colors
  const { board, current, setUsedLetters, colors } = useContext(AppContext);
  const letter = board[row][position];

  const correct =
    colors.length &&
    colors[row] &&
    colors[row].length &&
    colors[row][position] === "green";

  const almost =
    colors.length &&
    colors[row] &&
    colors[row].length &&
    colors[row][position] === "yellow";

  const letterState =
    current.row > row &&
    (correct ? "bg-green-600" : almost ? "bg-yellow-500" : "bg-gray-700");

  useEffect(() => {
    if (correct) {
      setUsedLetters((prev) => {
        return { ...prev, correct: [...prev.correct, letter] };
      });
    } else if (almost) {
      setUsedLetters((prev) => {
        return { ...prev, almost: [...prev.almost, letter] };
      });
    } else if (letter !== "" && !correct && !almost) {
      setUsedLetters((prev) => {
        return { ...prev, wrong: [...prev.wrong, letter] };
      });
    }
  }, [current.row]);

  return (
    <div
      className={`flex-[33%] h-full border border-solid border-white m-[5px] grid place-items-center text-[30px] font-extrabold text-white ${letterState} `}
    >
      {letter}
    </div>
  );
}

export default Letter;
