import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useGameTimer } from "@/hooks/useGameTimer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Drive = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const time = useGameTimer();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("param") && searchParams.get("param") === "seo") {
      setShowPassword(true);
    }
  }, [location]);

  const handleNext = () => {
    if (password === "onlebutecampSEO") {
      navigate("/wordgame");
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le mot de passe est incorrect. Veuillez réessayer.",
        duration: 3000,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Information importante</DialogTitle>
            <DialogDescription className="pt-4">
              Depuis l'ordinateur de Steve nous avons réussi à retrouver dans le Drive du Bootcamp le fichier verrouillé.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-6 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Drive du Bootcamp</h2>
            <div className="text-xl font-mono">{formatTime(time)}</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src="/lovable-uploads/6a48f7fd-16ec-474b-89a8-fb9a7bfb7b90.png"
              alt="Minion scientist thinking about ?param=seo"
              className="object-contain w-full h-full"
            />
          </div>

          <div className="text-center space-y-4">
            {showPassword ? (
              <div className="p-4 bg-yellow-100 rounded-lg">
                <p className="text-lg font-semibold text-yellow-800">
                  mot de passe = onlebutecampSEO
                </p>
              </div>
            ) : null}
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleNext();
                  }
                }}
              />
              <Button onClick={handleNext} className="w-full">
                Valider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drive;