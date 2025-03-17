
import { useEffect, useState } from "react";
import { supabase, testSupabaseConnection } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const LeaderboardBanner = () => {
  const [position, setPosition] = useState(0);
  const [leaderboard, setLeaderboard] = useState<{ position: string; name: string; time: string; emoji: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'failed'>('checking');
  
  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      // Test connection first
      const connectionTest = await testSupabaseConnection();
      if (!connectionTest.success) {
        console.error('Database connection failed before fetching leaderboard');
        setConnectionStatus('failed');
        setIsLoading(false);
        return;
      }
      
      setConnectionStatus('connected');
      
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
    } catch (error) {
      console.error('Error:', error);
      setConnectionStatus('failed');
    } finally {
      setIsLoading(false);
    }
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
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  let content = '';
  
  if (isLoading) {
    content = "Chargement du classement...";
  } else if (connectionStatus === 'failed') {
    content = "Impossible de se connecter à la base de données. Veuillez réessayer plus tard. ⚠️";
  } else if (leaderboard.length > 0) {
    content = leaderboard.map(player => 
      `${player.emoji} ${player.position} ${player.name} en ${player.time} ✨`
    ).join(" ");
  } else {
    content = "Participez pour apparaître dans le classement! ✨";
  }

  useEffect(() => {
    const animation = setInterval(() => {
      setPosition(prev => {
        // Reset position when it reaches the negative of content width
        if (prev <= -1000) {
          return window.innerWidth;
        }
        return prev - 1;
      });
    }, 20);

    return () => clearInterval(animation);
  }, []);

  return (
    <div className="w-full bg-amber-400 text-gray-900 py-3 overflow-hidden font-medium">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Skeleton className="h-6 w-3/4 bg-amber-300/50" />
        </div>
      ) : (
        <div 
          className="whitespace-nowrap text-lg"
          style={{ 
            transform: `translateX(${position}px)`,
            transition: 'transform 0.1s linear'
          }}
        >
          {content + " " + content} {/* Duplicate content for seamless loop */}
        </div>
      )}
    </div>
  );
};

export default LeaderboardBanner;
