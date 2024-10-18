"use client";
import React, { useState, useEffect } from "react";

const Clock = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // Default to 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState("Pomodoro");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(
      timerType === "Pomodoro" ? 1500 : timerType === "Short Break" ? 300 : 900
    ); // Set time based on type
  };

  const selectTimerType = (type: string) => {
    console.log("selectTimerType is clicked");
    console.log(type);
    setTimerType(type);
    resetTimer(); // Reset the timer whenever a new type is selected
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-100">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => selectTimerType("Pomodoro")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Pomodoro
        </button>
        <button
          onClick={() => selectTimerType("Short Break")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Short Break
        </button>
        <button
          onClick={() => selectTimerType("Long Break")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Long Break
        </button>
      </div>
      <div className="text-6xl font-bold mb-4 text-gray-800">
        {formatTime(timeLeft)}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-6 py-3 text-white font-semibold rounded-lg transition duration-300 
            ${
              isActive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Clock;
