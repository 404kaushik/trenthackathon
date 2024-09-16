import React from 'react';
import pic from '../assets/flying_fox.png'
import Apply from './Apply';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
    return(
        <div id='about' className="md:pt-8">
            <ScrollReveal>
                <div className='max-w-7xl mx-auto h-auto py-24'>
                <h1 className='text-center font-potta-one font-normal leading-none text-[#f9f5e3] text-5xl sm:text-8xl md:text-8xl '> About Us </h1>
                    <div className="sm:mt-5 mt-10 flex flex-row items-center justify-between flex-wrap md:flex-nowrap">
                        <div className="sm:w-[100%] md:w-1/2  flex items-center justify-center">
                            <img src={pic} alt="" className='w-[60%] sm:w-[50%] lg:w-[70%] object-cover floating-fox lg:pl-20'/>
                        </div>
                        <div className="sm:w-[100%] md:w-1/2 lg:pr-20">
                            <p className='p-3 text-md md:text-2xl font-space-mono text-[#f9f5e3] text-center font-normal leading-loose mt-3 bg-gray-800 rounded-xl'>HackTrent is the premier hackathon <br/>event hosted by Trent University. Join us for an exciting weekend of innovation, collaboration, and creativity. HackTrent offers an inclusive and inspiring environment to bring your ideas to life. Register now and be a part of the HackTrent experience!</p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
            <Apply />
        </div>
    )
}

export default About;