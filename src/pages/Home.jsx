import React, { useEffect, useRef, useState } from 'react';
import text from '../assets/text.png';
import CountDown from './CountDown';
import RedPlanet from '../assets/planet1.gif';
import BluePlanet from '../assets/planet2.gif';
import OrangePlanet from '../assets/planet3.gif';
import GreyPlanet from '../assets/planet4.gif';
import Asteroid from '../assets/asteroid.gif';

import Stars from './Stars';
import '../App.css';
import {motion, useScroll} from 'framer-motion';

const Home = () => {

const { scrollYProgress } = useScroll()
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    const duration = 20000; 
    const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = (currentTime - startTime) ;
        const progress = (elapsed % duration) / duration;
        const x = (progress * -1000); 
        const y = (progress * -1000);
        setPosition({ x, y });

        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {};
    }, []);

  return (
    <div
    className="p-4"
    >
    <motion.div
      style={{
        scaleY: scrollYProgress
      }}

      initial={{ opacity: 0 }}  // Start with the component invisible
      animate={{ opacity: 1 }} // Animate to fully visible
      transition={{ duration: 1 }} // Duration of the fade-in effect
      className="fade-in-scroll"
    />

      <Stars starCount={1000} />      
      <div style={{ position: 'relative', zIndex: 1}}>
        <img src={RedPlanet} alt="" className='absolute max-h-[80px] left-1/4 -top-16'/>
        <img src={BluePlanet} alt="" className='absolute max-h-[150px] right-3 -top-20'/>
        <img src={OrangePlanet} alt="" className='absolute max-h-[140px] left-5 top-36'/>
        <img src={GreyPlanet} alt="" className='absolute max-h-24 left-72 top-80'/>
        <img src={Asteroid} alt="" className='absolute max-h-[150px] -right-52 top-96'
            style={{ transform: `translate(${position.x}%, ${position.y}%)`}}
            />

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 75, scale: 1 }, // Start with opacity 0, y-position 75, and scale 0. for zoom-in
            visible: { opacity: 1, y: 0, scale: 0.7 }  // Animate to opacity 1, y-position 0, and scale 1
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-col items-center justify-center mt-52 mb-40 md:mb-60 relative">
          <div className="sm:w-[85%] md:w-[80%] ">
            <img src={text} alt="" className='w-full'/>
          </div>
          <div className="sm:w-[95%] md:w-[100%] lg:w-[75%] text-center">
            <span className='text-5xl sm:text-8xl font-potta-one font-normal leading-none text-[#f9f5e3] animate-bounce'>
              November 8&#8209;10
            </span>
          </div>
          <button className='bg-[#36382E] my-8 px-9  h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
            Applications Open Soon...
          </button>
        </motion.div>
      </div>
      <div style={{ position: 'relative', zIndex: 1}}>
        <CountDown />
      </div>
    </div>
  );
};

export default Home;