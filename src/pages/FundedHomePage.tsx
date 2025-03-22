"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, Music, MoreVertical, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ChatPanel from "@/components/ChatPanel";
import { MusicPlayer } from "@/components/MusicPlayer";
import type Matter from "matter-js";
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  type IEventCollision,
  Render,
  Runner,
  World,
} from "matter-js";

type ModeType = "manual" | "auto";

// Game configuration with updated dimensions for smaller game
const config = {
  pins: {
    startPins: 3,
    pinSize: 4, // Reduced pin size
    pinGap: 30, // Reduced gap between pins
  },
  ball: {
    ballSize: 8, // Reduced ball size
  },
  engine: {
    engineGravity: 1,
  },
  world: {
    width: 400, // Reduced width
    height: 500, // Reduced height
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
  "10x",
  "5x",
  "2x",
  "1.5",
  "0.9",
  "0.7",
  "0.9",
  "1.5",
  "2x",
  "5x",
  "10x",
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
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Get the container dimensions
    const containerWidth = sceneRef.current.clientWidth;
    const containerHeight = sceneRef.current.clientHeight;

    // Create renderer with container dimensions
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: "transparent", // Transparent to show gradient
        showAngleIndicator: false,
      },
    });
    renderRef.current = render;

    // Create runner
    const runner = Runner.create();
    runnerRef.current = runner;

    // Calculate scale factor based on container size vs config size
    const scaleX = containerWidth / config.world.width;
    const scaleY = containerHeight / config.world.height;
    const scale = Math.min(scaleX, scaleY);

    // Create walls
    const walls = [
      // Left wall
      Bodies.rectangle(0, containerHeight / 2, 10, containerHeight, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      // Right wall
      Bodies.rectangle(
        containerWidth,
        containerHeight / 2,
        10,
        containerHeight,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      ),
      // Bottom wall (floor)
      Bodies.rectangle(
        containerWidth / 2,
        containerHeight,
        containerWidth,
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
    const scaledPinSize = config.pins.pinSize * scale;
    const scaledPinGap = config.pins.pinGap * scale;

    for (let l = 0; l < lines; l++) {
      const linePins = config.pins.startPins + l;
      const lineWidth = linePins * scaledPinGap;

      for (let i = 0; i < linePins; i++) {
        const pinX =
          containerWidth / 2 -
          lineWidth / 2 +
          i * scaledPinGap +
          scaledPinGap / 2;

        const pinY =
          containerWidth / (lines * 1.5) + l * scaledPinGap + scaledPinGap;

        const pin = Bodies.circle(pinX, pinY, scaledPinSize, {
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
    const zoneWidth = containerWidth / multipliers.length;
    const zoneHeight = 30 * scale;
    const zoneY = containerHeight - zoneHeight / 2 - 5;

    multipliers.forEach((multiplier, index) => {
      const zoneX = zoneWidth * index + zoneWidth / 2;

      // Determine color based on multiplier value
      let fillColor;
      if (multiplier === "0.7" || multiplier === "0.9") {
        fillColor = "#8B3F63"; // Darker pink for middle values
      } else {
        fillColor = "#F8B4E3"; // Lighter pink for higher values
      }

      const zone = Bodies.rectangle(zoneX, zoneY, zoneWidth - 1, zoneHeight, {
        label: `multiplier-${multiplier}`,
        isStatic: true,
        render: {
          fillStyle: fillColor,
          lineWidth: 1,
          strokeStyle: "#FFFFFF33",
        },
        chamfer: { radius: 12 }, // Increased radius for more rounded corners
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

          // Adjust font size based on multiplier value length and container size
          const fontSize = multiplier.length > 3 ? 10 : 14;
          context.font = `bold ${fontSize}px Arial`;

          context.textAlign = "center";
          context.textBaseline = "middle";

          // Determine text color based on multiplier value
          if (multiplier === "0.7" || multiplier === "0.9") {
            context.fillStyle = "#FFFFFF"; // White text for darker backgrounds
          } else {
            context.fillStyle = "#C23D82"; // Darker pink text for lighter backgrounds
          }

          // Position text in the center of each multiplier zone
          context.fillText(multiplier, zoneX, zoneY);
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
 // ... existing code ...

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

      // Check if this ball has already been processed
      if (ball.collisionFilter.group === 2) continue;

      // Extract ball value and multiplier value
      const ballValue = Number.parseFloat(ball.label.split("-")[1]);
      const multiplierValue = multiplier.label.split("-")[1];

      // Remove ball from world
      if (engineRef.current) {
        // Set collision filter to prevent further collisions
        ball.collisionFilter.group = 2;
        
        // Immediately stop the ball's movement
        Body.setVelocity(ball, { x: 0, y: 0 });
        Body.setAngularVelocity(ball, 0);
        
        // Make the ball static so it doesn't move anymore
        Body.setStatic(ball, true);
        
        // Position the ball at the center of the multiplier zone
        const multiplierPos = multiplier.position;
        Body.setPosition(ball, { x: multiplierPos.x, y: multiplierPos.y - 10 });

        // Remove ball after a short delay to allow for visual feedback
        setTimeout(() => {
          if (engineRef.current) {
            World.remove(engineRef.current.world, ball);
            setInGameBallsCount((prev) => Math.max(0, prev - 1));
          }
        }, 500);

        // Play sound effect (if available)
        // const multiplierSound = new Audio(getMultiplierSound(multiplierValue));
        // multiplierSound.volume = 0.2;
        // multiplierSound.play();

        // Update results
        setResult(multiplierValue);
        setLastMultipliers((prev) => [multiplierValue, ...prev.slice(0, 9)]);

        // Calculate winnings (if bet was placed)
        if (ballValue > 0) {
          const winAmount = ballValue * Number.parseFloat(multiplierValue);
          // Update balance or show winning notification
          console.log(`Won ${winAmount} from bet of ${ballValue}`);
        }
      }
    }
  }
}, []);

// ... existing code ...

  // Drop a ball with the current bet amount
  const dropBall = useCallback(() => {
    if (!engineRef.current || !sceneRef.current || inGameBallsCount > 15)
      return;

    setIsSimulating(true);
    setInGameBallsCount((prev) => prev + 1);

    // Play ball drop sound
    // const ballSound = new Audio(ballAudio);
    // ballSound.volume = 0.2;
    // ballSound.play();

    // Get current container dimensions
    const containerWidth = sceneRef.current.clientWidth;

    // Calculate scale factor for ball size
    const scale = containerWidth / config.world.width;
    const scaledBallSize = config.ball.ballSize * scale;

    // Calculate random starting position near the top center
    const minBallX = containerWidth / 2 - 20;
    const maxBallX = containerWidth / 2 + 20;
    const ballX = minBallX + Math.random() * (maxBallX - minBallX);

    // Create ball with physics properties
    const ball = Bodies.circle(ballX, 20, scaledBallSize, {
      restitution: 0.8 + Math.random() * 0.4, // Bounce factor
      friction: 0.6 + Math.random() * 0.2, // Surface friction
      frictionAir: 0.02 + Math.random() * 0.04, // Air resistance
      label: `ball-${Number.parseFloat(betAmount)}`, // Store bet amount in label
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
    const currentBet = Number.parseFloat(betAmount);
    setBetAmount((currentBet + 0.0005).toFixed(4));
  };

  const handleDecreaseBet = () => {
    const currentBet = Number.parseFloat(betAmount);
    if (currentBet > 0.0005) {
      setBetAmount((currentBet - 0.0005).toFixed(4));
    }
  };

  const handleHalfBet = () => {
    const currentBet = Number.parseFloat(betAmount);
    setBetAmount((currentBet / 2).toFixed(4));
  };

  const handleDoubleBet = () => {
    const currentBet = Number.parseFloat(betAmount);
    setBetAmount((currentBet * 2).toFixed(4));
  };

  const handleMaxBet = () => {
    setBetAmount("0.01"); // Example max bet
  };

  // Add this useEffect for handling resize
  useEffect(() => {
    if (!renderRef.current || !sceneRef.current) return;

    const handleResize = () => {
      if (!renderRef.current || !sceneRef.current) return;

      // Get current container dimensions
      const containerWidth = sceneRef.current.clientWidth;
      const containerHeight = sceneRef.current.clientHeight;

      // Update render dimensions
      renderRef.current.options.width = containerWidth;
      renderRef.current.options.height = containerHeight;

      // Update canvas dimensions
      renderRef.current.canvas.width = containerWidth;
      renderRef.current.canvas.height = containerHeight;

      // Adjust world bounds if needed
      if (engineRef.current && wallsRef.current.length > 0) {
        // Update wall positions based on new dimensions
        Body.setPosition(wallsRef.current[0], { x: 0, y: containerHeight / 2 });
        Body.setPosition(wallsRef.current[1], {
          x: containerWidth,
          y: containerHeight / 2,
        });
        Body.setPosition(wallsRef.current[2], {
          x: containerWidth / 2,
          y: containerHeight,
        });
      }

      // Force a render update
      if (renderRef.current) {
        Render.setPixelRatio(renderRef.current, window.devicePixelRatio);
      }
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Initial resize
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[url('/plinko.webp')] bg-cover bg-center flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Plinko!</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-1 text-white bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-md hover:bg-white/30 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>14</span>
          </button>
          <button
            onClick={() => setIsMusicPlayerOpen(true)}
            className="text-white bg-white/20 p-1.5 rounded-full backdrop-blur-md hover:bg-white/30 transition-colors"
          >
            <Music className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white bg-white/20 p-1.5 rounded-full backdrop-blur-md hover:bg-white/30 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        {/* Left Side Panel - Increased width */}
        <div className="w-full lg:w-[350px] space-y-4">
          {/* Mode Selector */}
          <div className="bg-black/40 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-2 gap-0">
              <button
                className={`py-3 text-white font-medium transition-colors ${
                  activeMode === "manual"
                    ? "bg-pink-400 shadow-md"
                    : "bg-transparent hover:bg-white/10"
                }`}
                onClick={() => setActiveMode("manual")}
              >
                Manual
              </button>
              <div
                className={`py-3 flex items-center justify-center ${
                  activeMode === "auto"
                    ? "bg-pink-400 shadow-md"
                    : "bg-transparent hover:bg-white/10"
                }`}
              >
                {activeMode === "auto" ? (
                  <div className="flex items-center justify-between w-full px-4">
                    <button
                      onClick={() => setAutoCount(Math.max(1, autoCount - 1))}
                      className="text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-medium">
                      Auto ({autoCount})
                    </span>
                    <button
                      onClick={() => setAutoCount(autoCount + 1)}
                      className="text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-full text-center"
                    onClick={() => setActiveMode("auto")}
                  >
                    Auto
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Wallet and Risk */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/40 backdrop-blur-xl p-3 rounded-xl border border-white/10 flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-medium">Wallet</div>
                <div className="text-white/70 text-xs">Balance: 364.498</div>
              </div>
            </div>
            <div className="bg-black/40 backdrop-blur-xl p-3 rounded-xl border border-white/10 flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-medium">High</div>
                <div className="text-white/70 text-xs">Risk</div>
              </div>
            </div>
          </div>

          {/* Bet Controls */}
          <div className="bg-black/40 backdrop-blur-xl p-4 rounded-xl border border-white/10">
            {/* Bet Amount Bar */}
            <div className="flex items-center gap-2 mb-4 bg-black/30 p-2 rounded-lg">
              <div className="bg-white/20 p-1.5 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7" />
                </svg>
              </div>
              <div className="text-white text-sm flex-1">
                <div className="font-medium">{betAmount}</div>
                <div className="text-xs text-white/70">Bet Amount</div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={handleHalfBet}
                  className="bg-black/30 hover:bg-black/50 px-2 py-1 rounded-md text-white text-xs transition-colors"
                >
                  1/2
                </button>
                <button
                  onClick={handleDoubleBet}
                  className="bg-black/30 hover:bg-black/50 px-2 py-1 rounded-md text-white text-xs transition-colors"
                >
                  2x
                </button>
                <button
                  onClick={handleMaxBet}
                  className="bg-black/30 hover:bg-black/50 px-2 py-1 rounded-md text-white text-xs transition-colors"
                >
                  MAX
                </button>
              </div>
            </div>

            <button
              onClick={handlePlaceBet}
              className="w-full bg-pink-400 text-white py-3 rounded-xl font-medium"
            >
              {activeMode === "manual"
                ? "Place Bet"
                : isSimulating
                  ? "Running..."
                  : "Start Autobet"}
            </button>
          </div>

          {/* Recent Results */}
          <div className="bg-black/30 p-5 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-white font-medium mb-3">Recent Results</h3>
            <div className="flex flex-wrap gap-2">
              {lastMultipliers.map((multiplier, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                    Number.parseFloat(multiplier) >= 2
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
        <div className="flex-1 flex flex-col items-center justify-center">
          <div ref={containerRef} className="w-full max-w-md mx-auto">
            <div
              ref={sceneRef}
              className="w-full aspect-[4/5] bg-pink-500/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg"
            >
              {/* Matter.js will render here */}
            </div>
          </div>

          {result && (
            <div className="mt-4 text-center bg-black/40 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 shadow-lg">
              <span className="text-lg text-white/80">Result: </span>
              <span
                className={`text-2xl font-bold ${
                  Number.parseFloat(result) >= 2
                    ? "text-pink-400"
                    : "text-white"
                }`}
              >
                {result}
              </span>
            </div>
          )}
        </div>

        {/* Right Side Panel - Increased width to match left panel */}
        <div className="w-full lg:w-[350px] space-y-4">
          {/* Recent Bets */}
          <div className="bg-black/30 p-5 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all">
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
          <div className="bg-black/30 p-5 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all">
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
        <DialogContent className="sm:max-w-[280px] p-0 bg-black/60 border-white/10 backdrop-blur-2xl">
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
