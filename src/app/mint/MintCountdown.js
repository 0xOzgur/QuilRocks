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
    // This useEffect is dedicated to setting hasMounted to true
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // Countdown timer logic, independent of hasMounted
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft("2024/11/18 12:00:00"));
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []); // Empty dependency array means this runs once on mount

  // Only render the countdown if the component has mounted
  if (!hasMounted) {
    return null; // Or some placeholder content for server-side rendering
  }

  return (
    <div className="row gx-3 align-items-center mb-3">
      <div className="countdown d-inline-block text-white text-7 fw-600">Mint ends in:</div>
      <div className="col-12 col-lg-auto">
        <div className="countdown d-inline-block text-white text-7 fw-600">
          {Object.keys(timeLeft).length > 0 ? (
            <span>
              {timeLeft.days}d<span className="blink_me">:</span>
              {timeLeft.hours}h<span className="blink_me">:</span>
              {timeLeft.minutes}m<span className="blink_me">:</span>
              {timeLeft.seconds}s
            </span>
          ) : (
            <span>Time's up!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MintCountdown;