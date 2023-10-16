import { useState } from 'react';
import useInterval from './useInterval';

export function UseIntervalExample() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

  return (
    <div>
      <h1> 1. useInterval example </h1>
      <div>
        delay: <input value={delay} onChange={event => setDelay(Number(event.target.value))} />
      </div>
      <h3>count: {count}</h3>
      <div>
        <button onClick={() => setIsRunning((isRunning) => !isRunning)}>{isRunning ? 'stop' : 'start'}</button>
      </div>
    </div>
  );
}