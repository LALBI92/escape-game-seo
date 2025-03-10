import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { X, ArrowLeft } from "lucide-react";

const Report = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [suspect, setSuspect] = useState("");
  const [location, setLocation] = useState("");
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [shuffledParticipants, setShuffledParticipants] = useState([]);
  const [shuffledLocations, setShuffledLocations] = useState([]);

  useEffect(() => {
    const startTime = sessionStorage.getItem("startTime");
    if (!startTime) {
      navigate("/");
      return;
    }

    const interval = setInterval(() => {
      const start = parseInt(startTime);
      const now = Date.now();
      const elapsed = Math.floor((now - start) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setElapsedTime(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const participants = [
    { name: "John", role: "Organisateur", company: "Digital Academy" },
    { name: "Steve", role: "Responsable SEO e-commerce", company: "Z-discount" },
    { name: "Emma Wilson", role: "SEO Manager", company: "SEO - Santiano" },
    { name: "Thomas Martin", role: "SEO Content Strategist", company: "SEO - Santiano" },
    { name: "Sarah Chen", role: "Technical SEO Specialist", company: "SEO - Santiano" },
    { name: "Michael Brown", role: "SEO Analytics Expert", company: "SEO - Santiano" },
    { name: "Sophie Dubois", role: "SEO Project Manager", company: "SEO - Santiano" },
    { name: "David Kim", role: "International SEO Specialist", company: "SEO - Santiano" },
    { name: "Maria Garcia", role: "E-commerce SEO Manager", company: "SEO - Santiano" },
    { name: "James Wilson", role: "Local SEO Expert", company: "SEO - Santiano" },
    { name: "Anna Schmidt", role: "SEO Content Manager", company: "SEO - Santiano" },
    { name: "Pierre Durand", role: "SEO Technical Lead", company: "SEO - Santiano" },
    { name: "Larry Smith", role: "SEO Consultant", company: "SEO - Santiano" }
  ];

  const locations = [
    "Vallée Blanche",
    "Mer de Glace",
    "Aiguille du Midi",
    "Plan de l'Aiguille",
    "Les Houches",
    "Glacier des Bossons",
    "Lac Cornu"
  ];

  useEffect(() => {
    // Fonction pour mélanger un tableau
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setShuffledParticipants(shuffleArray(participants));
    setShuffledLocations(shuffleArray(locations));
  }, []);

  const handleSubmit = () => {
    if (suspect === "Larry Smith" && location === "Lac Cornu") {
      toast({
        title: "Sophie",
        description: "Vos indications sont pertinentes. Nous avons trouvé sur les bottes de Larry des traces de boue et de sang. Après analyse, le sang appartient bien à Steve. Nous avons retrouvé son corps au lac... Je vais prévenir sa femme. Il avait un papier dans sa poche avec ce qui ressemble à un code : seo2025.",
        className: "bg-blue-100 border-blue-200 font-medium",
        action: (
          <X 
            className="h-4 w-4 cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              const toastInstance = toast({
                title: "Sophie",
                description: "Message fermé",
                duration: 0
              });
              toastInstance.dismiss();
            }} 
          />
        ),
      });
      setShowContinueButton(true);
    } else {
      toast({
        title: "Sophie",
        description: "Malheureusement ces éléments ne nous ont pas permis d'avancer, notre enquête piétine.",
        variant: "destructive",
        className: "bg-red-200 border-red-300 text-red-900 font-medium",
        action: (
          <X 
            className="h-4 w-4 cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              const toastInstance = toast({
                title: "Sophie",
                description: "Message fermé",
                duration: 0
              });
              toastInstance.dismiss();
            }} 
          />
        ),
      });
    }
  };

  const handleContinue = () => {
    navigate("/secret");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="outline"
          onClick={() => navigate('/success')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Button>

        <Card className="p-6 space-y-8 animate-fade-up relative">
          <div className="absolute top-4 right-4 font-mono text-sm bg-purple-100 px-2 py-1 rounded">
            {elapsedTime}
          </div>
          <h1 className="text-3xl font-bold text-purple-800 text-center mb-8">
            Rapport d'Enquête
          </h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Qui est le suspect principal ?</label>
              <Select onValueChange={setSuspect} value={suspect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisissez un suspect" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  {shuffledParticipants.map((participant) => (
                    <SelectItem key={participant.name} value={participant.name}>
                      {participant.name} - {participant.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Où pensez-vous trouver des indices ?</label>
              <Select onValueChange={setLocation} value={location}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisissez un lieu" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  {shuffledLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Envoyer le rapport
            </Button>

            {showContinueButton && (
              <Button 
                onClick={handleContinue}
                className="w-full bg-green-600 hover:bg-green-700 mt-4"
              >
                Continuer
              </Button>
            )}
          </div>
        </Card>
      </div>
      <Toaster />
    </div>
  );
};

export default Report;