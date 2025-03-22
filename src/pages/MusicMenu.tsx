
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MusicMenu = () => {
  const navigate = useNavigate();
  const playlist = [
    { title: "Electronic Vibes", artist: "DJ Plinko" },
    { title: "Bounce", artist: "The Tokens" },
    { title: "Drop It", artist: "Coin Master" },
    { title: "Lucky Streak", artist: "Fortune" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-plinko-primary to-plinko-background p-4">
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="text-white mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <h1 className="text-2xl font-bold text-white mb-6">Music Player</h1>
        
        <div className="space-y-4">
          {playlist.map((track, index) => (
            <div 
              key={index}
              className="bg-white bg-opacity-10 p-4 rounded-xl text-white"
            >
              <div className="font-medium">{track.title}</div>
              <div className="text-sm text-gray-400">{track.artist}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicMenu;
