import { useEffect, useState } from "react";

const LeaderboardBanner = () => {
  const [position, setPosition] = useState(0);
  
  // Exemple de données de classement
  const leaderboard = [
    { name: "Alice", time: "02:15" },
    { name: "Bob", time: "02:45" },
    { name: "Charlie", time: "03:10" },
    { name: "David", time: "03:30" },
    { name: "Eva", time: "03:45" },
  ];

  const content = leaderboard.map(player => 
    `${player.name}: ${player.time}`
  ).join(" • ");

  useEffect(() => {
    const animation = setInterval(() => {
      setPosition(prev => (prev - 1) % (content.length * 20));
    }, 50);

    return () => clearInterval(animation);
  }, [content.length]);

  return (
    <div className="w-full bg-gradient-to-r from-purple-900 to-purple-700 text-white py-2 overflow-hidden">
      <div 
        className="whitespace-nowrap"
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