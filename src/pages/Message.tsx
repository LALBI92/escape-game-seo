import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Message = () => {
  const navigate = useNavigate();
  const [letter, setLetter] = useState("");
  const [time, setTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isRunning] = useState(true);

  useEffect(() => {
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
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (letter.toUpperCase() === "N") {
      toast.success("Bravo ! Vous avez trouvé la redirection !");
      navigate("/final");
    } else {
      toast.error("Ce n'est pas la bonne lettre. Essayez encore !");
    }
  };

  const handleBack = () => {
    navigate("/game");
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
          <p className="text-xl text-center">
            En venant ici tu es passé par ailleurs mais l'as tu remarqué ?
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                maxLength={1}
                className="text-center"
                placeholder="Entrez la lettre"
              />
            </div>
            <Button type="submit" className="w-full">
              Valider
            </Button>
          </form>

          <div className="text-center">
            <Button variant="outline" onClick={handleBack} className="mt-4">
              Retourner à la page précédente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;