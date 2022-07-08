import { Route, Routes } from "react-router-dom";
import Feedback from "./pages/Feedback";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Ranking from "./pages/Ranking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/game-page" element={<Game />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/ranking" element={<Ranking />} />
    </Routes>
  );
}

export default App;
