import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [finalTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [leaderboardData, setLeaderboardData] = useState<{ pseudo: string; time: number }[]>([]);
  const [participantPosition, setParticipantPosition] = useState(0);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('participants')
        .select('pseudo, time_seconds')
        .gt('time_seconds', 0)
        .order('time_seconds', { ascending: true });

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      setLeaderboardData(data.map(entry => ({
        pseudo: entry.pseudo,
        time: entry.time_seconds
      })));

      // Calculate participant position
      if (finalTime > 0) {
        const position = data.findIndex(entry => finalTime <= entry.time_seconds) + 1;
        setParticipantPosition(position === 0 ? data.length + 1 : position);
      }
    };

    fetchLeaderboard();
  }, [finalTime]);

  useEffect(() => {
    const updatePlayerTime = async () => {
      const player = localStorage.getItem("player");
      if (!player || !finalTime) return;

      const { email } = JSON.parse(player);
      
      try {
        const { error } = await supabase
          .from('participants')
          .update({ time_seconds: finalTime })
          .eq('email', email);

        if (error) {
          console.error('Error updating time:', error);
          toast.error("Erreur lors de la sauvegarde du score");
          return;
        }

        console.log('Time updated successfully:', finalTime);
        toast.success("Score sauvegardé !");
      } catch (error) {
        console.error('Error:', error);
        toast.error("Erreur lors de la sauvegarde du score");
      }
    };

    updatePlayerTime();
  }, [finalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
              {leaderboardData.map((entry, index) => (
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
      </div>
    </div>
  );
};

export default Leaderboard;
