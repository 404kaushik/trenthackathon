import React from 'react';
import text from '../assets/text.png';
import CountDown from './CountDown';
import Stars from './Stars';
import '../App.css';
import {motion, useScroll} from 'framer-motion';

const Home = () => {

const { scrollYProgress } = useScroll()

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
      {/* <div className="flex items-end justify-end">
        <img src={planet1} alt="" className='absolute inset-0 -translate-y-36 w-[492px] h-[919px]'/>
      </div> */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 75, scale: 1 }, // Start with opacity 0, y-position 75, and scale 0. for zoom-in
            visible: { opacity: 1, y: 0, scale: 0.7 }  // Animate to opacity 1, y-position 0, and scale 1
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-col items-center justify-center mt-60 mb-40 md:mb-60 relative">
          <div className="sm:w-[85%] md:w-[80%] ">
            <img src={text} alt="" className='w-full'/>
          </div>
          <div className="sm:w-[95%] md:w-[100%] lg:w-[75%] text-center">
            <span className='text-5xl sm:text-8xl font-potta-one font-normal leading-none text-[#f9f5e3] animate-bounce'>
              November 8&#8209;10
            </span>
          </div>
          <button className='bg-[#36382E] my-8 px-9  h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
            Apply as Hacker
          </button>
        </motion.div>
        <CountDown />
      </div>
    </div>
  );
};

export default Home;