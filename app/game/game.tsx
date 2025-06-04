import { useEffect, useRef, useState } from "react";
import { WORDS_LIST } from "./words";
import { RestartGame } from "./restartGame";
import { Guess } from "./guess";

const MAX_GUESSES = 6;

export const Game = () => {
  const [word, setWord] = useState<string>("");
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_GUESSES).fill(""));
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

  const currentGuessRef = useRef(currentGuess);
  const isGameOverRef = useRef(isGameOver);
  const isGameWonRef = useRef(isGameWon);
  const currentGuessIndexRef = useRef(currentGuessIndex);

  useEffect(() => {
    currentGuessRef.current = currentGuess;
  }, [currentGuess]);
  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);
  useEffect(() => {
    isGameWonRef.current = isGameWon;
  }, [isGameWon]);
  useEffect(() => {
    currentGuessIndexRef.current = currentGuessIndex;
  }, [currentGuessIndex]);

  useEffect(() => {
    setWord(WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isGameOver = isGameOverRef.current;
      const isGameWon = isGameWonRef.current;
      const currentGuess = currentGuessRef.current;
      const currentGuessIndex = currentGuessIndexRef.current;

      if (isGameOver || isGameWon) return;
      if (event.key === "Enter" && currentGuess.length === word.length) {
        setGuesses((guesses) => {
          const newGuesses = [...guesses];
          newGuesses[currentGuessIndex] = currentGuess;
          return newGuesses;
        });
        setCurrentGuess("");
        setCurrentGuessIndex((currentGuessIndex) => currentGuessIndex + 1);
        if (currentGuess === word) {
          setIsGameWon(true);
          return;
        }
        if (currentGuessIndex === MAX_GUESSES - 1) {
          setIsGameOver(true);
          return;
        }
      }
      if (/^[a-zA-Z]$/.test(event.key)) {
        if (currentGuess.length < word.length) {
          setCurrentGuess((prev) => prev + event.key.toLowerCase());
        }
      }
      if (event.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, prev.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [word]);

  return (
    <>
      {isGameWon && <RestartGame title="You won!" />}
      {isGameOver && (
        <RestartGame title="You lost!">
          Correct word was{" "}
          <span className="font-bold text-blue-300">{word}</span>
        </RestartGame>
      )}
      <div className="flex flex-col gap-3">
        {guesses.map((guess, index) => (
          <Guess
            key={index}
            guess={guess}
            currentGuess={currentGuess}
            isCurrentGuess={index === currentGuessIndex}
            word={word}
          />
        ))}
      </div>
    </>
  );
};
