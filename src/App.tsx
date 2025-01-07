import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Introduction from "./pages/Introduction";
import Game from "./pages/Game";
import Message from "./pages/Message";
import DragDropGame from "./pages/DragDropGame";
import Drive from "./pages/Drive";
import Success from "./pages/Success";
import Leaderboard from "./pages/Leaderboard";
import WordGame from "./pages/WordGame";
import ChatGPT from "./pages/ChatGPT";
import Journal from "./pages/Journal";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/game" element={<Game />} />
            <Route path="/message" element={<Message />} />
            <Route path="/n" element={<DragDropGame />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/drive" element={<Drive />} />
            <Route path="/success" element={<Success />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/word-game" element={<WordGame />} />
            <Route path="/chatgpt" element={<ChatGPT />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;