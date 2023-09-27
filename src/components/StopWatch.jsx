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
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
  };

  return (
    <div>
        <div>
            <h1>STOP</h1><h1 style={{color: 'red'}}>WATCH</h1>
        </div>
      <h1 className='timer'>{convertToTime(lapse)}</h1>    
      <button className = 'stop' style={{fontWeight: 'bolder'}} onClick={handleRunClick}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={handleClearClick}>Clear</button>
    </div>
  );
};

export default StopWatch;
