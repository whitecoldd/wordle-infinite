import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, current, correctWord, restart } = useContext(AppContext);
  return (
    <div className="mt-10">
      <h3
        className={`${
          gameOver.isWordGuessed ? "text-green-600" : "text-red-700"
        } text-5xl font-bold mb-4`}
      >
        {gameOver.isWordGuessed ? "You guessed correctly" : "You failed"}
      </h3>
      <h1 className="text-3xl font-semibold">
        Correct answer is{" "}
        <span className="font-extrabold text-gray-200">{correctWord}</span>
      </h1>
      {gameOver.isWordGuessed && (
        <h3 className="text-xl">You guessed in {current.row} attempts</h3>
      )}
      <button
        onClick={() => restart()}
        className={`${gameOver.isWordGuessed ? "bg-green-600" : "bg-red-700"} px-8 py-2 text-3xl uppercase mt-6`}
      >
        play again!
      </button>
    </div>
  );
}

export default GameOver;
