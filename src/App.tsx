import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Secret from "./pages/Secret";
import WordGame from "./pages/WordGame";
import Success from "./pages/Success";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/wordgame" element={<WordGame />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
