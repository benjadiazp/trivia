"use client";
import { Word } from "@/types";

const calculatePosition = (index: number, total: number, radius: number) => {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  const x = radius * (1 + Math.cos(angle));
  const y = radius * (1 + Math.sin(angle));
  return { x, y };
};

export default function Wheel({
  words,
  currentWordIndex,
}: {
  words: Word[];
  currentWordIndex: number;
}) {
  return (
    <div>
      {words.map((word: Word, index) => {
        const { x, y } = calculatePosition(index, words.length, 200);
        return (
          <div
            key={word.letter}
            className={`absolute text-center w-10 h-10 rounded-full  border-2 border-black flex items-center justify-center ${
              word.state === "guessed"
                ? "bg-green-500"
                : word.state === "failed"
                ? "bg-red-500"
                : currentWordIndex === index
                ? "bg-blue-500"
                : "bg-white"
            }`}
            style={{ left: `${x}px`, top: `${y}px` }}
          >
            {word.letter}
          </div>
        );
      })}
    </div>
  );
}
