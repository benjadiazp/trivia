export default function Landing() {
  return (
    <div className="text-center h-screen bg-purple-100 flex flex-col items-center justify-center gap-4">
      <p className="text-2xl">Bienvenido/a</p>
      <a
        href="./trivia"
        className="p-4 m-4 bg-purple-500 text-white rounded hover:bg-purple-700"
      >
        Trivia
      </a>
      <a
        href="./rosco"
        className="p-4 m-4 bg-purple-500 text-white rounded hover:bg-purple-700"
      >
        Rosco
      </a>
    </div>
  );
}
