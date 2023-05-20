import Match from "./Match";
import { Word } from "@/types";
import { MongoClient } from "mongodb";

export const dynamic = "force dynamic";

type Definition = {
  word: string;
  definition: string;
};

type Definitions = {
  [key: string]: Definition[];
};

const getDefinitionsData = async () => {
  const uri = `${process.env.MONGODB_URI}`;
  const client = new MongoClient(uri);
  await client.connect();
  const database = client.db("trivia");
  const collection = database.collection("definitions");
  const questionsData = await collection.findOne({});
  client.close();
  return questionsData;
};

const getWords = async () => {
  const response: any = await getDefinitionsData();
  const definitionsData: Definitions = response.words;
  console.log(definitionsData);
  const words: Word[] = [];
  Object.keys(definitionsData).forEach((letter: string) => {
    const randomIndex = Math.floor(
      Math.random() * definitionsData[letter].length
    );
    const randomDefinition = definitionsData[letter][randomIndex];
    words.push({
      letter,
      word: randomDefinition.word,
      definition: randomDefinition.definition,
      state: "unanswered",
    });
  });
  return words;
};

export default async function Page() {
  const words = await getWords();
  return (
    <div className="flex flex-col items-center">
      <Match wordsData={words} />
    </div>
  );
}
