import { useState } from 'react';
import { Button } from './ui/button';

interface DragAndDropProps {
  onSuccess: () => void;
}

export const DragAndDrop = ({ onSuccess }: DragAndDropProps) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isCorrect, setIsCorrect] = useState(false);

  const animals = [
    { id: 'panda', year: '2011', image: '/lovable-uploads/dd69357d-a560-48d6-b92f-e97e4190c6b8.png' },
    { id: 'pingouin', year: '2012', image: '/lovable-uploads/a26da636-b58c-484a-bf9b-79451c664172.png' },
    { id: 'colibri', year: '2013', image: '/lovable-uploads/56433f57-00aa-4215-b868-cf92442ca7dd.png' },
    { id: 'pigeon', year: '2014', image: '/lovable-uploads/bd754ad3-6ce4-4d8a-9756-0f552f91bce1.png' }
  ];

  const handleDragStart = (e: React.DragEvent, imageId: string) => {
    e.dataTransfer.setData('imageId', imageId);
  };

  const handleDrop = (e: React.DragEvent, year: string) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData('imageId');
    
    setMatches(prev => ({
      ...prev,
      [imageId]: year
    }));

    const newMatches = {
      ...matches,
      [imageId]: year
    };

    const allCorrect = animals.every(animal => 
      newMatches[animal.id] === animal.year
    );

    setIsCorrect(allCorrect);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getMatchedImage = (year: string) => {
    const matchedAnimal = animals.find(animal => 
      Object.entries(matches).some(([id, matchYear]) => 
        id === animal.id && matchYear === year
      )
    );
    return matchedAnimal?.image;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-4">
          {animals.map((animal) => (
            <div
              key={animal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, animal.id)}
              className="aspect-square bg-white rounded-lg shadow-md overflow-hidden cursor-move hover:shadow-lg transition-shadow"
            >
              <img
                src={animal.image}
                alt={animal.id}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {animals.map((animal) => {
            const matchedImage = getMatchedImage(animal.year);
            return (
              <div
                key={animal.year}
                onDrop={(e) => handleDrop(e, animal.year)}
                onDragOver={handleDragOver}
                className={`aspect-square border-2 ${
                  isCorrect ? 'border-green-500 bg-green-50' : 'border-dashed border-gray-300'
                } rounded-lg overflow-hidden transition-colors relative`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl font-bold bg-white bg-opacity-80 z-10">
                  {animal.year}
                </div>
                {matchedImage && (
                  <img
                    src={matchedImage}
                    alt="matched"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onSuccess}
          disabled={!isCorrect}
          className={`transition-all ${
            isCorrect ? 'animate-fade-in' : 'opacity-50'
          }`}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};