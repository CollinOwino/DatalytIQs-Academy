'use client';

import { useEffect, useState } from 'react';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = new Date(targetDate).getTime() - new Date().getTime();
      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft('Session is Live!');
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return <p>Countdown: {timeLeft}</p>;
}
