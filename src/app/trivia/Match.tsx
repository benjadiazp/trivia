"use client";

import { useState } from "react";

import { GameState, Question as QuestionType } from "@/types";
import Question from "./Question";
import {
  PhoneIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import PowerUp from "./PowerUp";

import Image from "next/image";

export default function Match({ questions }: { questions: QuestionType[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // [0, 1, 2, 3]
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>(
    questions[0]
  );
  const [gameState, setGameState] = useState<GameState>("ready");

  if (gameState === "finished") {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-mono">¡Ganaste una foto de un oso!</p>
        <Image
          src="https://placebear.com/800/800"
          alt="oso"
          width={800}
          height={800}
          className="rounded-xl shadow-xl h-64 w-64"
        />
      </div>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        {gameState === "ready" ? (
          <button
            className="p-4 m-4 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => setGameState("playing")}
          >
            Comenzar
          </button>
        ) : (
          <>
            <div className="flex flex-row items-center justify-center gap-4">
              {currentQuestion.hint && (
                <PowerUp
                  onPowerUp={() => {
                    alert(currentQuestion.hint);
                  }}
                >
                  <QuestionMarkCircleIcon className="w-8 h-8" />
                  Pista
                </PowerUp>
              )}

              <PowerUp
                onPowerUp={() => {
                  setGameState("paused");
                }}
              >
                <PhoneIcon className="w-8 h-8" />
                Llamada
              </PowerUp>
              <PowerUp
                onPowerUp={() => {
                  setGameState("paused");
                }}
              >
                <UsersIcon className="w-8 h-8" />
                Público
              </PowerUp>
              <PowerUp
                onPowerUp={() => {
                  const correctAnswerIndex = currentQuestion.correctAnswerIndex;
                  const correctAnswer =
                    currentQuestion.answers[correctAnswerIndex];
                  const answers = currentQuestion.answers.filter(
                    (answer) => answer !== correctAnswer
                  );
                  const shuffledAnswers = answers.sort(
                    () => Math.random() - 0.5
                  );
                  shuffledAnswers.splice(
                    0,
                    Math.ceil(shuffledAnswers.length / 2)
                  );
                  const newIndexOfCorrectAnswer = Math.round(
                    Math.random() * shuffledAnswers.length
                  );
                  shuffledAnswers.splice(
                    newIndexOfCorrectAnswer,
                    0,
                    correctAnswer
                  );
                  setCurrentQuestion({
                    ...currentQuestion,
                    answers: shuffledAnswers,
                    correctAnswerIndex: newIndexOfCorrectAnswer,
                  });
                }}
              >
                <ScaleIcon className="w-8 h-8" />
                50/50
              </PowerUp>
            </div>
            <p className="text-2xl font-mono">
              Pregunta {currentQuestionIndex + 1} / {questions.length}
            </p>
            <Question
              question={currentQuestion}
              onAnswer={(isCorrect) => {
                setGameState(isCorrect ? "correct" : "failed");
              }}
              gameState={gameState}
              setGameState={setGameState}
            />
            {gameState === "correct" && (
              <button
                className="p-4 m-4 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={() => {
                  if (currentQuestionIndex === questions.length - 1) {
                    setGameState("finished");
                    return;
                  }
                  setCurrentQuestionIndex((i) => i + 1);
                  setCurrentQuestion(questions[currentQuestionIndex + 1]);
                  setGameState("playing");
                }}
              >
                Siguiente
              </button>
            )}
            {gameState === "failed" && (
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-2xl font-mono">Perdiste</p>
                <button
                  className="p-4 m-4 bg-green-500 text-white rounded hover:bg-green-700"
                  onClick={() => {
                    //refresh page
                    window.location.reload();
                  }}
                >
                  Volver a jugar
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
