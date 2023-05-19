"use client";
import { Word } from "@/types";
import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Wheel from "./Wheel";
import { Modal } from "@mantine/core";

const timeLimit = 180;

export default function Match({ wordsData }: { wordsData: Word[] }) {
  const [words, setWords] = useState<Word[]>(wordsData);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0); // [0, 1, 2, 3]
  const [currentWord, setCurrentWord] = useState<Word>(words[0]);
  const [seconds, setSeconds] = useState<number>(timeLimit);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [gameState, setGameState] = useState<
    "ready" | "playing" | "success" | "failed"
  >("ready");
  const interval = useInterval(
    () => setSeconds((s) => (s > 0 ? s - 0.01 : 0)),
    10
  );

  useEffect(() => {
    if (seconds === 0) {
      setShowModal(true);
    }
  }, [seconds]);

  useEffect(() => {
    if (gameState === "playing") {
      interval.start();
    } else {
      interval.stop();
    }
    return () => {
      interval.stop();
    };
  }, [gameState]);

  const nextWord = () => {
    const newCurrentWordIndex = currentWordIndex + 1;
    const newCurrentWord =
      words.find(
        (word, index) =>
          index >= newCurrentWordIndex && word.state === "unanswered"
      ) ||
      words.find(
        (word, index) =>
          index < newCurrentWordIndex && word.state === "unanswered"
      );
    if (!newCurrentWord) {
      setGameState("success");
      setShowModal(true);
      return;
    }
    setCurrentWordIndex(words.indexOf(newCurrentWord));
    setCurrentWord(newCurrentWord);
  };

  return (
    <>
      {gameState === "ready" ? (
        <div className="text-center w-full h-full bg-purple-100 flex flex-col items-center justify-center justify-content-center gap-4">
          <div className="text-4xl">Rosco</div>
          <button
            className="p-4 m-4 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => setGameState("playing")}
          >
            Comenzar
          </button>
        </div>
      ) : (
        <div className="my-4 text-center bg-purple-100 flex flex-col items-center justify-center justify-content-center gap-4">
          <div className="text-4xl">Rosco</div>
          <div className="text-4xl font-bold font-mono">
            {seconds.toFixed(2)}
          </div>
          <div className="relative">
            <div className="text-4xl">{currentWord.word}</div>
            <div className="text-2xl">{currentWord.definition}</div>
            <div>
              <button
                className="p-4 m-4 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={() => {
                  const newWords = [...words];
                  newWords[currentWordIndex].state = "guessed";
                  setWords(newWords);
                  nextWord();
                }}
              >
                Correcta
              </button>
              <button
                className="p-4 m-4 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                onClick={() => {
                  const newWords = [...words];
                  newWords[currentWordIndex].state = "unanswered";
                  setWords(newWords);
                  nextWord();
                }}
              >
                Pasar
              </button>
              <button
                className="p-4 m-4 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => {
                  const newWords = [...words];
                  newWords[currentWordIndex].state = "failed";
                  setWords(newWords);
                  nextWord();
                }}
              >
                Incorrecta
              </button>
            </div>
          </div>
          <div className="flex justify-content-center">
            <div className="relative h-full w-96 flex justify-content-center align-items-center">
              <Wheel words={words} currentWordIndex={currentWordIndex} />
            </div>
          </div>
        </div>
      )}
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        title="Fin del juego"
        size="xl"
      >
        {gameState === "success" ? (
          <div className="text-center">
            <div className="text-4xl">¡Fin!</div>
            <div className="text-2xl">
              Finalizaste con {seconds.toFixed(2)} segundos restantes y{" "}
              {words.filter((word) => word.state === "guessed").length} de{" "}
              {words.length} palabras acertadas.
            </div>
            <div className="text-2xl">
              <button
                className="p-4 m-4 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={() => {
                  setGameState("ready");
                  setSeconds(timeLimit);
                  setWords(wordsData);
                  setCurrentWordIndex(0);
                  setCurrentWord(wordsData[0]);
                  setShowModal(false);
                }}
              >
                Volver a jugar
              </button>
            </div>
          </div>
        ) : gameState === "failed" ? (
          <div className="text-center">
            <div className="text-4xl">Tiempo acabado</div>
            <div className="text-2xl">
              Finalizaste con
              {words.filter((word) => word.state === "guessed").length} de{" "}
              {words.length} palabras acertadas.
            </div>
            <div className="text-2xl">
              <button
                className="p-4 m-4 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={() => {
                  setGameState("ready");
                  setSeconds(timeLimit);
                  setWords(wordsData);
                  setCurrentWordIndex(0);
                  setCurrentWord(wordsData[0]);
                  setShowModal(false);
                }}
              >
                Volver a jugar
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl">
              Finalizaste con {seconds.toFixed(2)} segundos restantes y{" "}
              {words.filter((word) => word.state === "guessed").length} de{" "}
              {words.length} palabras acertadas.
            </div>
            <div className="text-2xl">
              <button
                className="p-4 m-4 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={() => {
                  setGameState("ready");
                  setSeconds(timeLimit);
                  setWords(wordsData);
                  setCurrentWordIndex(0);
                  setCurrentWord(wordsData[0]);
                  setShowModal(false);
                }}
              >
                Volver a jugar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
