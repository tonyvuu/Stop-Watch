import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const StopWatch = () => {
  const [lapse, setLapse] = useState(0);
  const [running, setRunning] = useState(false);
  let intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleClearClick = () => {
    clearInterval(intervalRef.current);
    setLapse(0);
    setRunning(false);
  };

  const handleRunClick = () => {
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      let startTime = Date.now() - lapse;
      intervalRef.current = setInterval(() => {
        setLapse(Date.now() - startTime);
      }, 0);
    }
    setRunning(!running);
  };

  const convertToTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    const milliseconds = ms % 1000;

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedMilliseconds = milliseconds < 10 ? `00${milliseconds}` : milliseconds < 100 ? `0${milliseconds}` : `${milliseconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };

  return (
    <div>
      <div>
        <h1>STOP</h1>
        <h1 style={{ color: 'red' }}>WATCH</h1>
      </div>
      <h1 className='timer'>{convertToTime(lapse)}</h1>
      <button className='stop' style={{ fontWeight: 'bolder' }} onClick={handleRunClick}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleClearClick}>Clear</button>
    </div>
  );
};

export default StopWatch;
