import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useGameTimer } from "@/hooks/useGameTimer";
import { playSuccessSound } from "@/utils/sounds";

interface WordSection {
  id: number;
  word: string;
  hint: string;
  length: number;
  isCompleted: boolean;
}

const WordGame = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>([""]); 
  const [allCompleted, setAllCompleted] = useState(false);
  const time = useGameTimer();

  const sections: WordSection[] = [
    {
      id: 1,
      word: "larry",
      hint: "👥 Je suis le prénom de l'un des créateurs de Google, Et mon nom est caché dans l'algorithme qui classe les pages web. Sans moi, le PageRank n'existerait pas. Qui suis-je ?",
      length: 5,
      isCompleted: answers[0] === "larry"
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
    newAnswers[index] = value.toLowerCase();
    setAnswers(newAnswers);

    if (value.toLowerCase() === sections[index].word) {
      playSuccessSound();
      toast.success("Bonne réponse !");
    } else if (value.length === sections[index].length && value.toLowerCase() !== sections[index].word) {
      toast.error("Mauvaise réponse, essayez encore !");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderAnswer = (answer: string, length: number) => {
    const chars = answer.split('');
    return (
      <div className="flex gap-2 justify-center font-mono text-xl">
        {Array(length).fill('_').map((_, index) => (
          <span
            key={index}
            className={`w-6 h-8 flex items-center justify-center border-b-2 border-gray-400 transition-all duration-300 ${
              chars[index] ? 'text-purple-600 border-purple-600' : 'text-transparent'
            }`}
          >
            {chars[index] || '_'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-purple-800">
            {formatTime(time)}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.id}>
              <Card className="p-6 glass-card animate-fade-up">
                <div className="space-y-4">
                  <p className="text-gray-700 italic">{section.hint}</p>
                  {renderAnswer(answers[index], section.length)}

                  <Input
                    type="text"
                    placeholder="Votre réponse..."
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-full transition-all duration-300 hover:shadow-md mt-4"
                    maxLength={section.length}
                  />

                  {section.isCompleted && (
                    <p className="text-green-600 font-medium animate-fade-in">
                      Correct ! ✨
                    </p>
                  )}
                </div>
              </Card>
              {index === 0 && (
                <div className="text-center space-y-4 animate-fade-up mt-12">
                  <p className="text-4xl font-bold text-black">
                    ⏰ 1703385600
                  </p>
                  <p className="text-4xl font-bold text-black">
                    📍 45.957506, 6.848237
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {allCompleted && (
          <div className="text-center animate-fade-up">
            <Button 
              onClick={() => navigate("/success")}
              className="neo-button bg-purple-600 hover:bg-purple-700 text-black font-semibold text-lg"
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