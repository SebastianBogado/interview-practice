import { useEffect, useState, useRef } from 'react';

export default function useDebounce(fn, ms, deps = []) {
  const [debouncedState, setDebouncedState] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const savedFn = useRef();

  useEffect(() => {
    savedFn.current = fn;
  });
  
  useEffect(() => {
    setDebouncedState(false);
    const timeoutId = setTimeout(() => {
      savedFn.current();
      setDebouncedState(true);
    }, ms);

    setTimeoutId(timeoutId);

    return () => {
      clearTimeout(timeoutId);
      setDebouncedState(null);
    }
  }, deps);

  return [
    () => debouncedState,
    () => {
      clearTimeout(timeoutId);
      setDebouncedState(null)
    },
  ];
}