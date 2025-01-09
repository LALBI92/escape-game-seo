import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const LeaderboardBanner = () => {
  const [position, setPosition] = useState(0);
  const [leaderboard, setLeaderboard] = useState<{ position: string; name: string; time: string }[]>([]);
  
  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('participants')
      .select('pseudo, time_seconds')
      .gt('time_seconds', 0)
      .order('time_seconds', { ascending: true })
      .limit(3);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return;
    }

    console.log('Leaderboard data:', data);

    const positions = [
      { label: 'Meilleur score', emoji: '🏆' },
      { label: 'Second', emoji: '🥈' },
      { label: 'Troisième', emoji: '🥉' }
    ];
    
    const formattedData = data.map((player, index) => ({
      position: positions[index].label,
      name: player.pseudo,
      time: formatTime(player.time_seconds),
      emoji: positions[index].emoji
    }));

    setLeaderboard(formattedData);
  };

  useEffect(() => {
    // Initial fetch
    fetchLeaderboard();
    
    // Subscribe to realtime changes
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
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const content = leaderboard.map(player => 
    `${player.emoji} ${player.position} ${player.name} en ${player.time} ✨`
  ).join(" ");

  useEffect(() => {
    const animation = setInterval(() => {
      setPosition(prev => (prev - 1) % (content.length * 20));
    }, 50);

    return () => clearInterval(animation);
  }, [content.length]);

  return (
    <div className="w-full bg-amber-400 text-gray-900 py-3 overflow-hidden font-medium">
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