import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Music, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<"manual" | "auto">("manual");

  // Generate dots for the Plinko board with exact arrangement from the image
  const renderPlinkoBoard = () => {
    // The image shows a triangular pattern with increasing dots per row
    // Starting with 3 dots in the first row and ending with 14 dots in the last row
    const dotsByRow = [
      3, // Row 1 (top)
      4, // Row 2
      5, // Row 3
      6, // Row 4
      7, // Row 5
      8, // Row 6
      9, // Row 7
      10, // Row 8
      11, // Row 9
      12, // Row 10
      13, // Row 11
      14, // Row 12 (bottom)
    ];

    return dotsByRow.map((dotsInRow, rowIndex) => {
      const dots = [];

      for (let j = 0; j < dotsInRow; j++) {
        dots.push(
          <div
            key={`dot-${rowIndex}-${j}`}
            className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full opacity-70"
          />
        );
      }

      return (
        <div
          key={`row-${rowIndex}`}
          className="flex justify-between items-center"
          style={{
            width: `${(dotsInRow / dotsByRow[dotsByRow.length - 1]) * 100}%`,
            margin: "0 auto",
          }}
        >
          {dots}
        </div>
      );
    });
  };

  // Multipliers
  const multipliers = [
    "10x",
    "5x",
    "3x",
    "2x",
    "0.9",
    "0.7",
    "0.9",
    "2x",
    "3x",
    "5x",
    "10x",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 to-purple-900 flex justify-center items-center p-4">
      {/* Main container with 80% width */}
      <div className="w-[80%] max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Plinko!</h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-white bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>14</span>
            </button>
            <button className="text-white bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
              <Music className="w-4 h-4" />
            </button>
            <button className="text-white bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-pink-500/30 backdrop-blur-md rounded-2xl p-4 mb-4 border border-white/10 shadow-lg">
          <div className="grid gap-3 md:gap-4">{renderPlinkoBoard()}</div>
        </div>

        {/* Multipliers */}
        <div className="flex justify-between mb-4 overflow-x-auto pb-1">
          {multipliers.map((multiplier, index) => (
            <button
              key={index}
              className="bg-pink-400 text-white text-xs md:text-sm px-2 py-1 rounded-md shadow-md hover:bg-pink-500 transition-colors flex-shrink-0 mx-0.5"
            >
              {multiplier}
            </button>
          ))}
        </div>

        {/* Game Controls */}
        <div className="space-y-3">
          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-1 bg-black/20 p-1 rounded-lg backdrop-blur-sm border border-white/5">
            <button
              className={`py-2 rounded-md text-white font-medium transition-colors ${
                activeMode === "manual"
                  ? "bg-pink-400 shadow-md"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => setActiveMode("manual")}
            >
              Manual
            </button>
            <button
              className={`py-2 rounded-md text-white font-medium transition-colors ${
                activeMode === "auto"
                  ? "bg-pink-400 shadow-md"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => setActiveMode("auto")}
            >
              Auto
            </button>
          </div>

          {/* Wallet and Risk */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 p-3 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-black/40 transition-colors">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-md">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 12V7H3V19H21V14"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10C14.8954 10 14 10.8954 14 12C14 13.1046 14.8954 14 16 14Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-300">Wallet</div>
                  <div className="text-white text-sm md:text-base font-medium">
                    Balance: 0
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/30 p-3 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-black/40 transition-colors">
              <div className="flex items-center gap-2">
                <div className="bg-pink-400/20 p-1.5 rounded-md">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 17L12 11M12 7L12 7.01"
                      stroke="#FF69B4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#FF69B4"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-300">High</div>
                  <div className="text-white text-sm md:text-base font-medium">
                    Risk
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Betting Controls */}
          <div className="bg-black/30 p-3 rounded-xl backdrop-blur-sm border border-white/5">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white text-lg md:text-xl font-medium">
                  0
                </div>
                <div className="text-xs text-gray-300">Balance: 0</div>
              </div>
              <div className="flex gap-2">
                <button className="bg-white/20 text-white text-xs px-2 py-1 rounded-md hover:bg-white/30 transition-colors">
                  1/2
                </button>
                <button className="bg-white/20 text-white text-xs px-2 py-1 rounded-md hover:bg-white/30 transition-colors">
                  2x
                </button>
                <button className="bg-white/20 text-white text-xs px-2 py-1 rounded-md hover:bg-white/30 transition-colors">
                  MAX
                </button>
              </div>
            </div>
          </div>

          {/* Fund Wallet Button */}
          <Button
            onClick={() => navigate("/wallet")}
            className="w-full bg-pink-400/70 backdrop-blur-sm text-white py-3 rounded-xl border border-pink-400/30 shadow-lg hover:bg-pink-400/90 transition-colors font-medium"
          >
            Please fund your wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
