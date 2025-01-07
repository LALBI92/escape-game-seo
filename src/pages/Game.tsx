import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DragAndDrop } from "@/components/DragAndDrop";

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
    const player = localStorage.getItem("player");
    if (!player) {
      navigate("/");
      return;
    }

    let intervalId: ReturnType<typeof setInterval>;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          sessionStorage.setItem("gameTime", newTime.toString());
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, navigate]);

  useEffect(() => {
    sessionStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1 && answer.toLowerCase() === "a") {
      setCurrentStep(2);
      setAnswer("");
      toast.success("Bravo ! Passons à l'étape suivante.");
    } else if (currentStep === 1) {
      toast.error("Ce n'est pas la bonne lettre. Essayez encore !");
    }
  };

  const handleDragAndDropSuccess = () => {
    setIsRunning(false);
    sessionStorage.setItem("gameTime", time.toString());
    toast.success("Félicitations ! Passons à l'étape suivante.");
    navigate("/n");
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

        {currentStep === 1 && (
          <div className="glass-card rounded-2xl p-8 space-y-8 animate-fade-in">
            <p className="text-lg text-center text-gray-700 italic">
              Les apparences sont parfois trompeuses... La vérité se cache souvent dans les profondeurs invisibles. Un expert SEO sait que la structure d'une page révèle bien plus que ce que l'œil peut voir.
            </p>

            {/* 
    
           #####     
          #     #    
         #       #   
         #       #   
         #       #   
          #     #    
           #####     
                     
          La première lettre est A !
          
          */}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  maxLength={1}
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
        )}

        {currentStep === 2 && (
          <div className="glass-card rounded-2xl p-8 animate-fade-in">
            <DragAndDrop onSuccess={handleDragAndDropSuccess} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;