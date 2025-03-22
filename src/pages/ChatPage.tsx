"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowLeft, Send } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

type ChatTab = "chat" | "bets"

interface ChatMessage {
  user: string
  message: string
  timestamp: string
  avatar?: string
  isCurrentUser?: boolean
}

interface BetRecord {
  user: string
  amount: string
  result: "earned" | "got rugged"
  multiplier: string
  timestamp: string
  avatar?: string
}

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<ChatTab>("chat")
  const [inputMessage, setInputMessage] = useState("")

  // Sample data - you can replace with real data later
  const chatMessages: ChatMessage[] = [
    {
      user: "Alice",
      message: "Oh yo this game is so nice",
      timestamp: "2m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "HoofPrints",
      message: "What are you all up to?",
      timestamp: "3m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "CryptoKing",
      message: "Just won 5x on my last bet!",
      timestamp: "4m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "You",
      message: "I'm just chilling",
      timestamp: "5m ago",
      isCurrentUser: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "MoonWalker",
      message: "Anyone got tips for beginners?",
      timestamp: "6m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "DiamondHands",
      message: "HODL and you'll be fine",
      timestamp: "7m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "SatoshiFan",
      message: "This platform is so much better than the others I've tried",
      timestamp: "8m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "CoinCollector",
      message: "Just deposited some more. Let's go!",
      timestamp: "9m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "BlockchainBabe",
      message: "Has anyone tried the new game mode?",
      timestamp: "10m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "TokenTitan",
      message: "The rewards this week are insane",
      timestamp: "11m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "CryptoNewbie",
      message: "How do I withdraw my winnings?",
      timestamp: "12m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "WalletWarrior",
      message: "Check the FAQ section, it explains everything",
      timestamp: "13m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "HashRateHero",
      message: "Just hit a 20x multiplier! Screenshot coming soon",
      timestamp: "14m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "DeFiDude",
      message: "Anyone from Europe here?",
      timestamp: "15m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "NFTNinja",
      message: "I'm from Germany 🇩🇪",
      timestamp: "16m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "MetaMasker",
      message: "UK here 🇬🇧",
      timestamp: "17m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "AltcoinAngel",
      message: "The new UI is so clean",
      timestamp: "18m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "MinerMike",
      message: "Anyone having connection issues or just me?",
      timestamp: "19m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "StakingStella",
      message: "Working fine for me",
      timestamp: "20m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "GasGuru",
      message: "Try refreshing your browser",
      timestamp: "21m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "LedgerLegend",
      message: "What's everyone's strategy for Plinko?",
      timestamp: "22m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "PrivateKeyPro",
      message: "I always go for the middle path",
      timestamp: "23m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "TradingTom",
      message: "Random is the way to go",
      timestamp: "24m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "ChainChampion",
      message: "Just hit a 15x! So hyped right now",
      timestamp: "25m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const recentBets: BetRecord[] = [
    {
      user: "UnacceptableDad",
      amount: "0.1",
      result: "earned",
      multiplier: "10x",
      timestamp: "6m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "cptchromie",
      amount: "0.1",
      result: "got rugged",
      multiplier: "",
      timestamp: "7m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "SimplisticTennis",
      amount: "0.1",
      result: "earned",
      multiplier: "10x",
      timestamp: "7m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "CryptoKing",
      amount: "0.5",
      result: "earned",
      multiplier: "5x",
      timestamp: "8m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "BlockchainBabe",
      amount: "0.2",
      result: "got rugged",
      multiplier: "",
      timestamp: "9m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "HashRateHero",
      amount: "1.0",
      result: "earned",
      multiplier: "20x",
      timestamp: "10m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "TokenTitan",
      amount: "0.3",
      result: "earned",
      multiplier: "3x",
      timestamp: "11m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "MoonWalker",
      amount: "0.05",
      result: "got rugged",
      multiplier: "",
      timestamp: "12m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "ChainChampion",
      amount: "0.75",
      result: "earned",
      multiplier: "15x",
      timestamp: "13m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "DiamondHands",
      amount: "2.0",
      result: "earned",
      multiplier: "2x",
      timestamp: "14m ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Here you would normally add the message to your chat state
      // For now, we'll just clear the input
      setInputMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleBackToPlinko = () => {
    // Since we're using Next.js, we'll use the router instead of navigate
    window.location.href = "/funded-home"
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
        <CardHeader className="p-0">
          {/* Tabs and Online Count */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex gap-4">
              <Button
                onClick={() => setActiveTab("chat")}
                variant="ghost"
                className={cn(
                  "px-2 py-1 h-auto text-sm font-medium transition-colors",
                  activeTab === "chat"
                    ? "text-white bg-gray-700"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50",
                )}
              >
                Chat
              </Button>
              <Button
                onClick={() => setActiveTab("bets")}
                variant="ghost"
                className={cn(
                  "px-2 py-1 h-auto text-sm font-medium transition-colors",
                  activeTab === "bets"
                    ? "text-white bg-gray-700"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50",
                )}
              >
                Recent Bets
              </Button>
            </div>
            <Badge variant="outline" className="text-gray-300 bg-gray-700/50">
              237 Online
            </Badge>
          </div>

          {/* Back to Plinko Button */}
          <Button
            onClick={handleBackToPlinko}
            className="w-full rounded-none bg-purple-700 hover:bg-purple-600 text-white py-2 h-10 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Back to Plinko</span>
          </Button>
        </CardHeader>

        {/* Chat/Bets Content */}
        <CardContent className="p-0">
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <AnimatePresence>
              {activeTab === "chat"
                ? // Chat Messages - Simple List Format
                  chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <Avatar className="h-8 w-8 border border-gray-700 flex-shrink-0">
                        <img src={msg.avatar || "/placeholder.svg"} alt={msg.user} />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-medium text-sm",
                              msg.isCurrentUser ? "text-purple-400" : "text-pink-400",
                            )}
                          >
                            {msg.user}
                          </span>
                          <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-200">{msg.message}</p>
                      </div>
                    </motion.div>
                  ))
                : // Recent Bets - Keep as is
                  recentBets.map((bet, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <Avatar className="h-8 w-8 border border-gray-700">
                        <img src={bet.avatar || "/placeholder.svg"} alt={bet.user} />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-pink-400 font-medium text-sm">{bet.user}</span>
                          <span className="text-gray-400 text-sm">bet</span>
                          <span className="text-white font-medium text-sm">◆{bet.amount}</span>
                          <span className="text-gray-400 text-sm">and</span>
                          <span
                            className={cn(
                              "font-medium text-sm",
                              bet.result === "earned" ? "text-green-400" : "text-red-400",
                            )}
                          >
                            {bet.result} {bet.multiplier}
                          </span>
                        </div>
                        <span className="text-gray-500 text-xs">{bet.timestamp}</span>
                      </div>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </div>
        </CardContent>

        {/* Input area for chat */}
        {activeTab === "chat" && (
          <CardFooter className="p-3 border-t border-gray-700 bg-gray-800">
            <div className="flex w-full items-center gap-2">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Your message..."
                className="flex-1 bg-gray-700 border-gray-600 text-white focus-visible:ring-purple-500"
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-purple-600 hover:bg-purple-500 text-white">
                <Send size={18} />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

