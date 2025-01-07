import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Journal = () => {
  const navigate = useNavigate();

  const handleFinishInvestigation = () => {
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold font-handwriting">Journal de Steve</h1>
            
            <div className="space-y-4 text-gray-800 font-handwriting">
              <p>
                Je vais te révéler mon secret pour ranker en SEO en 2025. Beaucoup de personne m'harcèlent depuis que j'ai fais la publication twitter où j'ai expliqué que j'avais craqué l'algorithme de Google à 92% (j'ai même reçu des menaces de morts lol) je vais ici te révéler mon secret.
              </p>
              
              <p>
                Alors bien sur maintenant tout le monde sait depuis les leak Google que le comportement des utilisateurs est importants, je vais donc continuer d'envoyer du trafic sur mes pages. Egalement pour ma part je travaille toujours pour mes clients avec des réseaux de site privé. C'est plus stable, je fais des sites thématisés avec des liens home page. Marre des backlinks qui sautent et des pages pas indexées. Mais le vrai secret en 2025 pour ranker c'est.....
              </p>

              <p className="blur-sm select-none hover:blur-sm">
                [CONTENU ILLISIBLE]
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                voluptates, quod, voluptatum, quae voluptatibus quibusdam
                voluptatem quas quos quia quidem. Quasi, voluptatibus. Quisquam
                voluptates, quod, voluptatum, quae voluptatibus quibusdam.
              </p>
            </div>

            <div className="pt-6 text-center">
              <Button 
                onClick={handleFinishInvestigation}
                className="neo-button"
              >
                Finir l'enquête
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;