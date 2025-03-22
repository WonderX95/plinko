import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
  Twitter,
  Discord,
  HelpCircle,
  Shield,
  FileText,
  Lock,
  HeartHandshake,
  MessageCircle,
  LogOut,
} from "lucide-react";

interface MenuDropdownProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  username?: string;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function MenuDropdown({
  isOpen,
  onOpenChange,
  username = "glanka44863",
}: MenuDropdownProps) {
  const menuItems: MenuItem[] = [
    { label: "Twitter", icon: <Twitter className="h-4 w-4" /> },
    { label: "Discord", icon: <Discord className="h-4 w-4" /> },
    { label: "How to play", icon: <HelpCircle className="h-4 w-4" /> },
    { label: "AML", icon: <Shield className="h-4 w-4" /> },
    { label: "KYC", icon: <Lock className="h-4 w-4" /> },
    { label: "Terms & Conditions", icon: <FileText className="h-4 w-4" /> },
    { label: "Privacy Policy", icon: <FileText className="h-4 w-4" /> },
    {
      label: "Responsible Gaming",
      icon: <HeartHandshake className="h-4 w-4" />,
    },
    { label: "Customer Support", icon: <MessageCircle className="h-4 w-4" /> },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[280px] p-0 bg-black/60 border-white/10 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={item.onClick}
                className="w-full justify-start text-white hover:bg-white/10 rounded-none h-12 px-4 gap-3 transition-colors"
              >
                {item.icon}
                {item.label}
              </Button>
            ))}

            <div className="border-t border-white/10 p-4 flex items-center justify-between">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 gap-2 transition-colors"
                onClick={() => {
                  // Handle logout
                  onOpenChange(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
              <span className="text-sm text-gray-400">{username}</span>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
