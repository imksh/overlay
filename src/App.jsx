import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Scoreboard from "./pages/Scoreboard";
import { Home } from './pages/Home';

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
    </Routes>
    <Toaster />
  </div>
  )
}

export default App