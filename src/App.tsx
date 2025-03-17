
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { testSupabaseConnection } from "@/integrations/supabase/client";
import Introduction from "./pages/Introduction";
import Game from "./pages/Game";
import WordGame from "./pages/WordGame";
import Liste from "./pages/Liste";
import Report from "./pages/Report";
import Message from "./pages/Message";
import Journal from "./pages/Journal";
import ChatGPT from "./pages/ChatGPT";
import DragDropGame from "./pages/DragDropGame";
import Drive from "./pages/Drive";
import Leaderboard from "./pages/Leaderboard";
import Secret from "./pages/Secret";
import Fin from "./pages/Fin";
import Index from "./pages/Index";
import Accueil from "./pages/Accueil";

// Wrap with this component to initialize Supabase on application start
const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Test database connection on app initialization
    const initializeApp = async () => {
      console.log("Testing Supabase connection on app startup...");
      const result = await testSupabaseConnection();
      console.log("Supabase connection test result:", result);
    };
    
    initializeApp();
  }, []);

  return <>{children}</>;
};

function App() {
  return (
    <AppInitializer>
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/inscription" element={<Index />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/game" element={<Game />} />
          <Route path="/wordgame" element={<WordGame />} />
          <Route path="/success" element={<Liste />} />
          <Route path="/report" element={<Report />} />
          <Route path="/message" element={<Message />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/chatgpt" element={<ChatGPT />} />
          <Route path="/dragdropgame" element={<DragDropGame />} />
          <Route path="/drive" element={<Drive />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/secret" element={<Secret />} />
          <Route path="/fin" element={<Fin />} />
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </AppInitializer>
  );
}

export default App;
