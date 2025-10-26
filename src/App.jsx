import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Scoreboard from "./pages/Scoreboard";
import { Home } from './pages/Home';
import ScoreboardMobile from './pages/ScoreBoardMobile';
import Test from './pages/Test';

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
      <Route path="/scoreboard-mobile" element={<ScoreboardMobile />} />
      <Route path="/test" element={<Test />} />
    </Routes>
    <Toaster />
  </div>
  )
}

export default App