export const RestartGame = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children && <p className="text-sm">{children}</p>}
      <button
        className="bg-blue-400 text-white p-2 rounded-md cursor-pointer hover:bg-blue-300"
        onClick={() => window.location.reload()}
      >
        Play again
      </button>
    </div>
  );
};
