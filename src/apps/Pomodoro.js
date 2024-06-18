import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({
  timeLeft,
  isWorking,
  timerActive,
  toggleTimer,
  resetTimer,
}) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="text-6xl font-bold text-center">
        {formatTime(timeLeft)}
      </div>
      <div className="text-lg mb-4">
        {isWorking ? "Work Session" : "Break Time"}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-lg ${
            timerActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white focus:outline-none`}
        >
          {timerActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700 focus:outline-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  isWorking: PropTypes.bool.isRequired,
  timerActive: PropTypes.bool.isRequired,
  toggleTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
};

const SettingsForm = ({
  workDuration,
  breakDuration,
  onWorkDurationChange,
  onBreakDurationChange,
}) => {
  return (
    <div className="mt-8 bg-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Work Duration (minutes)</label>
          <input
            type="number"
            value={workDuration}
            onChange={(e) => onWorkDurationChange(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2">Break Duration (minutes)</label>
          <input
            type="number"
            value={breakDuration}
            onChange={(e) => onBreakDurationChange(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

SettingsForm.propTypes = {
  workDuration: PropTypes.number.isRequired,
  breakDuration: PropTypes.number.isRequired,
  onWorkDurationChange: PropTypes.func.isRequired,
  onBreakDurationChange: PropTypes.func.isRequired,
};

function App() {
  const [workDuration, setWorkDuration] = useState(25 * 60); // 25 minutes in seconds
  const [breakDuration, setBreakDuration] = useState(5 * 60); // 5 minutes in seconds
  const [isWorking, setIsWorking] = useState(true); // true for work session, false for break session
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workDuration);

  useEffect(() => {
    setTimeLeft(workDuration);
  }, [workDuration]);

  const toggleTimer = () => {
    setTimerActive((prev) => !prev);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setIsWorking(true);
    setTimeLeft(workDuration);
  };

  const handleWorkDurationChange = (newDuration) => {
    setWorkDuration(newDuration * 60); // Convert minutes to seconds
  };

  const handleBreakDurationChange = (newDuration) => {
    setBreakDuration(newDuration * 60); // Convert minutes to seconds
  };

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsWorking((prev) => !prev);
      setTimeLeft(isWorking ? breakDuration : workDuration);
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, breakDuration, workDuration, isWorking]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Pomodoro Timer</h1>
        <CountdownTimer
          timeLeft={timeLeft}
          isWorking={isWorking}
          timerActive={timerActive}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
        />
        <SettingsForm
          workDuration={workDuration / 60}
          breakDuration={breakDuration / 60}
          onWorkDurationChange={handleWorkDurationChange}
          onBreakDurationChange={handleBreakDurationChange}
        />
      </div>
    </div>
  );
}

export default App;
