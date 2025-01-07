import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Secret from "./pages/Secret";
import WordGame from "./pages/WordGame";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Secret />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/wordgame" element={<WordGame />} />
      </Routes>
    </Router>
  );
};

export default App;