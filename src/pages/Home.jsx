import React from 'react';
import text from '../assets/text.png';
import planet1 from '../assets/planet.png';
import CountDown from './CountDown';
import Stars from './Stars';

const Home = () => {
  return (
    <div className="w-screen h-auto p-4 relative">
      <Stars starCount={1000} />
      {/* <div className="flex items-end justify-end">
        <img src={planet1} alt="" className='absolute inset-0 -translate-y-36 w-[492px] h-[919px]'/>
      </div> */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="flex flex-col items-center justify-center my-60 relative">
          <img src={text} alt="" className='w-3/4 h-60'/>
          <div className='text-center font-potta-one text-8xl font-normal leading-none text-[#f9f5e3] animate-bounce'>
            November 8-10
          </div>
          <button className='bg-[#36382E] my-8 w-96 h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
            Apply as Hacker
          </button>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default Home;