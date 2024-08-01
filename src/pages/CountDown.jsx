import React, { useEffect, useState } from 'react';
import About from './About';

const CountDown = () => {
  const targetDate = '2024-12-25T00:00:00'; // Set your target date here

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="max-w-7xl mx-auto h-auto p-4">
      <div className="text-center font-potta-one text-8xl font-normal leading-none text-[#f9f5e3]">
        Schedule
      </div>
      <div className="flex max-w-7xl mx-auto h-80 items-center justify-center text-white py-16">
        <div className="w-2/3 bg-white rounded-[20px]">
        <div className="text-center w-full">
          <div className="bg-[#36382E] translate-x-3 -translate-y-3 p-8 w-full rounded-[16px] shadow-lg inline-block">
            <div className="flex items-center justify-center space-x-4">
              <TimeUnit value={timeLeft.days} label="DAYS" />
              <Separator />
              <TimeUnit value={timeLeft.hours} label="HRS" />
              <Separator />
              <TimeUnit value={timeLeft.minutes} label="MINS" />
              <Separator />
              <TimeUnit value={timeLeft.seconds} label="SECS" />
            </div>
          </div>
        </div>

        </div>
      </div>
      <About />
    </div>
  );
};

const TimeUnit = ({ value, label }) => (
  <div>
    <div className="text-4xl font-space-mono p-4">{label}</div>
    <div className="text-6xl font-space-mono p-4">{value}</div>
  </div>
);

const Separator = () => <div className="text-3xl font-space-mono p-4 mt-16">:</div>;

const calculateTimeLeft = (targetDate) => {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const distance = target - now;

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export default CountDown;