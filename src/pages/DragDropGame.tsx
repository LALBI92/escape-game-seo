import { useNavigate } from "react-router-dom";
import { DragAndDrop } from "@/components/DragAndDrop";
import { useGameTimer } from "@/hooks/useGameTimer";

const DragDropGame = () => {
  const navigate = useNavigate();
  const time = useGameTimer();

  useEffect(() => {
    const player = localStorage.getItem("player");
    if (!player) {
      navigate("/");
      return;
    }
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