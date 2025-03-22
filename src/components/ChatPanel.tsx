import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ChatTab = "chat" | "bets";

interface ChatMessage {
  user: string;
  message: string;
  timestamp: string;
}

interface BetRecord {
  user: string;
  amount: string;
  result: string;
  multiplier: string;
  timestamp: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<ChatTab>("chat");

  // Sample data - you can replace with real data later
  const chatMessages: ChatMessage[] = [
    {
      user: "Alice",
      message: "Oh yo this game is so nice",
      timestamp: "2m ago",
    },
    {
      user: "HoofPrints",
      message: "What are you all up to?",
      timestamp: "3m ago",
    },
    { 
      user: "You", 
      message: "Im just chilling", 
      timestamp: "4m ago" 
    },
  ];

  const recentBets: BetRecord[] = [
    {
      user: "UnacceptableDad",
      amount: "0.1",
      result: "earned",
      multiplier: "10x",
      timestamp: "6m ago",
    },
    {
      user: "cptchromie",
      amount: "0.1",
      result: "got rugged",
      multiplier: "",
      timestamp: "7m ago",
    },
    {
      user: "SimplisticTennis",
      amount: "0.1",
      result: "earned",
      multiplier: "10x",
      timestamp: "7m ago",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1520] p-0 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("chat")}
              className={cn(
                "text-sm font-medium transition-colors",
                activeTab === "chat"
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab("bets")}
              className={cn(
                "text-sm font-medium transition-colors",
                activeTab === "bets"
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              Recent Bets
            </button>
          </div>
          <div className="text-white/50 text-sm">237 Online</div>
        </div>

        {/* Content */}
        <div className="h-[500px] overflow-y-auto">
          {activeTab === "chat" ? (
            <div className="p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className="text-sm">
                  <span className="text-pink-400 font-medium">{msg.user}</span>
                  <span className="text-white/80 ml-2">{msg.message}</span>
                  <span className="text-white/30 text-xs ml-2">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {recentBets.map((bet, i) => (
                <div
                  key={i}
                  className="text-sm flex items-center justify-between"
                >
                  <div>
                    <span className="text-pink-400">{bet.user}</span>
                    <span className="text-white/50"> bet </span>
                    <span className="text-white">◆{bet.amount}</span>
                    <span className="text-white/50"> and </span>
                    <span
                      className={cn(
                        bet.result === "earned"
                          ? "text-green-400"
                          : "text-red-400"
                      )}
                    >
                      {bet.result} {bet.multiplier}
                    </span>
                  </div>
                  <span className="text-white/30 text-xs">{bet.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input area for chat */}
        {activeTab === "chat" && (
          <div className="p-4 border-t border-white/10">
            <input
              type="text"
              placeholder="Your message..."
              className="w-full bg-white/5 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-pink-400"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatPanel; 