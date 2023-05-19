//Each question has 4 options, only one is correct.
export type Question = {
  _id: string;
  time: number;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  difficulty: any;
  category?: string;
  hint?: string;
};

export type GameState =
  | "playing"
  | "finished"
  | "failed"
  | "correct"
  | "paused"
  | "ready";

export type Word = {
  letter: string;
  word: string;
  definition: string;
  state: "guessed" | "failed" | "unanswered";
};
