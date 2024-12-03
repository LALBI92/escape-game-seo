import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  // Exemple de classement statique pour le moment
  const leaderboard = [
    { pseudo: "Alice", time: 180 },
    { pseudo: "Bob", time: 240 },
    { pseudo: "Charlie", time: 300 },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-md mx-auto pt-20">
        <h1 className="text-2xl mb-8">Félicitations !</h1>
        <p className="text-xl mb-12">Votre temps : {formatTime(finalTime)}</p>
        
        <div className="space-y-4">
          <h2 className="text-xl mb-4">Classement</h2>
          {leaderboard.map((entry, index) => (
            <div key={index} className="flex justify-between items-center p-4 glass-card">
              <span>{entry.pseudo}</span>
              <span>{formatTime(entry.time)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;