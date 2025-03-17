
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ShareButtons from "@/components/leaderboard/ShareButtons";
import SocialLinks from "@/components/leaderboard/SocialLinks";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";

const Leaderboard = () => {
  const [finalTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [leaderboardData, setLeaderboardData] = useState<{ pseudo: string; time: number }[]>([]);
  const [participantPosition, setParticipantPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeaderboard = async () => {
    console.log('Fetching leaderboard data...');
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('pseudo, time_seconds')
        .gt('time_seconds', 0)
        .order('time_seconds', { ascending: true });

      if (error) {
        console.error('Error fetching leaderboard:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Erreur lors du chargement du classement",
          duration: 5000,
        });
        return;
      }

      console.log('Fetched data:', data);

      setLeaderboardData(data.map(entry => ({
        pseudo: entry.pseudo,
        time: entry.time_seconds
      })));

      if (finalTime > 0) {
        const position = data.findIndex(entry => finalTime <= entry.time_seconds) + 1;
        setParticipantPosition(position === 0 ? data.length + 1 : position);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors du chargement du classement",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    
    const channel = supabase
      .channel('leaderboard_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'participants'
        },
        () => {
          console.log('Received realtime update, fetching new data...');
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [finalTime]);

  useEffect(() => {
    const updatePlayerTime = async () => {
      const player = localStorage.getItem("player");
      if (!player || !finalTime) return;

      try {
        const { email } = JSON.parse(player);
        
        console.log('Updating player time:', { email, finalTime });
        
        const { error } = await supabase
          .from('participants')
          .update({ time_seconds: finalTime })
          .eq('email', email);

        if (error) {
          console.error('Error updating time:', error);
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Erreur lors de la sauvegarde du score",
            duration: 5000,
          });
          return;
        }

        console.log('Time updated successfully:', finalTime);
        toast({
          title: "Succès",
          description: "Score sauvegardé !",
          duration: 5000,
        });
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Erreur lors de la sauvegarde du score",
          duration: 5000,
        });
      }
    };

    updatePlayerTime();
  }, [finalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getOrdinalNumber = (n: number) => {
    return n + (n === 1 ? "er" : "ème");
  };

  const shareText = `Je suis arrivé ${getOrdinalNumber(participantPosition)} à "Crime au Bootcamp SEO". Si tu veux tenter de faire mieux : `;
  const shareUrl = window.location.origin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-4">
      <div className="max-w-2xl mx-auto pt-20 space-y-8">
        <div className="text-center space-y-6 animate-fade-up">
          <h1 className="text-4xl font-bold">Félicitations ! 🎉</h1>
          <p className="text-2xl text-purple-200">
            Votre temps : {formatTime(finalTime)}
          </p>
          <p className="text-xl text-amber-400 font-semibold">
            Vous êtes {getOrdinalNumber(participantPosition)} {participantPosition <= 3 ? ["🥇", "🥈", "🥉"][participantPosition - 1] : "🎮"}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md text-center">
          <h2 className="text-2xl font-semibold">Restez connecté ! 🎮</h2>
          <p className="text-purple-200">
            Pour connaître la date de sortie du prochain Escape Game SEO, suivez-moi sur les réseaux sociaux !
          </p>
          <SocialLinks />
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md text-center">
          <h2 className="text-2xl font-semibold">Partagez votre expérience ! 🌟</h2>
          <p className="text-purple-200">
            Si vous avez aimé cet escape game, partagez-le avec vos amis et collègues.
            Cela nous encouragera à en créer d'autres !
          </p>
          <ShareButtons shareText={shareText} shareUrl={shareUrl} />
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Classement 🏆</h2>
          {isLoading ? (
            <p className="text-center">Chargement du classement...</p>
          ) : (
            <LeaderboardList 
              leaderboardData={leaderboardData}
              formatTime={formatTime}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
