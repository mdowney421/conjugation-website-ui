"use client";

import { useMemo } from "react";

const COLORS = ["#0e7c5a", "#f4a93b", "#d64545", "#1e9e63", "#24a679", "#ffc164"];
const PIECE_COUNT = 70;

type ConfettiPiece = {
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  drift: number;
};

const Confetti = () => {
  const pieces = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: PIECE_COUNT }, () => ({
        left: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.4,
        duration: 2 + Math.random() * 1.2,
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 160,
      })),
    [],
  );

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((piece, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={
            {
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              "--confetti-rotation": `${piece.rotation}deg`,
              "--confetti-drift": `${piece.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default Confetti;
