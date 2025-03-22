import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PlinkoBoardProps {
  className?: string;
  multipliers?: string[];
  onBallDrop?: (multiplier: string) => void;
}

const PlinkoBoard: React.FC<PlinkoBoardProps> = ({
  className,
  multipliers = ["500%", "250%", "100%", "50%", "100%", "250%", "500%"],
  onBallDrop,
}) => {
  const rows = 12;
  const [activeBall, setActiveBall] = useState<{
    x: number;
    y: number;
    path: number[];
  } | null>(null);
  const [lastMultiplier, setLastMultiplier] = useState<string | null>(null);

  const getDotsForRow = (rowIndex: number) => {
    return Array.from({ length: rowIndex + 1 }, (_, i) => (
      <div key={i} className="w-2 h-2 bg-white rounded-full opacity-70" />
    ));
  };

  const dropBall = () => {
    // Start position is random within the top area
    const startX = Math.floor(Math.random() * 7);

    // Generate a random path for the ball
    const path: number[] = [];
    let currentX = startX;

    for (let i = 0; i < rows; i++) {
      // For each row, the ball can go left or right
      const direction = Math.random() > 0.5 ? 1 : -1;
      // Make sure the ball stays within bounds
      if (currentX + direction >= 0 && currentX + direction <= i + 1) {
        currentX += direction;
      }
      path.push(currentX);
    }

    // Set the active ball with its path
    setActiveBall({ x: startX, y: 0, path });

    // Animate the ball falling
    let currentRow = 0;
    const interval = setInterval(() => {
      if (currentRow >= rows) {
        clearInterval(interval);

        // Determine which multiplier was hit
        const multiplierIndex = Math.min(
          Math.floor(currentX / (rows / multipliers.length)),
          multipliers.length - 1
        );
        const hitMultiplier = multipliers[multiplierIndex];
        setLastMultiplier(hitMultiplier);

        if (onBallDrop) {
          onBallDrop(hitMultiplier);
        }

        // Reset after a delay
        setTimeout(() => {
          setActiveBall(null);
        }, 1000);

        return;
      }

      setActiveBall((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          y: currentRow,
          x: prev.path[currentRow],
        };
      });

      currentRow++;
    }, 200);
  };

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)}>
      <div className="relative bg-plinko-primary bg-opacity-50 backdrop-blur-md rounded-3xl p-6 mb-4">
        {/* Ball drop button */}
        <button
          onClick={dropBall}
          disabled={!!activeBall}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-plinko-accent text-white px-4 py-2 rounded-full z-10 hover:bg-opacity-80 transition-colors"
        >
          Drop Ball
        </button>

        {/* Plinko board */}
        <div className="grid gap-4">
          {Array.from({ length: rows }, (_, i) => (
            <div key={i} className="flex justify-around items-center">
              {getDotsForRow(i)}
            </div>
          ))}
        </div>

        {/* Active ball */}
        {activeBall && (
          <div
            className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-lg z-20 transition-all duration-200"
            style={{
              top: `${(activeBall.y / rows) * 100}%`,
              left: `${(activeBall.x / (rows - 1)) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>

      {/* Multipliers */}
      <div className="flex justify-between">
        {multipliers.map((multiplier, index) => (
          <button
            key={index}
            className={cn(
              "bg-plinko-accent text-white px-2 py-1 rounded-md text-sm transition-all",
              lastMultiplier === multiplier &&
                "ring-2 ring-yellow-400 scale-110"
            )}
          >
            {multiplier}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlinkoBoard;
