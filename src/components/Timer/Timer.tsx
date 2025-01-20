import { useEffect, useState } from "react";
import "./Timer.css";

export interface TimerProps {
  startTime?: number;
}

export const Timer = ({ startTime = 0 }: TimerProps) => {
  const [time, setTime] = useState(startTime);
  const [timeDisplay, setTimeDisplay] = useState("0:00");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    function formatTime(seconds: number) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      const pad = (num: number) => String(num).padStart(2, "0");

      if (hours) {
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
      } else {
        return `${pad(minutes)}:${pad(secs)}`;
      }
    }

    setTimeDisplay(formatTime(time));

    return () => {
      clearTimeout(timer);
    };
  }, [time]);
  return <div className="timer">{timeDisplay}</div>;
};
