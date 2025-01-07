import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Success = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  useEffect(() => {
    const startTime = sessionStorage.getItem("startTime");
    if (!startTime) {
      navigate("/");
      return;
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - parseInt(startTime)) / 1000);
      setTime(elapsedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">Information importante</DialogTitle>
            <DialogDescription className="text-base pt-2 text-black">
              Sur le drive du Bootcamp nous avons également trouvé la liste des participants
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="max-w-4xl mx-auto text-center">
        <div className="text-2xl font-mono mb-8">{formatTime(time)}</div>
        <h1 className="text-4xl font-bold text-purple-800 mb-8">
          Félicitations !
        </h1>
        <p className="text-xl mb-8">
          Vous avez réussi à déchiffrer le message secret.
        </p>
        <Button
          onClick={() => navigate("/liste")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full font-semibold text-lg"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default Success;