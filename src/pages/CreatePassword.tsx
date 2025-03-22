import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, ArrowRight, Share2 } from "lucide-react";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const email = localStorage.getItem("userEmail") || "your@email.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setError("");
    // Show the modal instead of navigating immediately
    setShowModal(true);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-plinko-background to-black flex flex-col justify-between p-6">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-plinko-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-md text-center mb-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Welcome,
            </h1>
            <p className="text-2xl text-white/80 font-light">{email}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl">
            <div className="inline-flex justify-center items-center bg-plinko-accent/20 p-3 rounded-full mb-6">
              <Lock className="w-6 h-6 text-plinko-accent" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left">
                <label className="text-white/90 mb-2 block font-medium">
                  Create your password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 text-white p-4 rounded-xl border border-white/10 focus:border-plinko-accent focus:ring-1 focus:ring-plinko-accent transition-all"
                  placeholder="****************"
                  required
                />
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </div>

              <p className="text-white/60 text-sm">
                Password must be at least 8 characters
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8 relative z-10">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="px-6 py-5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <Button
          onClick={handleSubmit}
          className="px-8 py-5 rounded-xl bg-plinko-accent text-white hover:bg-plinko-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-plinko-accent/20"
        >
          Start Playing <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Add to Home Screen Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2a2230] rounded-2xl max-w-sm w-full overflow-hidden">
            <div className="p-8 flex flex-col items-center">
              <div className="bg-pink-400 w-16 h-16 rounded-2xl mb-6"></div>

              <h2 className="text-white text-2xl font-medium text-center mb-2">
                Add to your home screen to play
              </h2>

              <p className="text-gray-400 text-center mb-6">
                You must do this from the sharing menu in Safari in order to
                play Plinko
              </p>

              <div className="flex items-center text-gray-300 mb-6">
                <span>Tap</span>
                <Share2 className="mx-2 w-5 h-5" />
                <span>then tap "Add on the home screen"</span>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full bg-pink-400 text-white hover:bg-pink-500 py-3 rounded-xl"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePassword;
