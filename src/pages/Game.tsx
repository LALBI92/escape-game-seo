import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DragAndDrop } from "@/components/DragAndDrop";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1 && answer.toLowerCase() === "combinaison") {
      setCurrentStep(2);
      setAnswer("");
      toast.success("Bravo ! Passons à l'étape suivante.");
    } else if (currentStep === 1) {
      toast.error("Ce n'est pas le bon mot. Essayez encore !");
    }
  };

  const handleDownload = () => {
    navigate("/n");
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
            <h2 className="text-2xl font-bold">Défi SEO</h2>
            <div className="text-xl font-mono">{formatTime(time)}</div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="glass-card rounded-2xl p-8 space-y-8 animate-fade-in">
            <p className="text-lg text-center text-gray-700 italic">
              En se baladant près de la source, j'y ai trouvé un signe. Comme cette vision est douce quand on sait lire entre les lignes.
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

          Le mot mystère est : combinaison
          
          */}

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
        )}

        {currentStep === 2 && (
          <Card className="p-6 bg-[#343541] text-white">
            <div className="space-y-6">
              {/* User Message */}
              <div className="bg-[#444654] p-4 rounded-lg">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-2">Steve</p>
                    <p>Trouve moi un moyen de laisser un message à une personne qui enquêtera sur ma mort ?</p>
                  </div>
                </div>
              </div>

              {/* Assistant Message */}
              <div className="bg-[#444654] p-4 rounded-lg">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex-shrink-0" />
                  <div className="space-y-4">
                    <p className="font-medium">Assistant</p>
                    <p>Tu peux laisser un fichier caché sur ton ordinateur, une personne qui enquêtera regardera surement dans ton ordinateur. Par sécurité tu peux ajouter une énigme pour accéder au message.</p>
                    <p>Je vais te fournir un fichier fichier.esv et tu n'auras plus qu'à ajouter ton message. Pour créer l'énigme je vais m'inspirer de ton métier.</p>
                    <Button 
                      onClick={handleDownload}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Télécharger fichier.esv
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Game;