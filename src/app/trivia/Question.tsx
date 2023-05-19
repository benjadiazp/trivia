"use client";
import { useEffect, useState } from "react";
import { GameState, Question as QuestionType } from "@/types";
import { useInterval } from "@mantine/hooks";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";

export default function Question({
  question,
  onAnswer,
  gameState,
  setGameState,
}: {
  question: QuestionType;
  onAnswer: (isCorrect: boolean) => void;
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
}) {
  const [seconds, setSeconds] = useState(question.time ?? 60);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // [0, 1, 2, 3]
  const interval = useInterval(
    () => setSeconds((s) => (s > 0 ? s - 0.01 : 0)),
    10
  );

  useEffect(() => {
    setSeconds(question.time ?? 60);
  }, [question]);

  useEffect(() => {
    if (gameState === "playing") {
      interval.start();
    } else {
      interval.stop();
    }
  }, [gameState]);

  useEffect(() => {
    if (seconds === 0) {
      setGameState("failed");
    }
  }, [seconds]);

  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-4">
          <p className="text-2xl font-mono">
            {seconds.toLocaleString("es", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          {/* pause button */}
          {gameState === "playing" && (
            <button
              className="h-8 w-8 text-gray-500 hover:text-gray-700"
              onClick={() => setGameState("paused")}
            >
              <span className="sr-only">Pausar</span>
              <PauseIcon />
            </button>
          )}
          {gameState === "paused" && (
            <button
              className="h-8 w-8 text-gray-500 hover:text-gray-700"
              onClick={() => setGameState("playing")}
            >
              <span className="sr-only">Reanudar</span>
              <PlayIcon />
            </button>
          )}
        </div>

        <h2
          className={`text-2xl font-bold text-center my-4
          ${gameState === "failed" ? "text-red-500" : ""}`}
        >
          {question.question}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {question.answers.map((alternative, index) => (
            <button
              key={index}
              className={`p-4 m-4 text-white rounded  
              ${
                gameState === "failed" || gameState === "correct"
                  ? index === question.correctAnswerIndex
                    ? "bg-green-500"
                    : index === selectedAnswer
                    ? "bg-red-500"
                    : "bg-violet-500"
                  : "bg-violet-500 hover:bg-violet-700"
              }
              `}
              onClick={() => {
                setSelectedAnswer(index);
                onAnswer(index === question.correctAnswerIndex);
              }}
            >
              {String.fromCharCode(65 + index) + ") "}
              {gameState === "paused" ? "???" : alternative}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
