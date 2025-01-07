import { useNavigate } from "react-router-dom";
import { DragAndDrop } from "@/components/DragAndDrop";
import { useEffect, useState } from "react";

const DragDropGame = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  useEffect(() => {
    const player = localStorage.getItem("player");
    if (!player) {
      navigate("/");
      return;
    }

    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;
        sessionStorage.setItem("gameTime", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleSuccess = () => {
    navigate("/journal");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-right text-xl font-mono">
          {Math.floor(time / 60)
            .toString()
            .padStart(2, "0")}
          :{(time % 60).toString().padStart(2, "0")}
        </div>
        <DragAndDrop onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default DragDropGame;