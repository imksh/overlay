import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from './pages/Home';
import Scoreboard from "./pages/Scoreboard";
import Scoreboard2 from './pages/Scoreboard2';
import Test from './pages/Test';

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
      <Route path="/scoreboard2" element={<Scoreboard2 />} />
      <Route path="/test" element={<Test />} />
    </Routes>
    <Toaster />
  </div>
  )
}

export default App