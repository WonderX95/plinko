import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ArrowUpDown } from "lucide-react";

const CryptoDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  // Get crypto details from location state or use default
  const cryptoDetails = location.state?.crypto || {
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    balance: 3.038,
  };

  const handleDepositClick = () => {
    navigate("/generate-address", {
      state: {
        amount: depositAmount,
        crypto: cryptoDetails
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1520] text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{cryptoDetails.name}</h1>
          <div className="flex items-center text-lg">
            <span className="text-purple-300 mr-1">{cryptoDetails.icon}</span>
            <span>{cryptoDetails.balance}</span>
          </div>
        </div>

        {/* Back Button */}
        <Button
          onClick={() => navigate("/wallet")}
          variant="outline"
          className="w-full bg-[#2a2230] hover:bg-[#352a3d] text-white border-none py-3 rounded-xl mb-6 flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </Button>

        {/* Deposit Section */}
        <h2 className="text-lg font-medium mb-3">Deposit</h2>
        <div className="bg-[#2a2230] p-4 rounded-xl mb-4">
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0 ETH"
                className="w-full bg-[#3a2a40] text-white border border-[#4a3a50] rounded-lg p-2 focus:outline-none focus:border-pink-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center bg-[#4a3a50] px-2 py-1 rounded-md">
                <span className="text-sm mr-1">Ξ ETH</span>
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1 ml-1">
              Deposit amount
            </div>
          </div>

          <Button
            onClick={handleDepositClick}
            className="w-full bg-[#3a2a40] hover:bg-[#4a3a50] text-gray-300 py-3 rounded-xl border border-[#4a3a50]"
          >
            Fill the amount to Deposit
          </Button>
        </div>

        {/* Cashout Section */}
        <h2 className="text-lg font-medium mb-3">Cashout</h2>
        <div className="bg-[#2a2230] p-4 rounded-xl mb-4">
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0 ETH"
                className="w-full bg-[#3a2a40] text-white border border-[#4a3a50] rounded-lg p-2 focus:outline-none focus:border-pink-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="bg-[#4a3a50] text-white text-xs px-2 py-1 rounded-md">
                  MAX
                </button>
                <div className="flex items-center bg-[#4a3a50] px-2 py-1 rounded-md">
                  <span className="text-sm mr-1">Ξ ETH</span>
                  <ArrowUpDown className="w-4 h-4" />
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
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                placeholder="0x"
                className="w-full bg-[#3a2a40] text-white border border-[#4a3a50] rounded-lg p-2 focus:outline-none focus:border-pink-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4a3a50] text-white text-xs px-2 py-1 rounded-md">
                PASTE
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-1 ml-1">
              Your Ethereum Address
            </div>
          </div>

          <Button className="w-full bg-[#3a2a40] hover:bg-[#4a3a50] text-gray-300 py-3 rounded-xl border border-[#4a3a50]">
            Fill the fields to Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailPage;
