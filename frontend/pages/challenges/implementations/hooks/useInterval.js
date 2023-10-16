import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });
  
  useEffect(() => {
    if (!delay) return;
    const intervalId = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(intervalId);
  }, [delay]);
}