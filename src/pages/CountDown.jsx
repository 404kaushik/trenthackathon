import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import About from './About';

const CountDown = () => {
  const { scrollYProgress } = useScroll();
  // Adjust the range to make the div appear faster
  const x = useTransform(scrollYProgress, [0, 0.2, 0.3, 1], ["-100vw", "0vw", "0vw", "100vw"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 1], [0, 1, 1, 0]);

  const targetDate = '2024-12-25T00:00:00'; // Set your target date here

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="max-w-7xl mx-auto">
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <motion.div
          style={{ x, opacity }}
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: "0vw", opacity: 1 }}
          transition={{ duration: 0.1, type: "spring", stiffness: 300 }}
        >
          <h1 className='text-5xl sm:text-8xl md:text-8xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]'>Schedule</h1>
          <div className="flex my-10 max-w-7xl mx-auto md:h-80 items-center justify-center text-white md:py-16">
            <div className="bg-white sm:-translate-x-3 rounded-[14px] sm:rounded-[20px]">
              <div className="text-center w-full">
                <div className="bg-[#36382E] translate-x-1 sm:translate-x-3 -translate-y-1 sm:-translate-y-3 p-6 sm:p-8 w-full rounded-[10px] sm:rounded-[16px] shadow-lg inline-block">
                  <div className="flex items-center justify-center -space-x-0 sm:space-x-4">
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
        </motion.div>
      </div>
      <About />
    </div>
  );
};

const TimeUnit = ({ value, label }) => (
  <div>
    <div className="text-3xl sm:text-4xl font-space-mono">{label}</div>
    <div className="text-5xl sm:text-6xl font-space-mono">{value}</div>
  </div>
);

const Separator = () => <div className="text-2xl sm:text-6xl font-space-mono">:</div>;

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