import wordbank from "./wordbank.txt";

export const generateWordSet = async () => {
  let wordSet;
  let wordToGuess;
  await fetch(wordbank)
    .then((res) => res.text())
    .then((res) => {
      const wordArray = res.split("\n");
      wordToGuess = wordArray[Math.floor(Math.random() * wordArray.length)];
      wordSet = new Set(wordArray);
    });

  return { wordSet, wordToGuess };
};
