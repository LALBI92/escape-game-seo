import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Final = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const handleNext = () => {
    navigate("/success");
  };

  // Formatage du temps pour l'affichage
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

        <div className="glass-card rounded-2xl p-8 space-y-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src="/lovable-uploads/6971d9cf-7125-42c0-ac36-3ddb1cc8bafc.png"
              alt="Minion en blouse de laboratoire avec une fiole"
              className="object-contain w-full h-full"
            />
          </div>

          <div className="text-center space-y-4">
            <p className="text-2xl font-bold">La lettre est : P</p>
            <Button onClick={handleNext} className="w-full">
              Passer à l'étape suivante
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;