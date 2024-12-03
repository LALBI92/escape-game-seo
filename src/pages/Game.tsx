import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Game = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const player = localStorage.getItem("player");
    if (!player) {
      navigate("/");
      return;
    }

    let intervalId: ReturnType<typeof setInterval>;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
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
            <h2 className="text-2xl font-bold">Défi SEO</h2>
            <div className="text-xl font-mono">{formatTime(time)}</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-8 fade-in">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              Étape 1
            </span>
            <h3 className="text-xl font-semibold">
              Trouvez la lettre cachée dans le code source
            </h3>
            <p className="text-gray-600">
              Votre premier défi est d'inspecter le code source de cette page.
              Une lettre est cachée quelque part dans les commentaires HTML.
            </p>
          </div>

          {/* La première lettre est A */}

          <form className="space-y-4">
            <div>
              <label
                htmlFor="answer"
                className="block text-sm font-medium text-gray-700"
              >
                Entrez la lettre cachée :
              </label>
              <input
                type="text"
                id="answer"
                maxLength={1}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                placeholder="Entrez la lettre ici"
              />
            </div>
            <button
              type="submit"
              className="neo-button w-full text-gray-900 font-medium"
            >
              Valider la réponse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Game;