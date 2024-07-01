import { useEffect, useState } from 'react';

interface Props {
  userWaitFreeTime: string;
}

function useWaitFreeTimer({ userWaitFreeTime }: Props) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    if (!userWaitFreeTime) return;
    const [h, m, s] = getWaitTime();

    setHour(h);
    setMinute(m);
    setSecond(s);
  }, [userWaitFreeTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
      } else if (minute > 0) {
        setSecond(59);
        setMinute(minute - 1);
      } else if (hour > 0) {
        setSecond(59);
        setMinute(59);
        setHour(hour - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [hour, minute, second]);

  const getWaitTime = () => {
    const [h, m, s] = userWaitFreeTime.split(':').map(Number);
    return [h, m, s];
  };

  return {
    hour,
    minute,
    second,
    isUserWaitFree: hour === 0 && minute === 0 && second === 0,
  };
}

export default useWaitFreeTimer;
