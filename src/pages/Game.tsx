import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Game = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const startTime = sessionStorage.getItem("startTime");
    if (!startTime) {
      navigate("/");
      return;
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - parseInt(startTime)) / 1000);
      setTime(elapsedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1 && answer.toLowerCase() === "combinaison") {
      setCurrentStep(2);
      setAnswer("");
      toast.success("Bravo ! Passons à l'étape suivante.");
      navigate("/chatgpt");
    } else if (currentStep === 1) {
      toast.error("Ce n'est pas le bon mot. Essayez encore !");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-6 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gagne ta place pour notre bootcamp SEO à Chamonix</h2>
            <div className="text-xl font-mono">{formatTime(time)}</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-8 animate-fade-in">
          <p className="text-lg text-center text-gray-700 italic">
            En se baladant près de la source, j'y ai trouvé un signe. Comme cette vision est douce quand on sait lire entre les lignes.
          </p>

          {/* Le mot de passe est le mot : combinaison */}
          <div dangerouslySetInnerHTML={{ __html: '<!-- Le mot de passe est le mot : combinaison -->' }} />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                placeholder="Votre réponse..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Game;