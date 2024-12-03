import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Game = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    // Check if player info exists
    const player = localStorage.getItem("player");
    if (!player) {
      navigate("/");
      return;
    }

    // Start timer
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-6 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">SEO Challenge</h2>
            <div className="text-xl font-mono">{formatTime(time)}</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-8 fade-in">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              Stage 1
            </span>
            <h3 className="text-xl font-semibold">
              Find the Hidden Letter in Source Code
            </h3>
            <p className="text-gray-600">
              Your first challenge is to inspect the source code of this page.
              There's a letter hidden somewhere in the HTML comments.
            </p>
          </div>

          {/* Hidden letter in comment */}
          {/* The first letter is A */}

          <form className="space-y-4">
            <div>
              <label
                htmlFor="answer"
                className="block text-sm font-medium text-gray-700"
              >
                Enter the hidden letter:
              </label>
              <input
                type="text"
                id="answer"
                maxLength={1}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                placeholder="Enter letter here"
              />
            </div>
            <button
              type="submit"
              className="neo-button w-full text-gray-900 font-medium"
            >
              Submit Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Game;