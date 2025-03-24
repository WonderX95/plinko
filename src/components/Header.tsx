import { useState } from "react";
import { Button } from "./ui/button";
import { Music, MoreVertical, MessageSquare } from "lucide-react";
import { MusicPlayer } from "./MusicPlayer";
import { MenuDropdown } from "./MenuDropdown";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6 md:mb-8 px-4 md:px-8">
      <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
        Plinko!
      </h1>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={() => navigate("/chat")}
          className="flex items-center gap-2 text-white bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-105"
        >
          <MessageSquare className="w-4 h-4" />
          <span>14</span>
        </Button>

        <Button
          variant="ghost"
          className="text-white bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-105"
          onClick={() => setIsMusicOpen(true)}
        >
          <Music className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          className="text-white bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-105"
          onClick={() => setIsMenuOpen(true)}
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <MusicPlayer isOpen={isMusicOpen} onOpenChange={setIsMusicOpen} />
      <MenuDropdown isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </div>
  );
}
