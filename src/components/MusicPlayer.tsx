"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export interface MusicPlayerProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  standalone?: boolean
}

export function MusicPlayer({ isOpen, onOpenChange, standalone = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleOpenChange = (open: boolean) => {
    if (standalone) {
      if (!open) window.history.back()
    } else {
      onOpenChange?.(open)
    }
  }

  const togglePlay = () => setIsPlaying(!isPlaying)

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-0 border border-white/10 overflow-hidden rounded-3xl bg-transparent backdrop-blur-md bg-white/5 shadow-2xl">
        <div className="p-6 text-white">
          {/* Title and artist */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold">Tru Tones – Dancing (f</h3>
            <p className="text-lg text-white/90 mt-1">Seth Pantalony</p>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center px-8 py-4">
            <button className="text-white hover:text-white/80 transition-colors">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 20L9 12L19 4V20Z" fill="currentColor" />
                <path d="M7 20L7 4H5L5 20H7Z" fill="currentColor" />
              </svg>
            </button>

            <button onClick={togglePlay} className="text-white hover:text-white/80 transition-colors">
              {isPlaying ? (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4H10V20H6V4Z" fill="currentColor" />
                  <path d="M14 4H18V20H14V4Z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L20 12L6 20V4Z" fill="currentColor" />
                </svg>
              )}
            </button>

            <button className="text-white hover:text-white/80 transition-colors">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4L15 12L5 20V4Z" fill="currentColor" />
                <path d="M17 4V20H19V4H17Z" fill="currentColor" />
              </svg>
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/30"></div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

