
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    // In a real app, this would validate the email and send a code
    navigate('/verify-code');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-plinko-primary to-plinko-background p-4">
      <div className="max-w-md mx-auto pt-20">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Welcome Back!</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white bg-opacity-10 border-none text-white"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-plinko-accent text-white"
          >
            Continue with Email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
