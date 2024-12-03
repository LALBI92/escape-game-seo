import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin, MessageCircle } from "lucide-react";

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

  const leaderboard = [
    { pseudo: "Alice", time: 180 },
    { pseudo: "Bob", time: 240 },
    { pseudo: "Charlie", time: 300 },
  ];

  const shareText = "Je viens de terminer l'Escape Game SEO ! Un super défi technique, essayez-le vous aussi !";
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
      <div className="max-w-2xl mx-auto pt-20 space-y-12">
        <div className="text-center space-y-6 fade-in">
          <h1 className="text-4xl font-bold">Félicitations !</h1>
          <p className="text-2xl text-purple-200">
            Votre temps : {formatTime(finalTime)}
          </p>
        </div>
        
        <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Classement</h2>
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-4 glass-card rounded-lg hover-scale"
              >
                <span className="text-lg">{entry.pseudo}</span>
                <span className="text-lg">{formatTime(entry.time)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md text-center">
          <h2 className="text-2xl font-semibold">Partagez votre expérience !</h2>
          <p className="text-purple-200">
            Si vous avez aimé cet escape game, partagez-le avec vos amis et collègues.
            Cela nous encouragera à en créer d'autres !
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
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
      </div>
    </div>
  );
};

export default Leaderboard;