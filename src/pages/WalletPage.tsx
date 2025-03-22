import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";

const WalletPage = () => {
  const navigate = useNavigate();
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>("ETH"); // Default Ethereum selected

  const cryptoOptions = [
    { name: "Solana", symbol: "SOL", icon: "◎", balance: 0 },
    { name: "Ethereum", symbol: "ETH", icon: "Ξ", balance: 0 },
    { name: "Bitcoin", symbol: "BTC", icon: "₿", balance: 0 },
    { name: "USDT", symbol: "USDT", icon: "₮", balance: 0 },
  ];

  const handleSelect = (crypto: (typeof cryptoOptions)[0]) => {
    setSelectedCrypto(crypto.symbol);

    // Navigate to crypto detail page if Ethereum is selected
    if (crypto.symbol === "ETH") {
      navigate("/crypto-detail", { state: { crypto } });
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1520] text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <h1 className="text-xl font-medium mb-3">My Wallet</h1>

        {/* Back Button */}
        <Button
          onClick={() => navigate("/home")}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white py-3 rounded-xl mb-5"
        >
          Back to Plinko
        </Button>

        {/* Balances Section */}
        <h2 className="text-xl font-medium mb-3">Balances</h2>

        <div className="space-y-2 mb-6">
          {cryptoOptions.map((crypto) => (
            <div
              key={crypto.symbol}
              className="flex items-center justify-between bg-[#2a2230] p-3 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{crypto.icon}</span>
                <span>{crypto.name}</span>
                <span className="text-gray-400">{crypto.balance}</span>
              </div>
              <Button
                onClick={() => handleSelect(crypto)}
                variant={
                  selectedCrypto === crypto.symbol ? "default" : "outline"
                }
                className={`rounded-full px-4 py-1 text-sm ${
                  selectedCrypto === crypto.symbol
                    ? "bg-pink-500 hover:bg-pink-600 border-none"
                    : "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {selectedCrypto === crypto.symbol ? "Selected" : "Select"}
              </Button>
            </div>
          ))}
        </div>

        {/* Bonus Section */}
        <div className="flex flex-col items-center">
          <div className="bg-pink-500 p-3 rounded-lg mb-3">
            <Gift className="w-5 h-5" />
          </div>
          <p className="text-center text-sm mb-1">
            150% deposit bonus automatically
          </p>
          <p className="text-center text-sm flex items-center">
            applied to all deposits{" "}
            <span className="ml-1 text-yellow-300">😊</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
