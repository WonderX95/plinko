"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Music, MoreVertical, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ChatPanel from "@/components/ChatPanel";
import { MusicPlayer } from "@/components/MusicPlayer";
import Matter, {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  IEventCollision,
  Render,
  Runner,
  World,
} from "matter-js";

type ModeType = "manual" | "auto";

// Game configuration with updated pink colors from HomePage
const config = {
  pins: {
    startPins: 3,
    pinSize: 6,
    pinGap: 40,
  },
  ball: {
    ballSize: 10,
  },
  engine: {
    engineGravity: 1,
  },
  world: {
    width: 600,
    height: 700,
  },
  colors: {
    background: "transparent", // Let the gradient background show through
    pin: "#FFFFFF", // White pins with opacity applied in render
    ball: "#FFFFFF",
    multiplierZone: "#FF69B4", // Pink multiplier zone matching HomePage
  },
};

// Multiplier values
const multipliers = [
  "110",
  "41",
  "10",
  "5",
  "3",
  "1.5",
  "1",
  "0.5",
  "0.3",
  "0.5",
  "1",
  "1.5",
  "3",
  "5",
  "10",
  "41",
  "110",
];

const FundedHomePage = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<ModeType>("manual");
  const [betAmount, setBetAmount] = useState("0.0015");
  const [autoCount, setAutoCount] = useState(99);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [lastMultipliers, setLastMultipliers] = useState<string[]>([]);
  const [inGameBallsCount, setInGameBallsCount] = useState(0);

  // Refs for Matter.js
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const renderRef = useRef<Matter.Render>();
  const runnerRef = useRef<Matter.Runner>();
  const pinsRef = useRef<Matter.Body[]>([]);
  const wallsRef = useRef<Matter.Body[]>([]);
  const multiplierZonesRef = useRef<Matter.Body[]>([]);

  // Menu items
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
    { label: "Log Out", onClick: () => {} },
  ];

  // Initialize Matter.js physics engine
  useEffect(() => {
    if (!sceneRef.current) return;

    // Create engine
    const engine = Engine.create();
    engine.gravity.y = config.engine.engineGravity;
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: config.world.width,
        height: config.world.height,
        wireframes: false,
        background: "transparent", // Transparent to show gradient
        showAngleIndicator: false,
      },
    });
    renderRef.current = render;

    // Create runner
    const runner = Runner.create();
    runnerRef.current = runner;

    // Create walls
    const walls = [
      // Left wall
      Bodies.rectangle(0, config.world.height / 2, 10, config.world.height, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      // Right wall
      Bodies.rectangle(
        config.world.width,
        config.world.height / 2,
        10,
        config.world.height,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      ),
      // Bottom wall (floor)
      Bodies.rectangle(
        config.world.width / 2,
        config.world.height,
        config.world.width,
        10,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      ),
    ];
    wallsRef.current = walls;

    // Create pins in a triangular pattern
    const pins: Body[] = [];
    const lines = 12; // Number of rows of pins

    for (let l = 0; l < lines; l++) {
      const linePins = config.pins.startPins + l;
      const lineWidth = linePins * config.pins.pinGap;

      for (let i = 0; i < linePins; i++) {
        const pinX =
          config.world.width / 2 -
          lineWidth / 2 +
          i * config.pins.pinGap +
          config.pins.pinGap / 2;

        const pinY =
          config.world.width / lines +
          l * config.pins.pinGap +
          config.pins.pinGap;

        const pin = Bodies.circle(pinX, pinY, config.pins.pinSize, {
          label: `pin-${l}-${i}`,
          render: {
            fillStyle: "rgba(255, 255, 255, 0.7)", // White with opacity like HomePage
          },
          isStatic: true,
        });
        pins.push(pin);
      }
    }
    pinsRef.current = pins;

    // Create multiplier zones at the bottom
    const multiplierZones: Body[] = [];
    const zoneWidth = config.world.width / multipliers.length;
    const zoneHeight = 40;
    const zoneY = config.world.height - zoneHeight / 2 - 5;

    multipliers.forEach((multiplier, index) => {
      const zoneX = zoneWidth * index + zoneWidth / 2;
      const zone = Bodies.rectangle(zoneX, zoneY, zoneWidth, zoneHeight, {
        label: `multiplier-${multiplier}`,
        isStatic: true,
        render: {
          fillStyle: config.colors.multiplierZone, // Use the pink color from config
          lineWidth: 1,
          strokeStyle: "#FFFFFF33",
        },
        chamfer: { radius: 4 },
      });
      multiplierZones.push(zone);
    });
    multiplierZonesRef.current = multiplierZones;

    // Add all bodies to the world
    World.add(engine.world, [...pins, ...walls, ...multiplierZones]);

    // Start the engine and renderer
    Render.run(render);
    Runner.run(runner, engine);

    // Add text labels for multipliers after render is created
    const canvas = render.canvas;
    const context = canvas.getContext("2d");

    if (context) {
      Events.on(render, "afterRender", () => {
        multipliers.forEach((multiplier, index) => {
          const zoneX = zoneWidth * index + zoneWidth / 2;

          // Adjust font size based on multiplier value length
          const fontSize = multiplier.length > 3 ? 12 : 14;
          context.font = `bold ${fontSize}px Arial`;

          context.textAlign = "center";
          context.textBaseline = "middle";

          // Create a slight glow effect for better visibility
          context.shadowColor = "rgba(0, 0, 0, 0.5)";
          context.shadowBlur = 3;

          // Use white text for better contrast against the pink background
          context.fillStyle = "#FFFFFF";

          // Position text in the center of each multiplier zone
          context.fillText(multiplier, zoneX, zoneY);

          // Reset shadow for other rendering
          context.shadowBlur = 0;
        });
      });
    }

    // Handle collisions
    Events.on(engine, "collisionActive", handleCollision);

    // Cleanup on unmount
    return () => {
      Events.off(engine, "collisionActive", handleCollision);
      World.clear(engine.world, true);
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
        render.canvas.remove();
      }
      render.textures = {};
    };
  }, []);

  // Handle collision with multiplier zones
  const handleCollision = useCallback((event: IEventCollision<Engine>) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];

      // Check if collision is between ball and multiplier zone
      if (
        (pair.bodyA.label.includes("ball-") &&
          pair.bodyB.label.includes("multiplier-")) ||
        (pair.bodyB.label.includes("ball-") &&
          pair.bodyA.label.includes("multiplier-"))
      ) {
        const ball = pair.bodyA.label.includes("ball-")
          ? pair.bodyA
          : pair.bodyB;
        const multiplier = pair.bodyA.label.includes("multiplier-")
          ? pair.bodyA
          : pair.bodyB;

        // Extract ball value and multiplier value
        const ballValue = parseFloat(ball.label.split("-")[1]);
        const multiplierValue = multiplier.label.split("-")[1];

        // Remove ball from world
        if (engineRef.current) {
          // Set collision filter to prevent further collisions
          ball.collisionFilter.group = 2;

          // Remove ball after a short delay to allow for visual feedback
          setTimeout(() => {
            if (engineRef.current) {
              World.remove(engineRef.current.world, ball);
              setInGameBallsCount((prev) => Math.max(0, prev - 1));
            }
          }, 100);

          // Play sound effect (if available)
          // const multiplierSound = new Audio(getMultiplierSound(multiplierValue));
          // multiplierSound.volume = 0.2;
          // multiplierSound.play();

          // Update results
          setResult(multiplierValue);
          setLastMultipliers((prev) => [multiplierValue, ...prev.slice(0, 9)]);

          // Calculate winnings (if bet was placed)
          if (ballValue > 0) {
            const winAmount = ballValue * parseFloat(multiplierValue);
            // Update balance or show winning notification
            console.log(`Won ${winAmount} from bet of ${ballValue}`);
          }
        }
      }
    }
  }, []);

  // Drop a ball with the current bet amount
  const dropBall = useCallback(() => {
    if (!engineRef.current || inGameBallsCount > 15) return;

    setIsSimulating(true);
    setInGameBallsCount((prev) => prev + 1);

    // Play ball drop sound
    // const ballSound = new Audio(ballAudio);
    // ballSound.volume = 0.2;
    // ballSound.play();

    // Calculate random starting position near the top center
    const worldWidth = config.world.width;
    const minBallX = worldWidth / 2 - 20;
    const maxBallX = worldWidth / 2 + 20;
    const ballX = minBallX + Math.random() * (maxBallX - minBallX);

    // Create ball with physics properties
    const ball = Bodies.circle(ballX, 20, config.ball.ballSize, {
      restitution: 0.8 + Math.random() * 0.4, // Bounce factor
      friction: 0.6 + Math.random() * 0.2, // Surface friction
      frictionAir: 0.02 + Math.random() * 0.04, // Air resistance
      label: `ball-${parseFloat(betAmount)}`, // Store bet amount in label
      render: {
        fillStyle: config.colors.ball,
      },
    });

    // Add ball to world
    if (engineRef.current) {
      Composite.add(engineRef.current.world, ball);
    }
  }, [betAmount, inGameBallsCount]);

  // Handle bet placement
  const handlePlaceBet = useCallback(() => {
    if (activeMode === "manual") {
      dropBall();
    } else {
      // Auto mode
      if (isSimulating) {
        // Stop auto mode
        setIsSimulating(false);
      } else {
        // Start auto mode
        setIsSimulating(true);
        let count = 0;

        const autoDrop = () => {
          if (count < autoCount && isSimulating) {
            dropBall();
            count++;
            setTimeout(autoDrop, 1000); // Drop a ball every second
          } else {
            setIsSimulating(false);
          }
        };

        autoDrop();
      }
    }
  }, [activeMode, autoCount, dropBall, isSimulating]);

  // Bet amount handlers
  const handleIncreaseBet = () => {
    const currentBet = parseFloat(betAmount);
    setBetAmount((currentBet + 0.0005).toFixed(4));
  };

  const handleDecreaseBet = () => {
    const currentBet = parseFloat(betAmount);
    if (currentBet > 0.0005) {
      setBetAmount((currentBet - 0.0005).toFixed(4));
    }
  };

  const handleHalfBet = () => {
    const currentBet = parseFloat(betAmount);
    setBetAmount((currentBet / 2).toFixed(4));
  };

  const handleDoubleBet = () => {
    const currentBet = parseFloat(betAmount);
    setBetAmount((currentBet * 2).toFixed(4));
  };

  const handleMaxBet = () => {
    setBetAmount("0.01"); // Example max bet
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 to-purple-900 flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Plinko!</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-1 text-white bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>14</span>
          </button>
          <button
            onClick={() => setIsMusicPlayerOpen(true)}
            className="text-white bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <Music className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        {/* Left Side Panel */}
        <div className="w-full lg:w-[300px] space-y-4">
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

          {/* Bet Controls */}
          <div className="bg-black/30 p-5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-white font-medium mb-3">Bet Amount</h3>
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={handleDecreaseBet}
                className="bg-white/10 hover:bg-white/20 p-1 rounded-md transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="bg-black/30 text-white text-center py-1 px-2 rounded-md w-full"
              />
              <button
                onClick={handleIncreaseBet}
                className="bg-white/10 hover:bg-white/20 p-1 rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={handleHalfBet}
                className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-md transition-colors text-sm"
              >
                1/2
              </button>
              <button
                onClick={handleDoubleBet}
                className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-md transition-colors text-sm"
              >
                2x
              </button>
              <button
                onClick={handleMaxBet}
                className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-md transition-colors text-sm"
              >
                Max
              </button>
            </div>

            {activeMode === "auto" && (
              <div className="mb-4">
                <span className="text-white/70 block mb-2">Number of Bets</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAutoCount(Math.max(1, autoCount - 1))}
                    className="bg-white/10 hover:bg-white/20 p-1 rounded-md transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium">{autoCount}</span>
                  <button
                    onClick={() => setAutoCount(autoCount + 1)}
                    className="bg-white/10 hover:bg-white/20 p-1 rounded-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <Button
              onClick={handlePlaceBet}
              className="w-full bg-pink-400/70 backdrop-blur-sm text-white py-3 rounded-xl border border-pink-400/30 shadow-lg hover:bg-pink-400/90 transition-colors font-medium"
              disabled={isSimulating && activeMode === "auto"}
            >
              {activeMode === "manual"
                ? "Place Bet"
                : isSimulating
                  ? "Running..."
                  : "Start Auto"}
            </Button>
          </div>

          {/* Recent Results */}
          <div className="bg-black/30 p-5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-white font-medium mb-3">Recent Results</h3>
            <div className="flex flex-wrap gap-2">
              {lastMultipliers.map((multiplier, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                    parseFloat(multiplier) >= 2
                      ? "bg-pink-400/20 text-pink-400"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {multiplier}
                </div>
              ))}
              {lastMultipliers.length === 0 && (
                <div className="text-white/50 text-sm">No results yet</div>
              )}
            </div>
          </div>
        </div>

        {/* Center - Game Board */}
        <div className="flex-1 flex flex-col items-center">
          <div
            ref={sceneRef}
            className="w-full max-w-[600px] h-[700px] bg-pink-500/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg"
          >
            {/* Matter.js will render here */}
          </div>

          {result && (
            <div className="mt-4 text-center">
              <span className="text-lg">Result: </span>
              <span
                className={`text-xl font-bold ${
                  parseFloat(result) >= 2 ? "text-pink-400" : "text-white"
                }`}
              >
                {result}
              </span>
            </div>
          )}
        </div>

        {/* Right Side Panel */}
        <div className="w-full lg:w-[300px] space-y-4">
          {/* Recent Bets */}
          <div className="bg-black/30 p-5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-white font-medium mb-3">Recent Bets</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/80">
                <span>Player123</span>
                <span className="text-pink-400">+0.0324</span>
              </div>
              <div className="flex justify-between text-sm text-white/80">
                <span>User456</span>
                <span className="text-white/60">-0.0156</span>
              </div>
              <div className="flex justify-between text-sm text-white/80">
                <span>Crypto789</span>
                <span className="text-pink-400">+0.0089</span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-black/30 p-5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-white font-medium mb-3">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-white/80">
                <div className="text-xs">Total Bets</div>
                <div className="text-lg font-medium">1,234</div>
              </div>
              <div className="text-white/80">
                <div className="text-xs">Win Rate</div>
                <div className="text-lg font-medium">64.3%</div>
              </div>
              <div className="text-white/80">
                <div className="text-xs">Highest Win</div>
                <div className="text-lg font-medium text-pink-400">2.5678</div>
              </div>
              <div className="text-white/80">
                <div className="text-xs">Total Profit</div>
                <div className="text-lg font-medium text-pink-400">+12.345</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs and Modals */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <MusicPlayer
        isOpen={isMusicPlayerOpen}
        onOpenChange={setIsMusicPlayerOpen}
      />

      {/* Menu Dialog */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-[280px] p-0 bg-black/60 border-white/10 backdrop-blur-xl">
          <div className="flex flex-col space-y-0">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsMenuOpen(false);
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

export default FundedHomePage;
