import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ArrowUpDown } from "lucide-react";

const GenerateAddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get crypto details and amount from location state or use default
  const { amount = "0.5", crypto } = location.state || {
    crypto: {
      name: "Ethereum",
      symbol: "ETH",
      icon: "Ξ",
      balance: 3.038,
    },
  };

  const handleGenerateAddress = () => {
    navigate("/deposit-address", {
      state: { amount, crypto },
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1520] text-white p-2 sm:p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">{crypto.name}</h1>
          <div className="flex items-center text-base sm:text-lg">
            <span className="text-purple-300 mr-1">{crypto.icon}</span>
            <span>{crypto.balance}</span>
          </div>
        </div>

        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="w-full bg-[#2a2230] hover:bg-[#352a3d] text-white border-none py-2 sm:py-3 rounded-xl mb-4 sm:mb-6 flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Back</span>
        </Button>

        {/* Deposit Section */}
        <h2 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">
          Deposit
        </h2>
        <div className="bg-[#2a2230] p-3 sm:p-4 rounded-xl mb-4">
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={`${amount} ETH`}
                readOnly
                className="w-full bg-[#3a2a40] text-white border border-[#4a3a50] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center bg-[#4a3a50] px-1.5 sm:px-2 py-1 rounded-md">
                <span className="text-xs sm:text-sm mr-1">Ξ ETH</span>
                <ArrowUpDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1 ml-1">
              Deposit amount
            </div>
          </div>

          <Button
            onClick={handleGenerateAddress}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-xl"
          >
            Generate Address
          </Button>
        </div>

        {/* Cashout Section */}
        <h2 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">
          Cashout
        </h2>
        <div className="bg-[#2a2230] p-3 sm:p-4 rounded-xl mb-4">
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="0 ETH"
                className="w-full bg-[#3a2a40] text-white border border-[#4a3a50] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2">
                <button className="bg-[#4a3a50] text-white text-xs px-1.5 sm:px-2 py-1 rounded-md">
                  MAX
                </button>
                <div className="flex items-center bg-[#4a3a50] px-1.5 sm:px-2 py-1 rounded-md">
                  <span className="text-xs sm:text-sm mr-1">Ξ ETH</span>
                  <ArrowUpDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1 ml-1">
              Amount to withdraw
            </div>
          </div>

          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="0x"
                className="w-full bg-[#3a2a40] text-white border border-[#4a3a50] rounded-lg p-2 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4a3a50] text-white text-xs px-2 py-1 rounded-md">
                PASTE
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-1 ml-1">
              Your Ethereum Address
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-xl">
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateAddressPage;
