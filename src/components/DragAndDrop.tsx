import { useState } from 'react';
import { Button } from './ui/button';

interface DragAndDropProps {
  onSuccess: () => void;
}

export const DragAndDrop = ({ onSuccess }: DragAndDropProps) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isCorrect, setIsCorrect] = useState(false);

  const animals = [
    { id: 'panda', year: '2011', image: 'https://source.unsplash.com/random/?panda' },
    { id: 'pingouin', year: '2012', image: 'https://source.unsplash.com/random/?penguin' },
    { id: 'colibri', year: '2013', image: 'https://source.unsplash.com/random/?hummingbird' },
    { id: 'pigeon', year: '2014', image: 'https://source.unsplash.com/random/?pigeon' }
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

        <div className="grid gap-4">
          {animals.map((animal) => (
            <div
              key={animal.year}
              onDrop={(e) => handleDrop(e, animal.year)}
              onDragOver={handleDragOver}
              className={`h-24 border-2 ${
                isCorrect ? 'border-green-500 bg-green-50' : 'border-dashed border-gray-300'
              } rounded-lg p-2 flex items-center justify-center transition-colors`}
            >
              {animal.year}
            </div>
          ))}
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