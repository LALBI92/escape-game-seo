export const playSuccessSound = () => {
  const audio = new Audio('/success.mp3');
  audio.volume = 0.5; // Réduire le volume à 50%
  audio.play().catch(error => {
    console.log('Erreur lors de la lecture du son:', error);
  });
};

export const playUnlockSound = () => {
  const audio = new Audio('/unlock.mp3');
  audio.volume = 0.5;
  audio.play().catch(error => {
    console.log('Erreur lors de la lecture du son:', error);
  });
};