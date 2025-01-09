import { useState, useEffect } from "react";

export const useGameTimer = () => {
  const [time, setTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  useEffect(() => {
    const startTime = sessionStorage.getItem("startTime");
    if (!startTime) return;

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - parseInt(startTime)) / 1000);
      setTime(elapsedTime);
      sessionStorage.setItem("gameTime", elapsedTime.toString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return time;
};