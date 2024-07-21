import React, { useState, useEffect } from 'react';
import './MintCountdown.css';

const calculateTimeLeft = (endDate) => {
  const difference = +new Date(endDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const MintCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft("2024/11/18 12:00:00"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="mint-countdown-container">
      <div className="mint-ends-text">Mint ends in:</div>
      <div className="countdown-timer">
        {Object.keys(timeLeft).length > 0 ? (
          <span>
            {timeLeft.days}d<span className="blink_me">:</span>
            {timeLeft.hours}h<span className="blink_me">:</span>
            {timeLeft.minutes}m<span className="blink_me">:</span>
            {timeLeft.seconds}s
          </span>
        ) : (
          <span>Time&apos;s up!</span>
        )}
      </div>
    </div>
  );
};

export default MintCountdown;