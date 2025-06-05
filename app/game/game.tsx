import { useCallback, useEffect, useRef, useState } from "react";
import { WORDS_LIST } from "./words";
import { RestartGame } from "./restartGame";
import { Guess } from "./guess";
import { KeyboardChar } from "./char";

const qwertyRows = [
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm"
]
const MAX_GUESSES = 6;

export const Game = () => {
  const [word, setWord] = useState<string>("");
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_GUESSES).fill(""));
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongPositionLetters, setWrongPositionLetters] = useState<string[]>([]);
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

  const handleLetterClick = useCallback((letter: string) => {
    const isGameOver = isGameOverRef.current;
    const isGameWon = isGameWonRef.current;
    const currentGuess = currentGuessRef.current;
    const currentGuessIndex = currentGuessIndexRef.current;

    if (isGameOver || isGameWon) return;
    if (letter === "Enter" && currentGuess.length === word.length) {
      setGuesses((guesses) => {
        const newGuesses = [...guesses];    
        newGuesses[currentGuessIndex] = currentGuess;
        return newGuesses;
      });
      currentGuess.split("").forEach((char, index) => {
        if (char === word[index]) {
          setCorrectLetters((correctLetters) => [...correctLetters, char]);
        } else if (word.includes(char)) {
          setWrongPositionLetters((wrongPositionLetters) => [...wrongPositionLetters, char]);
        } else {
          setUsedLetters((usedLetters) => [...usedLetters, char]);
        }
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
    if (/^[a-zA-Z]$/.test(letter)) {
      if (currentGuess.length < word.length) {
        setCurrentGuess((prev) => prev + letter.toLowerCase());
      }
    }
    if (letter === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, prev.length - 1));
    }
  }, [word]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleLetterClick(event.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleLetterClick]);

  const getLetterClassName = (letter: string) => {
    if (correctLetters.includes(letter)) {
      return "bg-green-500";
    } else if (wrongPositionLetters.includes(letter)) {
      return "bg-yellow-500";
    } else if (usedLetters.includes(letter)) {
      return "bg-gray-400";
    }
    return "bg-gray-200";
  };


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
      <div className="flex flex-col gap-1">
        {qwertyRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {rowIndex === 2 && (
              <KeyboardChar letter="Enter" onClick={() => handleLetterClick("Enter")} className="w-15" />
            )}
            {row.split("").map((letter) => (
              <KeyboardChar
                key={letter}
                onClick={() => handleLetterClick(letter)}
                letter={letter}
                className={getLetterClassName(letter)}
              />
            ))}
            {rowIndex === 2 && (
              <KeyboardChar letter="Backspace" onClick={() => handleLetterClick("Backspace")} className="w-25" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
