import { createContext, useEffect, useRef, useState } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { generateWordSet } from "./utils";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function getWordleColorsAdvanced(guess, target, returnFn) {
  const colors = Array(guess.length).fill("gray");
  const targetLetterCount = {};
  const guessLetterCount = {};

  // First pass: Count letters in target and check for greens
  for (let i = 0; i < target.length; i++) {
    if (target[i] === guess[i]) {
      colors[i] = "green";
    } else {
      targetLetterCount[target[i]] = (targetLetterCount[target[i]] || 0) + 1;
      guessLetterCount[guess[i]] = (guessLetterCount[guess[i]] || 0) + 1;
    }
  }

  // Second pass: Check for yellows
  for (let i = 0; i < guess.length; i++) {
    if (colors[i] === "green") continue;

    const guessChar = guess[i];
    if (targetLetterCount[guessChar] && guessLetterCount[guessChar]) {
      colors[i] = "yellow";
      targetLetterCount[guessChar]--;
      guessLetterCount[guessChar]--;
    }
  }
  returnFn((prev) => {
    return [...prev, colors];
  });
}

const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const gameDefault = {
  isGameOver: false,
  isWordGuessed: false,
};

const lettersDefault = {
  wrong: [],
  correct: [],
  almost: [],
};

const word = localStorage.getItem("correctWord");

function App() {
  const [board, setBoard] = useState(
    JSON.parse(JSON.stringify([...boardDefault]))
  );
  const [current, setCurrent] = useState({ row: 0, position: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [colors, setColors] = useState([]);
  const [usedLetters, setUsedLetters] = useState(lettersDefault);
  const [correctWord, setCorrectWord] = useState(word);
  const [gameOver, setGameOver] = useState(gameDefault);
  const [error, setError] = useState(false);
  const rowRef = useRef([]);

  const restart = () => {
    setBoard(JSON.parse(JSON.stringify([...boardDefault])));
    setGameOver(gameDefault);
    setUsedLetters(lettersDefault);
    setCurrent({ row: 0, position: 0 });
    setColors([]);
    setError(false);
    generateWordSet().then((words) => {
      handleWord(words.wordToGuess);
    });
  };

  const handleWord = (realWord) => {
    localStorage.setItem("correctWord", realWord);
    setCorrectWord(realWord);
  };

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      if (!word || word === "") {
        handleWord(words.wordToGuess);
      }
    });
  }, [word]);

  const onTypeLetter = (value) => {
    error && setError(false);
    if (current.position > 4) return;
    const currentBoard = [...board];
    currentBoard[current.row][current.position] = value;
    setBoard(currentBoard);
    setCurrent((prev) => {
      return { ...prev, position: prev.position + 1 };
    });
  };

  const onDelete = () => {
    if (current.position === 0) return;
    const currentBoard = [...board];
    currentBoard[current.row][current.position - 1] = "";
    setBoard(currentBoard);
    setCurrent((prev) => {
      return { ...prev, position: prev.position - 1 };
    });
  };

  useEffect(() => {
    if (error) {
      rowRef.current[current.row].classList.add("error-shake");
    } else {
      if (rowRef.current[current.row].classList.contains("error-shake"))
        rowRef.current[current.row].classList.remove("error-shake");
    }
  }, [error]);

  const onEnter = () => {
    if (current.position !== 5) return;

    let word = board[current.row].join("").toLowerCase();

    if (wordSet.has(word)) {
      setCurrent({ row: current.row + 1, position: 0 });
      getWordleColorsAdvanced(word, correctWord, setColors);
    } else {
      setError(true);
    }

    if (word === correctWord) {
      setGameOver({ isGameOver: true, isWordGuessed: true });
      return;
    }

    if (current.row === 5 && wordSet.has(word)) {
      setGameOver({ isGameOver: true, isWordGuessed: false });
    }
  };

  return (
    <div className="text-center bg-[#121212] w-[100vw] h-[100vh] text-white">
      <nav className="h-16 w-full m-0 border-b border-solid border-gray-500 grid place-items-center">
        <h1 className="m-0 text-white text-[45px]">Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          current,
          onTypeLetter,
          onDelete,
          onEnter,
          correctWord,
          usedLetters,
          setUsedLetters,
          gameOver,
          colors,
          restart,
        }}
      >
        <div className="grid place-items-center pt-16">
          <Board rowRef={rowRef} />
          {error && (
            <h3 className="text-xl text-red-600 mt-4 -mb-11">
              No such word in a dictionary
            </h3>
          )}
          {gameOver.isGameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
