import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface WordSection {
  id: number;
  word: string;
  hint: string;
  length: number;
  isCompleted: boolean;
}

const WordGame = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [allCompleted, setAllCompleted] = useState(false);

  const sections: WordSection[] = [
    {
      id: 1,
      word: "92",
      hint: "Je suis souvent cité dans les discussions sur l'abondance. On dit que mes voisins regardent en silence les grandes tours. Pour certains, je suis un territoire d'opportunités, mais pour d'autres, je suis un simple duo de chiffres.",
      length: 2,
      isCompleted: answers[0] === "92"
    },
    {
      id: 2,
      word: "robots.txt",
      hint: "Invisible mais essentiel, je guide les voyageurs du web comme un panneau indicateur à l'entrée d'un village. Sans moi, certains chemins restent fermés, tandis que d'autres s'ouvrent sur l'infini.",
      length: 10,
      isCompleted: answers[1] === "robots.txt"
    },
    {
      id: 3,
      word: "canonical",
      hint: "Dans un univers où les chemins se multiplient, je suis la boussole qui pointe vers l'unique direction. Je suis le guide pour ne pas se perdre dans un labyrinthe de doublons.",
      length: 9,
      isCompleted: answers[2] === "canonical"
    }
  ];

  useEffect(() => {
    const completed = answers.every((answer, index) => 
      answer === sections[index].word
    );
    setAllCompleted(completed);
  }, [answers]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    if (value === sections[index].word) {
      toast.success("Bonne réponse !");
    }
  };

  const renderDashes = (length: number) => {
    return Array(length).fill("_").join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-purple-900">
          Jeu du Mot Mystère
        </h1>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={section.id} className="p-6 glass-card animate-fade-up">
              <div className="space-y-4">
                <p className="text-gray-700 italic">{section.hint}</p>
                
                <div className="font-mono text-lg text-gray-500 mb-2">
                  {renderDashes(section.length)}
                </div>

                <Input
                  type="text"
                  placeholder="Votre réponse..."
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="w-full transition-all duration-300 hover:shadow-md"
                  disabled={index > 0 && !sections[index - 1].isCompleted}
                />

                {section.isCompleted && (
                  <p className="text-green-600 font-medium animate-fade-in">
                    Correct ! ✨
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {allCompleted && (
          <div className="text-center animate-fade-up">
            <Button 
              onClick={() => navigate("/success")}
              className="neo-button bg-purple-600 hover:bg-purple-700 text-white"
            >
              Continuer l'aventure
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordGame;