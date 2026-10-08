import { useEffect, useState } from "react";
import { Card } from "./Card";

const DURATION = 25 * 60; // 25 minutes, en secondes

const format = (total: number) => {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [running, setRunning] = useState(false);

  // L'intervalle existe uniquement tant que le timer tourne
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => s - 1); // forme fonctionnelle : pas de valeur périmée
    }, 1000);
    return () => clearInterval(id); // nettoyage : pause, reset ou démontage
  }, [running]);

  // Arrêt automatique à 00:00
  useEffect(() => {
    if (secondsLeft <= 0) setRunning(false);
  }, [secondsLeft]);

  const reset = () => {
    setRunning(false);
    setSecondsLeft(DURATION);
  };

  const finished = secondsLeft <= 0;

  return (
    <Card
      title="Concentration"
      actions={
        <div className="timer-actions">
          <button onClick={() => setRunning((r) => !r)} disabled={finished}>
            {running ? "Pause" : "Démarrer"}
          </button>
          <button onClick={reset}>Réinitialiser</button>
        </div>
      }
    >
      <p className="timer" role="timer">
        {format(Math.max(secondsLeft, 0))}
      </p>
    </Card>
  );
}