import { useEffect, useState } from "react";

const LeaderboardBanner = () => {
  const [position, setPosition] = useState(0);
  
  // Données de classement avec positions
  const leaderboard = [
    { position: "1er", name: "Eva", time: "03:45" },
    { position: "2ème", name: "Bob", time: "04:32" },
    { position: "3ème", name: "Charlie", time: "05:10" },
    { position: "4ème", name: "David", time: "05:45" },
    { position: "5ème", name: "Alice", time: "06:15" },
  ];

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
    <div className="w-full bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-3 overflow-hidden font-medium mt-4">
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