import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useGameTimer } from "@/hooks/useGameTimer";

const Journal = () => {
  const navigate = useNavigate();
  const time = useGameTimer();

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
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Samedi 17 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Nous sommes bien arrivés au Bootcamp, les participants sont tous sympas, ce soir nous allons au restaurant pour faire connaissance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Dimanche 18 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Premier atelier ce matin, je trouve le niveau pas ouf. J&apos;ai l&apos;impression que beaucoup de participants découvrent le SEO (profil ancien dropshipper qui n&apos;a pas réussi), bon je parle peut-être trop vite, attendons les autres ateliers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Lundi 19 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Bon les ateliers d&apos;hier n&apos;étaient pas ouf, mais les ateliers du jour s&apos;annoncent beaucoup mieux. Mais un truc bizarre, je viens de me rendre compte que tous les participants sont de la même agence SEO...
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Mardi 20 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Aujourd&apos;hui je me suis pris la tête avec John. Je ne comprends pas, on dirait un team building d&apos;une agence dans laquelle on m&apos;a convié. Tous les participants sont de la même agence et John est le directeur de l&apos;agence...
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Mercredi 21 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Depuis hier tout le monde se montre insistant par rapport à ma dernière publication sur Twitter. Ils me demandent comment je fais et si je peux leur expliquer... On dirait que c&apos;est de moi qu&apos;ils attendent une formation. C&apos;est à n&apos;y rien comprendre.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Jeudi 22 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Aujourd&apos;hui alors qu&apos;on était au chalet d&apos;altitude, ils ont continué à me questionner sur ma méthode SEO secrète. Je les ai sentis agacés quand j&apos;ai refusé de répondre.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Vendredi 23 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Il l&apos;a fait exprès j&apos;en suis sûr, John a essayé de me pousser alors qu&apos;on marchait près d&apos;un précipice. Heureusement qu&apos;un touriste hollandais m&apos;a attrapé par le bras sinon je pense que c&apos;en était fini de moi. Je vais voir pour prendre un train demain. Mais un 24 décembre, je ne sais pas si je pourrai.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Vendredi 23 décembre - Minuit</h3>
              <p className="text-gray-700 leading-relaxed">
                J&apos;ai trouvé un train pour demain matin, il faut que je file. Sur le Drive du Bootcamp j&apos;ai réussi à rentrer dans un fichier verrouillé... Ça sent pas bon pour moi, je savais que ce n&apos;était pas une erreur.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/drive")}
            className="neo-button"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Journal;