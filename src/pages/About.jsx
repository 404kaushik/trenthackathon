import React from 'react';
import pic from '../assets/flying_fox.png'
import Apply from './Apply';


const About = () => {
    return(
        <div className="">
            <div className='max-w-7xl mx-auto h-auto py-24'>
                <div className="w-11/12 mx-auto flex flex-row items-center justify-between">
                    <div className="w-full h-4/5 flex items-center justify-center">
                        <img src={pic} alt="" className='w-80 h-full object-cover floating-fox' />
                    </div>
                    <div className="grid place-items-center">
                        <h1 className='text-center font-potta-one text-8xl font-normal leading-none text-[#f9f5e3]'> About Us </h1>
                        <p className='text-lg font-space-mono text-[#f9f5e3] w-3/5 text-center font-normal leading-loose mt-3 bg-pink-800 rounded-xl'> is the premier hackathon <br/>event hosted by Trent University. Join <br/>us for an exciting weekend of <br/>innovation, collaboration, and creativity. HackTrent offers an inclusive and inspiring environment to bring your ideas to life. Register now and be a part of the HackTrent experience!</p>
                    </div>
                </div>
            </div>
            <Apply />
        </div>
    )
}

export default About;