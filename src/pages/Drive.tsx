import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Drive = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [time, setTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("123")) {
      setShowPassword(true);
    }
  }, [location]);

  const handleNext = () => {
    if (password === "onlebutecampSEO") {
      navigate("/success");
    } else {
      toast({
        variant: "destructive",
        title: "Mot de passe incorrect",
        description: "Veuillez réessayer",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-6 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Drive du Bootcamp</h2>
            <div className="text-xl font-mono">{formatTime(time)}</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src="/lovable-uploads/6971d9cf-7125-42c0-ac36-3ddb1cc8bafc.png"
              alt="?123"
              className="object-contain w-full h-full"
            />
          </div>

          <div className="text-center space-y-4">
            {showPassword ? (
              <div className="p-4 bg-yellow-100 rounded-lg">
                <p className="text-lg font-semibold text-yellow-800">
                  mot de passe = onlebutecampSEO
                </p>
              </div>
            ) : null}
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleNext} className="w-full">
                Valider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drive;