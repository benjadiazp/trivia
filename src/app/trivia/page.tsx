import { Question as QuestionType } from "@/types";
import Match from "./Match";
import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic";

const getQuestionsData = async () => {
  const uri = `${process.env.MONGODB_URI}`;
  const client = new MongoClient(uri);
  await client.connect();
  const database = client.db("trivia");
  const collection = database.collection("questions");
  const questionsData = await collection.find({}).toArray();
  client.close();
  return questionsData;
};

function shuffleArray(array: QuestionType[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const getQuestions = async () => {
  const questionsData: any = await getQuestionsData();
  const questions = questionsData.map((question: QuestionType) => ({
    ...question,
    difficulty: question.difficulty ?? 5,
    time: question.time ?? 60,
  }));

  shuffleArray(questions);

  // Get the first 15 questions
  questions.splice(15);

  // Sort questions by difficulty
  questions.sort(
    (a: QuestionType, b: QuestionType) => a.difficulty - b.difficulty
  );
  return questions;
};

export default async function Game() {
  const questions = await getQuestions();

  return (
    <div>
      <Match questions={questions} />
    </div>
  );
}
