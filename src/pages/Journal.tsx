import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const Journal = () => {
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
                Nous sommes bien arrivé au Bootcamp les participants sont tous sympa, ce soir nous allons au restaurant pour faire connaissance
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Dimanche 18 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Premier atelier ce matin, je trouve le niveau pas ouf. J&apos;ai l&apos;impression que beaucoup de participant découvre le SEO (profil ancien dropshipper qui a pas réussi), bon je parle peut être trop vite attendons les autres ateliers
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Lundi 19 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Bon les ateliers d&apos;hier était pas ouf, mais les ateliers du jour s&apos;annoncent beaucoup mieux. Mais un truc bizarre je viens de me rendre compte que tous les participants sont de la même agence SEO...
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Mardi 20 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Aujourd&apos;hui je me suis pris la tête avec John. Je ne comprend pas on dirait un team building d&apos;une agence dans laquelle on m&apos;a convié. Tous les participants sont de la même agence et John est le directeur de l&apos;agence...
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Mercredi 21 décembre</h3>
              <p className="text-gray-700 leading-relaxed">
                Depuis hier tout le monde se montre insistant par rapport à ma dernière publication sur twitter. Il me demande comment je fais et si je peux leur expliquer...ON dirait que c&apos;est de moi qu&apos;ils attendent une formation. C&apos;est à ni rien comprendre
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/message")}
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