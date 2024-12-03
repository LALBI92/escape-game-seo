import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Success = () => {
  const navigate = useNavigate();
  const [letters, setLetters] = useState(["", "", ""]);

  const handleLetterChange = (index: number, value: string) => {
    const newLetters = [...letters];
    newLetters[index] = value.toUpperCase();
    setLetters(newLetters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = letters.join("");
    if (code === "PBN") {
      navigate("/leaderboard");
    }
  };

  const allLettersFilled = letters.every(letter => letter !== "");

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="pt-20">
          <p className="text-center mb-12 text-2xl">Quelqu'un peut allumer la lumière ?</p>
          <p className="text-center mb-12 text-black">Souvent délaissé par facilité ou manque de temps, il est à notre sens indispensable et très efficace</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center gap-4">
              {letters.map((letter, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={letter}
                  onChange={(e) => handleLetterChange(index, e.target.value)}
                  className="w-16 h-16 text-center text-2xl text-white bg-black border-black focus:border-black focus-visible:ring-0 focus:outline-none cursor-default focus:ring-0 ring-0 focus:ring-offset-0"
                />
              ))}
            </div>
            
            {allLettersFilled && (
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
              >
                Valider le mot secret
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Success;