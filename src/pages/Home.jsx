import React, { useEffect, useRef, useState } from 'react';
import text from '../assets/text.png';
import CountDown from './CountDown';
import RedPlanet from '../assets/planet1.gif';
import BluePlanet from '../assets/planet2.gif';
import OrangePlanet from '../assets/planet3.gif';
import GreyPlanet from '../assets/planet4.gif';
import Asteroid from '../assets/asteroid.gif';
import PinkClouds from '../assets/pink-cloud.png';
import OrangeCloud from '../assets/cloud.svg';
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
    className="p-4 relative pt-13 md:pt-20 overflow-hidden"
    >
    <div className='galaxy-path'>
      <img src={PinkClouds} className='absolute z-10 bottom-0'/>
    </div>

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
    <div style={{ position: 'relative', zIndex: 1}} className='mt-[17rem] md:mt-0'>
        <img src={RedPlanet} alt="" className='absolute max-h-[5rem] md:max-h-[9rem] left-1/4 -top-[6rem]'/>
        <img src={BluePlanet} alt="" className='absolute max-h-[7rem] md:max-h-[13rem] right-3 md:-bottom-[5rem]'/>
        <img src={OrangePlanet} alt="" className='absolute max-h-[8rem] md:max-h-[12rem] left-5 bottom-0'/>
        <img src={GreyPlanet} alt="" className='absolute max-h-[4rem] md:max-h-[8rem] left-[50%] -bottom-[2rem] md:-bottom-[10rem]'/>
        <img src={Asteroid} alt="" className='absolute max-h-[90px] md:max-h-[150px] -right-52 top-96'
            style={{ transform: `translate(${position.x}%, ${position.y}%)`}}
            />
        <img src={OrangeCloud} className='max-w-[50%] md:max-w-[40%] absolute -top-[12rem] md:-top-[18rem] -right-10'/>
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 75, scale: 1 }, // Start with opacity 0, y-position 75, and scale 0. for zoom-in
            visible: { opacity: 1, y: 0, scale: 0.7 }  // Animate to opacity 1, y-position 0, and scale 1
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-col items-center justify-center mt-52  relative">
          <div className="sm:w-[85%] md:w-[80%] ">
            <img src={text} alt="" className='w-full'/>
          </div>
          <div className="sm:w-[95%] md:w-[100%] lg:w-[75%] text-center">
            <span className='text-5xl sm:text-8xl font-potta-one font-normal leading-none text-[#f9f5e3] animate-bounce'>
              November 8&#8209;10
            </span>
          </div>
          <button className='bg-[#36382E] my-8 px-9  h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
            Apply as Hacker
          </button>
        </motion.div>
      </div>
      <div className='flex w-full'>
        <img src={OrangeCloud} className='max-w-[50%] md:max-w-[40%] relative -bottom-[4rem] md:-bottom-[3rem] -left-16 z-10'/>
      </div>

      <div style={{ position: 'relative', zIndex: 10}}>
        <CountDown />
      </div>
      

    </div>
  );
};

export default Home;