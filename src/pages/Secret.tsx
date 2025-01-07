import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Secret = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "seo2025") {
      navigate("/message");
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
      <h1 className="text-2xl mb-8 text-center">
        Allume la lumière pour découvrir mon secret
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez le mot de passe"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Button type="submit" className="w-full">
          Valider
        </Button>
      </form>
    </div>
  );
};

export default Secret;