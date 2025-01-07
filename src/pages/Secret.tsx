import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

const Game = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "seo2025") {
      navigate("/message");
    } else {
      toast({
        title: "Erreur",
        description: "Mot de passe incorrect",
        variant: "destructive",
        className: "bg-red-200 border-red-300 text-red-900 font-medium",
        action: <X className="h-4 w-4 cursor-pointer" onClick={() => toast.dismiss()} />,
      });
    }
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
        isLightOn ? "bg-white" : "bg-black"
      }`}
    >
      <h1 
        className={`text-2xl md:text-4xl font-bold mb-8 transition-colors duration-500 ${
          isLightOn ? "text-black" : "text-white"
        }`}
      >
        Allume la lumière pour connaître mon secret
      </h1>

      <Button
        onClick={() => setIsLightOn(!isLightOn)}
        className="mb-8 bg-purple-600 hover:bg-purple-700"
      >
        {isLightOn ? "Éteindre" : "Allumer"} la lumière
      </Button>

      {isLightOn && (
        <form onSubmit={handlePasswordSubmit} className="w-full max-w-sm space-y-4 animate-fade-up">
          <Input
            type="password"
            placeholder="Entrez le mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Valider
          </Button>
        </form>
      )}
    </div>
  );
};

export default Game;