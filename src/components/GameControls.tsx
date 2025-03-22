import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Wallet, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameControlsProps {
  className?: string;
  onBonusClick?: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  className,
  onBonusClick,
}) => {
  const [mode, setMode] = useState<"manual" | "auto">("manual");

  return (
    <div className={cn("w-full max-w-md mx-auto space-y-4", className)}>
      <div className="flex rounded-xl overflow-hidden">
        <button
          className={cn(
            "flex-1 text-white py-3 px-6 transition-colors",
            mode === "manual" ? "bg-plinko-accent" : "bg-white bg-opacity-5"
          )}
          onClick={() => setMode("manual")}
        >
          Manual
        </button>
        <button
          className={cn(
            "flex-1 text-white py-3 px-6 transition-colors",
            mode === "auto" ? "bg-plinko-accent" : "bg-white bg-opacity-5"
          )}
          onClick={() => setMode("auto")}
        >
          Auto
        </button>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 bg-white bg-opacity-5 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            <div>
              <div className="text-sm text-gray-400">Wallet</div>
              <div className="text-white">Balance: 0</div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white bg-opacity-5 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-plinko-accent" />
            <div>
              <div className="text-sm text-gray-400">High</div>
              <div className="text-white">Risk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Betting Controls */}
      <div className="flex items-center justify-between bg-white bg-opacity-10 rounded-xl p-3">
        <div className="flex items-center gap-3">
          <span className="text-white text-xl font-medium">0</span>
          <span className="text-gray-400 text-sm">Balance: 0.37</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-md">
            1/2
          </button>
          <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-md">
            2x
          </button>
          <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-md">
            MAX
          </button>
          <button className="bg-white bg-opacity-20 text-white p-1 rounded-md">
            <Wallet className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Button
        onClick={onBonusClick}
        className="w-full bg-plinko-accent text-white py-4 rounded-xl"
      >
        Get Deposit Bonus
      </Button>
    </div>
  );
};

export default GameControls;
