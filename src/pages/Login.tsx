import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate the user here
    navigate("/demo-mode");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-plinko-primary to-plinko-background p-4">
      <div className="max-w-md mx-auto pt-20">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-white bg-opacity-10 text-white p-4 rounded-xl"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white bg-opacity-10 text-white p-4 rounded-xl"
            required
          />
          <Button type="submit" className="w-full bg-plinko-accent text-white">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
