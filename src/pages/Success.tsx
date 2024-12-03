import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Success = () => {
  const navigate = useNavigate();
  const [letters, setLetters] = useState(["", "", ""]);
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
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLetterChange = (index: number, value: string) => {
    const newLetters = [...letters];
    newLetters[index] = value.toUpperCase();
    setLetters(newLetters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = letters.join("");
    if (code === "PBN") {
      navigate("/leaderboard");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="text-right mb-4">
          <div className="text-xl font-mono">{formatTime(time)}</div>
        </div>
        
        <div className="pt-20">
          <p className="text-center mb-12 text-2xl">Quelqu'un peut allumer la lumière ?</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center gap-4">
              {letters.map((letter, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={letter}
                  onChange={(e) => handleLetterChange(index, e.target.value)}
                  className="w-16 h-16 text-center text-2xl text-black bg-black border-black focus:border-black focus-visible:ring-0"
                />
              ))}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-black text-black border-black hover:bg-black hover:text-black hover:border-black"
            >
              Valider
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Success;