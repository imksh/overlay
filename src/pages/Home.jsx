import React from 'react'
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-6">
      {/* Logo */}
      <img
        src="/images/logo.png"
        alt="Overlay Logo"
        className="w-24 h-24 rounded-full mb-6 shadow-lg"
      />

      {/* Intro */}
      <h1 className="text-3xl font-bold mb-2">Live Cricket Overlay System</h1>
      <p className="text-gray-300 max-w-md mb-8">
        Control your live match overlays in real time. Choose between standard or mobile scoreboard views to display during streams.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/scoreboard")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Design 1
        </button>

        <button
          onClick={() => navigate("/scoreboard2")}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Design 2
        </button>
      </div>

      {/* Footer */}
      <p className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} IdioticMinds | Made for Streamers
      </p>
    </div>
  )
}
