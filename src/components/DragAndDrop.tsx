import { useState } from 'react';

interface DragAndDropProps {
  onSuccess: () => void;
}

export const DragAndDrop = ({ onSuccess }: DragAndDropProps) => {
  const [matches, setMatches] = useState<Record<string, string>>({});

  const handleDragStart = (e: React.DragEvent, imageId: string) => {
    e.dataTransfer.setData('imageId', imageId);
  };

  const handleDrop = (e: React.DragEvent, date: string) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData('imageId');
    
    setMatches(prev => ({
      ...prev,
      [imageId]: date
    }));

    // Vérifier si toutes les correspondances sont correctes
    const correctMatches = {
      'image1': '2021',
      'image2': '2018',
      'image3': '1998',
      'image4': '2005'
    };

    if (Object.entries(matches).every(([key, value]) => correctMatches[key as keyof typeof correctMatches] === value)) {
      onSuccess();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* ... Le contenu sera ajouté dans la prochaine itération */}
    </div>
  );
};