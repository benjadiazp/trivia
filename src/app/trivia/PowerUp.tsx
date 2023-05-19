export default function PowerUp({
  children,
  onPowerUp,
}: {
  children: React.ReactNode;
  onPowerUp: () => void;
}) {
  return (
    <button
      className={`PowerUpButton flex flex-col items-center justify-center gap-1 p-2
    `}
      onClick={() => onPowerUp()}
    >
      {children}
    </button>
  );
}
