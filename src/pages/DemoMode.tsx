import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Music, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const DemoMode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBonus, setShowBonus] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [email, setEmail] = useState("");
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
    ]

    return dotsByRow.map((dotsInRow, rowIndex) => {
      const dots = []

      for (let j = 0; j < dotsInRow; j++) {
        dots.push(
          <div key={`dot-${rowIndex}-${j}`} className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full opacity-70" />,
        )
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
      )
    })
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

  const handleBonusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Store the email in localStorage to use on the next page
    localStorage.setItem("userEmail", email);

    // Close the dialog and navigate to password creation
    setShowBonus(false);
    navigate("/create-password");
  };

  const menuItems = [
    {
      label: "Twitter",
      onClick: () => window.open("https://twitter.com", "_blank"),
    },
    {
      label: "Discord",
      onClick: () => window.open("https://discord.com", "_blank"),
    },
    { label: "How to play", onClick: () => {} },
    { label: "AML", onClick: () => {} },
    { label: "KYC", onClick: () => {} },
    { label: "Terms & Conditions", onClick: () => {} },
    { label: "Privacy Policy", onClick: () => {} },
    { label: "Responsible Gaming", onClick: () => {} },
    { label: "Customer Support", onClick: () => {} },
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
            <button
              onClick={() => navigate("/music")}
              className="text-white bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <Music className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowMenu(true)}
              className="text-white bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
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
            onClick={() => setShowBonus(true)}
            className="w-full bg-pink-400/70 backdrop-blur-sm text-white py-3 rounded-xl border border-pink-400/30 shadow-lg hover:bg-pink-400/90 transition-colors font-medium"
          >
            Please fund your wallet
          </Button>
        </div>
      </div>

      {/* Bonus Dialog */}
      <Dialog open={showBonus} onOpenChange={setShowBonus}>
        <DialogContent className="bg-gradient-to-b from-[#3a2a40] to-[#2a1a30] border-none p-0 max-w-sm mx-auto rounded-2xl overflow-hidden">
          <div className="flex flex-col items-center p-8">
            {/* Bonus Icon */}
            <div className="bg-pink-400 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12V22H4V12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 7H2V12H22V7Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22V7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title and Description */}
            <h2 className="text-white text-2xl font-bold text-center mb-2">
              You won 150% deposit bonus
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Register with your email to use it
            </p>

            {/* Form */}
            <form onSubmit={handleBonusSubmit} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@provider.com"
                  className="w-full bg-white/10 text-white p-4 rounded-xl border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
                />
              </div>

              <Button
                onClick={() => navigate("/create-password")}
                type="submit"
                className="w-full bg-pink-400 hover:bg-pink-500 text-white py-4 rounded-xl font-medium transition-all"
              >
                Continue
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Menu Dialog */}
      <Dialog open={showMenu} onOpenChange={setShowMenu}>
        <DialogContent className="bg-pink-500/80 backdrop-blur-md border-none max-w-xs mx-auto">
          <div className="flex flex-col space-y-0">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setShowMenu(false);
                }}
                className="text-white text-left py-3 px-4 hover:bg-white hover:bg-opacity-10 transition-colors border-b border-white border-opacity-10 last:border-b-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DemoMode;
