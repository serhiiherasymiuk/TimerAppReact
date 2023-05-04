import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './Timer.css';

export function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { hours, minutes, seconds } = data;
    setTime(hours * 3600000 + minutes * 60000 + seconds * 1000);
  };

  const handleStartClick = () => {
    if (time > 0 && !isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime == 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return prevTime;
          }
          return prevTime - 10;
        });
      }, 10);
    }
  };

  const handlePauseClick = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleStopClick = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 1000) / 10;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="Timer">
      <h1>Timer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-container'>
          <input type="number" {...register('hours', { min: 0 })} placeholder="Hours" />
          <p>:</p>
          <input type="number" {...register('minutes', { min: 0, max: 59 })} placeholder="Minutes" />
          <p>:</p>
          <input type="number" {...register('seconds', { min: 0, max: 59 })} placeholder="Seconds" />
        </div>
        <button>Set Time</button>
      </form>
      <div className='buttons'>
        <button onClick={handleStartClick} disabled={isRunning}>
          Start
        </button>
        <button onClick={handlePauseClick} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleStopClick} disabled={!isRunning && time === 0}>
          Stop
        </button>
      </div>
      <p>{formatTime(time)}</p>
    </div>
  );
}
