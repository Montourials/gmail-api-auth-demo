import { useCallback, useState, useEffect } from "react";

import { msToTime } from "src/util/__index.js";

export default function useStopwatch(interval = 1000) {
  const [timeInMs, setTimeInMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(
        () => setTimeInMs(timeInMs + interval),
        interval
      );
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeInMs, interval]);

  const toggle = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(() => {
    setTimeInMs(0);
  }, []);

  const getReadableTime = () => msToTime(timeInMs);

  return { getReadableTime, isRunning, toggle, stop, start, reset, timeInMs };
}
