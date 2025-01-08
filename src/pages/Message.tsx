import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Message = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const startTime = sessionStorage.getItem("startTime");
    if (!startTime) {
      navigate("/");
      return;
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - parseInt(startTime)) / 1000);
      setTime(elapsedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleGameStart = () => {
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-right text-xl font-mono font-bold">
          {formatTime(time)}
        </div>

        <Card className="p-6 bg-white shadow-md">
          {/* Author Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/lovable-uploads/1d974c80-6ea8-43c8-b590-5beb9cdbbcff.png" alt="John Macmuller" />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">John Macmuller</h3>
                <p className="text-sm text-gray-500">Organisateur Bootcamp SEO • 1j</p>
              </div>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon">
                  <InfoIcon className="h-5 w-5" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <p className="text-sm text-muted-foreground">
                  Voici la publication du concours où Steve a gagné sa place au bootcamp
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Post Content */}
          <div className="space-y-4">
            <p className="text-gray-800">
              🎉 Grand Jeu Concours SEO ! 🎉
              <br /><br />
              Gagnez votre place pour le prochain bootcamp SEO qui aura lieu à Chamonix en décembre 2024.
              <br /><br />
              Pour tenter votre chance, découvrez le mot caché sur cette page et envoyez-le moi par MP.
              <br /><br />
              Bonne chance à tous ! 🏔️ #SEO #Bootcamp #Chamonix
            </p>
            
            {/* Post image */}
            <img 
              src="/lovable-uploads/069ae9d2-8b6b-408c-9f27-f1caafdce5cc.png" 
              alt="Bootcamp SEO 3ème édition" 
              className="w-full rounded-lg"
            />

            {/* Post Stats */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 pt-4 border-t">
              <span>❤️ 142</span>
              <span>💭 38 commentaires</span>
              <span>🔄 15 partages</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6 space-y-6">
            {/* Steve's Comment */}
            <div className="flex space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/lovable-uploads/e5425343-e516-4a73-9c07-96a439dc77ea.png" alt="Steve Palomba" />
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold">Steve Palomba</h4>
                  <p className="text-sm text-gray-600">
                    Mot mystère envoyé par MP, on croise les doigts 🤞
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  J'aime • Répondre • 23h
                </div>
              </div>
            </div>

            {/* Other comments */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold">Marie Dubois</h4>
                  <p className="text-sm text-gray-600">Je participe ! L'énigme est vraiment bien pensée 🤔</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  J'aime • Répondre • 12h
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold">Thomas Martin</h4>
                  <p className="text-sm text-gray-600">
                    Je viens de résoudre l'énigme, c'est vraiment bien pensé ! MP envoyé 🚀
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  J'aime • Répondre • 8h
                </div>
              </div>
            </div>

            {/* Comment 3 */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold">Sophie Bernard</h4>
                  <p className="text-sm text-gray-600">
                    Un bootcamp à Chamonix ? Trop bien ! Je tente ma chance 🎯
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  J'aime • Répondre • 5h
                </div>
              </div>
            </div>

          </div>

          {/* Game Link Button */}
          <div className="text-center mt-6">
            <Button 
              onClick={handleGameStart}
              className="bg-[#0A66C2] hover:bg-[#004182] text-white"
            >
              Participer au concours
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Message;
