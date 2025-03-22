import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const RegionBlockScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-plinko-primary to-plinko-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Plinko!
        </h1>

        {/* Game board representation - simplified for region block screen */}
        <div className="relative bg-plinko-surface backdrop-blur-md rounded-3xl p-8 mb-8 mx-auto max-w-xl">
          <div className="grid gap-6 md:gap-8">
            {Array.from({ length: 8 }, (_, rowIndex) => (
              <div key={rowIndex} className="flex justify-around items-center">
                {Array.from({ length: rowIndex + 1 }, (_, i) => (
                  <div
                    key={i}
                    className="w-2 md:w-3 h-2 md:h-3 bg-white rounded-full opacity-70"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Pink button - decorative */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-plinko-accent rounded-xl mx-auto mb-8"></div>

        {/* Region block message */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Plinko is not available in your region
        </h2>

        <p className="text-gray-300 mb-8 max-w-lg mx-auto">
          Due to licensing restrictions, we cannot accept players from Spain. If
          you're using a VPN, please disable it and try again.
        </p>

        {/* Back button - optional */}
        <Button
          onClick={() => window.history.back()}
          className="bg-white bg-opacity-10 text-white hover:bg-white hover:bg-opacity-20"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBonus, setShowBonus] = useState(true);
  const [showRegionBlock, setShowRegionBlock] = useState(false);
  const [showHomeScreenPrompt, setShowHomeScreenPrompt] = useState(false);
  const [email, setEmail] = useState("");
  const [isRegionBlocked, setIsRegionBlocked] = useState(false);

  // Check region on component mount
  useEffect(() => {
    // This would be replaced with actual geo-check logic
    const checkRegion = () => {
      // For demo purposes, you can toggle this to true to see the region block screen
      const blocked = false;
      setIsRegionBlocked(blocked);
    };

    checkRegion();
  }, []);

  // Show home screen prompt after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHomeScreenPrompt(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    // Check if region is blocked
    if (isRegionBlocked) {
      setShowRegionBlock(true);
      return;
    }
    navigate("/demo-mode");
  };

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
    setShowBonus(false);
    navigate("/login");
  };

  // If region is blocked, show the region block screen
  if (isRegionBlocked) {
    return <RegionBlockScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-plinko-primary to-plinko-background p-4 md:p-8">
      <div className="max-w-md mx-auto pt-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Welcome to Plinko!
        </h1>
        <p className="text-gray-300 mb-8">Experience the thrill of the game</p>

        <div className="space-y-4">
          <Button
            onClick={handleGetStarted}
            className="w-full bg-plinko-accent text-white"
          >
            Try Demo Mode
          </Button>
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full text-white bg-white bg-opacity-10"
          >
            Login to Play
          </Button>
        </div>
      </div>

      {/* Bonus Dialog */}
      <Dialog open={showBonus} onOpenChange={setShowBonus}>
        <DialogContent className="bg-plinko-background border-plinko-accent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              You won 150% deposit bonus
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Register with your email to use it
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBonusSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@provider.com"
              className="w-full bg-white bg-opacity-5 text-white p-4 rounded-xl"
            />
            <Button
              type="submit"
              className="w-full bg-plinko-accent text-white"
            >
              Continue
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Region Block Dialog */}
      <Dialog open={showRegionBlock} onOpenChange={setShowRegionBlock}>
        <DialogContent className="bg-plinko-background">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Not Available in Your Region
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Due to licensing restrictions, we cannot accept players from
              Spain. If you're using a VPN, please disable it and try again.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowRegionBlock(false)}
            className="w-full bg-plinko-accent text-white"
          >
            Okay, I Understand
          </Button>
        </DialogContent>
      </Dialog>

      {/* Add to Home Screen Dialog */}
      <Dialog
        open={showHomeScreenPrompt}
        onOpenChange={setShowHomeScreenPrompt}
      >
        <DialogContent className="bg-plinko-background">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Add to Home Screen
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Add this app to your home screen for the best experience and
              instant access to all features.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowHomeScreenPrompt(false)}
            className="w-full bg-plinko-accent text-white"
          >
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
