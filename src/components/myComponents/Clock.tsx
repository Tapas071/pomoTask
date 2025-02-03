"use client";
import React, { useState, useEffect } from "react";

const Clock = () => {
  const [timeLeft, setTimeLeft] = useState<number>(1500); // Default to 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState("Pomodoro");
  const [pomodoroTime, setPomodoroTime] = useState<number>();
  const [shortBreakTime, setShortBreakTime] = useState<number>();
  const [longBreakTime, setLongBreakTime] = useState<number>();

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const timeTypeTimer = (timerType: string): number => {
    if (timerType === "Pomodoro") {
      return pomodoroTime ?? 1500;
    } else if (timerType === "Short Break") {
      return shortBreakTime ?? 300;
    } else {
      return longBreakTime ?? 900;
    }
  };

  useEffect(() => {
    setPomodoroTime(1500);
    setShortBreakTime(300);
    setLongBreakTime(900);
  }, []);

  useEffect(() => {
    document.title = `${formatTime(timeLeft)} : ${timerType}:`;

    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      pauseAudio();
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval!);
      pauseAudio();
    } else if (timeLeft === 0 && audioRef.current) {
      playAudio();
    }

    return () => clearInterval(interval!);
  }, [isActive, timeLeft, timerType]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(timeTypeTimer(timerType));
  };

  const selectTimerType = (type: string) => {
    setTimerType(type);
    resetTimer();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => selectTimerType("Pomodoro")}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            timerType === "Pomodoro"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => selectTimerType("Short Break")}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            timerType === "Short Break"
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => selectTimerType("Long Break")}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            timerType === "Long Break"
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Long Break
        </button>
      </div>
      <div className="text-6xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        {formatTime(timeLeft)}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-6 py-3 font-semibold rounded-lg transition duration-300 ${
            isActive
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Audio element */}
      <audio ref={audioRef}>
        <source src="/assets/audios/expire.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Clock;
