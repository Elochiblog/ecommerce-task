import { useEffect, useState } from "react";

export function useCountdown(targetDate) {
  const [remaining, setRemaining] = useState(() => getTimeParts(targetDate));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getTimeParts(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return remaining;
}

function getTimeParts(targetDate) {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function pad(n) {
  return String(n).padStart(2, "0");
}
