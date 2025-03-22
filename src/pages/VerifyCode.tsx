
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const VerifyCode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit code",
        variant: "destructive",
      });
      return;
    }
    // In a real app, this would verify the code
    navigate('/demo-mode');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-plinko-primary to-plinko-background p-4">
      <div className="max-w-md mx-auto pt-20">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Verify Code</h1>
        <p className="text-gray-300 text-center mb-8">
          Enter the code we sent to your email
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-white bg-opacity-10 border-none text-white text-center text-2xl tracking-widest"
            placeholder="● ● ● ● ● ●"
            maxLength={6}
            required
          />
          
          <Button 
            type="submit"
            className="w-full bg-plinko-accent text-white"
          >
            Verify Code
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
