import { Game } from "~/game/game";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <header className="flex flex-col items-center gap-9 text-4xl font-bold">
          Welcome to Wordle game!
        </header>
        <div className="max-w-[800px] w-full space-y-2 px-4">
          <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
            How to play? Get 6 chances to guess a 5-letter word.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-200 text-center">
            Type a word and press enter to submit your guess. Green letters mean
            the letter is in the word and in the correct position. Yellow
            letters mean the letter is in the word but in the wrong position.
            Gray letters mean the letter is not in the word.
          </p>
        </div>
        <Game />
      </div>
    </main>
  );
}
