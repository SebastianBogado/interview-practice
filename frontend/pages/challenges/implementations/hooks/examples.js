import { useState } from 'react';
import useInterval from './useInterval';
import useDebounce from './useDebounce';

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
      <h2> 1. useInterval example </h2>
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

export function UseDebounceExample() {
  const [state, setState] = useState('Typing stopped');
  const [val, setVal] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const [isDebounceReady, cancelDebounce] = useDebounce(
    () => {
      setState('Typing stopped');
      setDebouncedValue(val);
    },
    2000,
    [val]
  );

  return (
    <div>
      <h2> 2. useDebounce example </h2>
      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState('Waiting for typing to stop...');
          setVal(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <div>
        Debounced value: {debouncedValue} <br />
        <button onClick={() => {
          if (isDebounceReady() === false) {
            cancelDebounce();
            setState('Debounce cancelled');
          }
        }}>Cancel debounce</button>
      </div>
    </div>
  );
}