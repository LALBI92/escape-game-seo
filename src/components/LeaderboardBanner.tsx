import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const LeaderboardBanner = () => {
  const [position, setPosition] = useState(0);
  const [leaderboard, setLeaderboard] = useState<{ position: string; name: string; time: string }[]>([]);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('participants')
        .select('pseudo, time_seconds')
        .order('time_seconds', { ascending: true })
        .limit(5);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      const formattedData = data.map((player, index) => ({
        position: `${index + 1}${index === 0 ? 'er' : 'ème'}`,
        name: player.pseudo,
        time: formatTime(player.time_seconds)
      }));

      setLeaderboard(formattedData);
    };

    fetchLeaderboard();
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const content = leaderboard.map(player => 
    `${player.position} : ${player.name} en ${player.time}`
  ).join(" • ");

  useEffect(() => {
    const animation = setInterval(() => {
      setPosition(prev => (prev - 1) % (content.length * 20));
    }, 50);

    return () => clearInterval(animation);
  }, [content.length]);

  return (
    <div className="mt-8 w-full bg-amber-400 text-gray-900 py-3 overflow-hidden font-medium">
      <div 
        className="whitespace-nowrap text-lg"
        style={{ 
          transform: `translateX(${position}px)`,
          display: "inline-block"
        }}
      >
        {content + " " + content} {/* Duplicate content for seamless loop */}
      </div>
    </div>
  );
};

export default LeaderboardBanner;