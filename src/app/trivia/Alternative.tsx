import { GameState } from "@/types";

export default function Alternative({
  isCorrect,
  gamestate,
  text,
  onClick,
}: {
  isCorrect: boolean;
  gamestate: GameState;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`p-4 m-4 ${
        gamestate === "playing" || gamestate === "paused"
          ? "bg-purple-500 text-white rounded hover:bg-purple-700"
          : isCorrect
          ? "bg-green-500 text-white rounded hover:bg-green-700"
          : "bg-red-500 text-white rounded hover:bg-red-700"
      }`}
      onClick={onClick}
    >
      {gamestate === "paused" ? "???" : text}
    </button>
  );
}
