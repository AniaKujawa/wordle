export const KeyboardChar = ({
  letter,
  className,
  onClick,
}: {
  letter: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-10 cursor-pointer h-10 bg-gray-200 rounded-sm flex items-center justify-center text-gray-800 border-2 border-gray-600 ${className}`}
    >
      {letter}
    </div>
  );
};
