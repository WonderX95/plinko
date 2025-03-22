import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DemoMode from "./pages/DemoMode";
import Login from "./pages/Login";
import CreatePassword from "./pages/CreatePassword";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import CryptoDetailPage from "./pages/CryptoDetailPage";
import DepositAddressPage from "./pages/DepositAddressPage";
import FundedHomePage from "./pages/FundedHomePage";
import ChatPage from "./pages/ChatPage";
import { MusicPlayer } from "./components/MusicPlayer";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VerifyCode from "./pages/VerifyCode";
import GenerateAddressPage from "./pages/GenerateAddressPage";
import CreatePasswordPage from "./pages/CreatePassword";

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DemoMode />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/verify-code",
      element: <VerifyCode />,
    },
    {
      path: "/create-password",
      element: <CreatePasswordPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/wallet",
      element: <WalletPage />,
    },
    {
      path: "/crypto-detail",
      element: <CryptoDetailPage />,
    },
    {
      path: "/generate-address",
      element: <GenerateAddressPage />,
    },
    {
      path: "/funded-home",
      element: <FundedHomePage />,
    },
    {
      path: "/deposit-address",
      element: <DepositAddressPage />,
    },
    {
      path: "/chat",
      element: <ChatPage />,
    },
    {
      path: "/music",
      element: <MusicPlayer isOpen={true} standalone={true} />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            {router.routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
