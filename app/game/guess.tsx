interface GuessProps {
  guess: string;
  currentGuess: string;
  isCurrentGuess: boolean;
  word: string;
}

export const Guess = ({
  guess,
  currentGuess,
  isCurrentGuess,
  word,
}: GuessProps) => {
  const renderBackground = (index: number) => {
    if (guess[index] === word[index]) {
      return "bg-green-500";
    } else if (word.includes(guess[index])) {
      return "bg-yellow-500";
    } else {
      return "bg-gray-400";
    }
  };

  const renderGuess = () => {
    return (
      <>
        {word.split("").map((_, index) => {
          return (
            <div
              key={index}
              className={`w-10 h-10 bg-gray-200 rounded-sm flex items-center justify-center text-gray-800 border-2 border-gray-600
              ${!isCurrentGuess && guess[index] && renderBackground(index)}
              `}
            >
              {isCurrentGuess ? currentGuess[index] : guess[index]}
            </div>
          );
        })}
      </>
    );
  };
  return <div className="grid grid-cols-5 gap-2">{renderGuess()}</div>;
};
