import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Introduction from "./pages/Introduction";
import Game from "./pages/Game";
import WordGame from "./pages/WordGame";
import Liste from "./pages/Liste";
import Message from "./pages/Message";
import Journal from "./pages/Journal";
import Drive from "./pages/Drive";
import ChatGPT from "./pages/ChatGPT";
import DragDropGame from "./pages/DragDropGame";
import Leaderboard from "./pages/Leaderboard";
import Redirect from "./pages/Redirect";
import Report from "./pages/Report";
import Secret from "./pages/Secret";
import Fin from "./pages/Fin";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/game" element={<Game />} />
        <Route path="/wordgame" element={<WordGame />} />
        <Route path="/success" element={<Success />} />
        <Route path="/liste" element={<Liste />} />
        <Route path="/report" element={<Report />} />
        <Route path="/message" element={<Message />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/drive" element={<Drive />} />
        <Route path="/chatgpt" element={<ChatGPT />} />
        <Route path="/dragdrop" element={<DragDropGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/fin" element={<Fin />} />
      </Routes>
    </Router>
  );
}

export default App;