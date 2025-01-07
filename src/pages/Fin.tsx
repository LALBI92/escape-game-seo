import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Fin = () => {
  const navigate = useNavigate();
  const [time] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  // Arrêter le chrono quand on arrive sur cette page
  useEffect(() => {
    const player = localStorage.getItem("player");
    if (!player) {
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-right text-xl font-mono">
          {Math.floor(time / 60)
            .toString()
            .padStart(2, "0")}
          :{(time % 60).toString().padStart(2, "0")}
        </div>
        
        <Card className="p-8 bg-[#fff9e6] shadow-lg transform rotate-[-0.5deg]">
          <div className="space-y-8 font-handwriting">
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-6">
                Je vais te révéler mon secret pour ranker en SEO en 2025. Beaucoup de personne m&apos;harcèlent depuis que j&apos;ai fais la publication twitter ou j&apos;ai expliqué que j&apos;avais craqué l&apos;algorithme de Google à 92% (j&apos;ai même reçu des menaces de morts lol) je vais ici te révéler mon secret.
              </p>
              <p className="mb-6">
                Alors bien sur maintenant tout le monde sait depuis les leak Google que le comportement des utilisateurs est importants, je vais donc continuer d&apos;envoyer du trafic sur mes pages. Egalement pour ma part je travaille toujours pour mes clients avec des réseaux de site privé. C&apos;est plus stable, je fais des sites thématisés avec des liens home page. Marre des backlinks qui sautent et des pages pas indexées. Mais le vrai secret en 2025 pour ranker c&apos;est.....
              </p>
              <p className="blur-sm select-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod, voluptatum, voluptas quae voluptatem quibusdam voluptate quas quos quidem nesciunt. Quisquam, quae. Quisquam voluptates, quod, voluptatum, voluptas quae voluptatem quibusdam voluptate quas quos quidem nesciunt. Quisquam, quae.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate("/leaderboard")}
            className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Finir l&apos;enquête
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Fin;