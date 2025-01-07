import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [finalTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Simulation de 30 résultats avec des temps variés
  const leaderboard = [
    { pseudo: "Alice", time: 180 }, // 3:00
    { pseudo: "Bob", time: 240 }, // 4:00
    { pseudo: "Charlie", time: 300 }, // 5:00
    { pseudo: "David", time: 320 }, // 5:20
    { pseudo: "Eva", time: 340 }, // 5:40
    { pseudo: "Frank", time: 360 }, // 6:00
    { pseudo: "Grace", time: 380 }, // 6:20
    { pseudo: "Henry", time: 400 }, // 6:40
    { pseudo: "Isabelle", time: 420 }, // 7:00
    { pseudo: "Jack", time: 440 }, // 7:20
    { pseudo: "Karen", time: 460 }, // 7:40
    { pseudo: "Liam", time: 480 }, // 8:00
    { pseudo: "Maria", time: 500 }, // 8:20
    { pseudo: "Noah", time: 520 }, // 8:40
    { pseudo: "Olivia", time: 540 }, // 9:00
    { pseudo: "Peter", time: 560 }, // 9:20
    { pseudo: "Quinn", time: 580 }, // 9:40
    { pseudo: "Rachel", time: 600 }, // 10:00
    { pseudo: "Sam", time: 620 }, // 10:20
    { pseudo: "Tina", time: 640 }, // 10:40
    { pseudo: "Uma", time: 660 }, // 11:00
    { pseudo: "Victor", time: 680 }, // 11:20
    { pseudo: "Wendy", time: 700 }, // 11:40
    { pseudo: "Xavier", time: 720 }, // 12:00
    { pseudo: "Yara", time: 740 }, // 12:20
    { pseudo: "Zack", time: 760 }, // 12:40
    { pseudo: "Anna", time: 780 }, // 13:00
    { pseudo: "Ben", time: 800 }, // 13:20
    { pseudo: "Clara", time: 820 }, // 13:40
    { pseudo: "Dan", time: 840 }, // 14:00
  ];

  const getParticipantPosition = () => {
    let position = 1;
    for (const entry of leaderboard) {
      if (finalTime > entry.time) {
        position++;
      }
    }
    return position;
  };

  const getPositionEmoji = (position: number) => {
    switch (position) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "🎮";
    }
  };

  const getOrdinalNumber = (n: number) => {
    return n + (n === 1 ? "er" : "ème");
  };

  const participantPosition = getParticipantPosition();
  const shareText = `Je suis arrivé ${getOrdinalNumber(participantPosition)} à "Crime au Bootcamp SEO". Si tu veux tenter de faire mieux : `;
  const shareUrl = window.location.origin;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-4">
      <div className="max-w-2xl mx-auto pt-20 space-y-8">
        <div className="text-center space-y-6 animate-fade-up">
          <h1 className="text-4xl font-bold">Félicitations ! 🎉</h1>
          <p className="text-2xl text-purple-200">
            Votre temps : {formatTime(finalTime)}
          </p>
          <p className="text-xl text-amber-400 font-semibold">
            Vous êtes {getOrdinalNumber(participantPosition)} {getPositionEmoji(participantPosition - 1)}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md text-center">
          <h2 className="text-2xl font-semibold">Partagez votre expérience ! 🌟</h2>
          <p className="text-purple-200">
            Si vous avez aimé cet escape game, partagez-le avec vos amis et collègues.
            Cela nous encouragera à en créer d'autres !
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={shareOnTwitter}
              variant="outline"
              className="hover-scale bg-white/10"
            >
              <Twitter className="mr-2" />
              Twitter
            </Button>
            <Button
              onClick={shareOnLinkedIn}
              variant="outline"
              className="hover-scale bg-white/10"
            >
              <Linkedin className="mr-2" />
              LinkedIn
            </Button>
            <Button
              onClick={shareOnWhatsApp}
              variant="outline"
              className="hover-scale bg-white/10"
            >
              <MessageCircle className="mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Classement 🏆</h2>
          <ScrollArea className="h-[400px] rounded-lg">
            <div className="space-y-2 pr-4">
              {leaderboard.map((entry, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-4 rounded-lg transition-all duration-200 ${
                    index < 3 ? 'bg-white/20' : 'bg-white/10'
                  } hover:bg-white/30`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl w-8">{getPositionEmoji(index)}</span>
                    <span className="text-lg font-medium">{entry.pseudo}</span>
                  </div>
                  <span className="text-lg font-mono">{formatTime(entry.time)}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md text-center">
          <h2 className="text-2xl font-semibold">Restez connecté ! 🎮</h2>
          <p className="text-purple-200">
            Pour connaître la date de sortie du prochain Escape Game SEO, suivez-moi sur les réseaux sociaux !
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={() => window.open("https://x.com/BilalDestouches", "_blank")}
              variant="outline"
              className="hover-scale bg-white/10"
            >
              <Twitter className="mr-2" />
              Twitter
            </Button>
            <Button
              onClick={() => window.open("https://www.linkedin.com/in/sbdestouches/", "_blank")}
              variant="outline"
              className="hover-scale bg-white/10"
            >
              <Linkedin className="mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
