import { useState } from "react";
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

const Report = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [suspect, setSuspect] = useState("");
  const [location, setLocation] = useState("");

  const participants = [
    { name: "John", role: "Organisateur", company: "Digital Academy" },
    { name: "Steve", role: "Responsable SEO e-commerce", company: "Z-discount" },
    { name: "Larry Smith", role: "SEO Consultant", company: "SEO - Santiano" },
    { name: "Emma Wilson", role: "SEO Manager", company: "SEO - Santiano" },
    { name: "Thomas Martin", role: "SEO Content Strategist", company: "SEO - Santiano" },
    { name: "Sarah Chen", role: "Technical SEO Specialist", company: "SEO - Santiano" },
    { name: "Michael Brown", role: "SEO Analytics Expert", company: "SEO - Santiano" },
    { name: "Sophie Dubois", role: "SEO Project Manager", company: "SEO - Santiano" },
    { name: "David Kim", role: "International SEO Specialist", company: "SEO - Santiano" },
    { name: "Maria Garcia", role: "E-commerce SEO Manager", company: "SEO - Santiano" },
    { name: "James Wilson", role: "Local SEO Expert", company: "SEO - Santiano" },
    { name: "Anna Schmidt", role: "SEO Content Manager", company: "SEO - Santiano" },
    { name: "Pierre Durand", role: "SEO Technical Lead", company: "SEO - Santiano" }
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

  const handleSubmit = () => {
    if (suspect === "Larry Smith" && location === "Lac Cornu") {
      // Première réponse
      toast({
        title: "Message de l'équipe",
        description: "Vos indications sont pertinentes. Nous avons trouvé sur les bottes de Larry des traces de boue et de sang. Après analyse, le sang appartient bien à Steve.",
        className: "glass-card",
      });

      // Deuxième réponse après 3 secondes
      setTimeout(() => {
        toast({
          title: "Message de l'équipe",
          description: "Nous avons bien retrouvé le corps de Steve au lac... Sophie va prévenir sa femme. Il avait un papier dans sa poche avec ce qui ressemble à un code : seo2025. On vous laisse creuser ce point.",
          className: "glass-card",
        });
      }, 3000);

      // Navigation après les messages
      setTimeout(() => {
        navigate("/message");
      }, 5000);
    } else {
      toast({
        title: "Message de l'équipe",
        description: "Malheureusement ces éléments ne nous ont pas permis d'avancer, notre enquête piétine.",
        variant: "destructive",
        className: "glass-card",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6 space-y-8 animate-fade-up">
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
                  {participants.map((participant) => (
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
                  {locations.map((loc) => (
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Report;