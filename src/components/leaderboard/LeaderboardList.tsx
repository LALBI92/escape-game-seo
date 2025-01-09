import { ScrollArea } from "@/components/ui/scroll-area";

interface LeaderboardListProps {
  leaderboardData: Array<{
    pseudo: string;
    time: number;
  }>;
  formatTime: (seconds: number) => string;
}

const LeaderboardList = ({ leaderboardData, formatTime }: LeaderboardListProps) => {
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

  return (
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
  );
};

export default LeaderboardList;