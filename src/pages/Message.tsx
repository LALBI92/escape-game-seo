import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Message = () => {
  const navigate = useNavigate();
  const [letter, setLetter] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (letter.toUpperCase() === "N") {
      toast.success("Bravo ! Vous avez trouvé la redirection !");
      navigate("/final");
    } else {
      toast.error("Ce n'est pas la bonne lettre. Essayez encore !");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
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
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="mt-4"
            >
              Retourner à la page précédente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;