import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Secret = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [elapsedTime, setElapsedTime] = useState("00:00");

  useEffect(() => {
    const startTime = sessionStorage.getItem("startTime");
    if (startTime) {
      const updateTimer = () => {
        const now = new Date().getTime();
        const elapsed = now - parseInt(startTime);
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        setElapsedTime(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "seo2025") {
      navigate("/fin");
    } else {
      toast({
        title: "Erreur",
        description: "Mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 text-xl font-mono">
        {elapsedTime}
      </div>
      <h1 className="text-2xl mb-8 text-center">
        Allume la lumière pour découvrir mon secret
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez le mot de passe"
          className="bg-transparent border-black text-black placeholder:text-black cursor-default"
        />
        <Button 
          type="submit" 
          className="w-full bg-transparent text-black border-black hover:bg-transparent cursor-default"
        >
          Valider
        </Button>
      </form>
    </div>
  );
};

export default Secret;