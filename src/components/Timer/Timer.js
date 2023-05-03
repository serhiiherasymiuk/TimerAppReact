import { useState, useRef } from 'react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleInputChange = (event) => {
    setSeconds(parseInt(event.target.value));
  };

  const handleStartClick = () => {
    if (seconds > 0 && !isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
  };

  const handlePauseClick = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleStopClick = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setSeconds(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Timer</h1>
      <div>
        <label htmlFor="seconds">Seconds:</label>
        <input type="number" id="seconds" value={seconds} onChange={handleInputChange} />
      </div>
      <div>
        <button onClick={handleStartClick} disabled={isRunning}>
          Start
        </button>
        <button onClick={handlePauseClick} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleStopClick} disabled={!isRunning && seconds === 0}>
          Stop
        </button>
      </div>
      <p>{formatTime(seconds)}</p>
    </div>
  );
}
