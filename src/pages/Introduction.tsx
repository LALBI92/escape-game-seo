import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

const Introduction = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const player = localStorage.getItem("player");
    if (player) {
      const { name: playerName } = JSON.parse(player);
      setName(playerName);
    }
    
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleStartMission = () => {
    if (!name) {
      toast.error("Veuillez d'abord vous identifier");
      navigate("/");
      return;
    }
    // Start the timer when accepting the mission
    const startTime = Date.now();
    sessionStorage.setItem("startTime", startTime.toString());
    navigate("/message");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-3xl mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Card className="glass-card overflow-hidden">
          {/* Email Header */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <InfoIcon className="h-5 w-5" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p className="text-sm text-muted-foreground">
                    Votre mission est de résoudre cette enquête le plus rapidement possible. Le chronomètre démarrera dès que vous accepterez la mission.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* Email Content */}
          <div className="p-8 space-y-6 bg-white">
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>De: Bureau d'Investigation Numérique</span>
                <span>CONFIDENTIEL</span>
              </div>
              <div className="text-sm text-gray-500">
                À: {name || "[AGENT NON IDENTIFIÉ]"}
              </div>
              <div className="text-sm text-gray-500">
                Objet: Enquête #SEO2024 - Disparition de Steve Palomba
              </div>
            </div>

            <div className="prose prose-slate max-w-none space-y-6">
              <p className="text-lg">
                Bonjour {name || "Agent"},
              </p>

              <p>
                Merci d'accepter cette enquête. Nous avons besoin de vos compétences pour résoudre une affaire des plus mystérieuses.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                <p className="text-sm">
                  <strong>Contexte :</strong> Steve Palomba, responsable SEO chez un grand e-commerçant français, 
                  a récemment participé à un bootcamp dans le but de perfectionner ses compétences. 
                  Nous n'avons plus aucune nouvelle de lui depuis le 23 décembre dans la soirée.
                </p>
              </div>

              <p>
                Sa femme nous a donné accès à son ordinateur, et nous avons besoin de votre expertise 
                pour analyser les indices et répondre aux questions cruciales suivantes :
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Est-ce que Steve est mort ?</li>
                <li>Si oui, comment ?</li>
                <li>S'il s'agit d'un crime, qui en est l'auteur ?</li>
                <li className="text-gray-500 italic">Question subsidiaire : Le bootcamp avait-il un bon niveau ?</li>
              </ul>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Votre mission, si vous l'acceptez, est de suivre les indices et de résoudre cette énigme. 
                  Chaque détail compte, chaque indice peut être crucial.
                </p>
              </div>
            </div>

            <div className="pt-6 flex justify-center">
              <Button
                onClick={handleStartMission}
                className="neo-button bg-gradient-to-r from-slate-700 to-slate-900 text-white hover:from-slate-800 hover:to-slate-950"
              >
                Accepter la mission
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Introduction;