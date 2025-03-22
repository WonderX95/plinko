import React, { useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";

interface DepositAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  crypto: {
    name: string;
    symbol: string;
    icon: string;
    balance: number;
  };
}

const DepositAddressModal = ({ isOpen, onClose, amount, crypto }: DepositAddressModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 seconds timeout

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-[#2a2230] p-6 rounded-xl max-w-md w-full mx-4">
          <h2 className="text-xl font-bold text-white mb-4">Generating Address...</h2>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-pink-500 border-t-transparent"></div>
            <span>Please wait...</span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DepositAddressModal; 