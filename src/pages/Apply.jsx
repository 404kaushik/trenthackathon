import React, { useRef } from "react";
import pic from '../assets/apply_fox-cropped.svg';
import Team from "./Team";
import Sponsor from "./Sponsor";
import Contact from "./Contact";
import FAQ from "./FAQ";
import ScrollReveal from "../components/ScrollReveal";
import OrangeCloud from '../assets/cloud.svg';
import { Code, BookOpen, Heart, BookOpenCheck, CodeSquare, CodeXml, User2Icon } from 'lucide-react';


const Button = ({ href, icon: Icon, children, isActive }) => (
    <a href={href} className="w-full max-w-md">
    <button className={`w-full px-6 my-3 h-16 sm:h-20 md:h-24 rounded-[16px] text-lg sm:text-xl md:text-2xl font-space-mono text-[#F9F5E3] flex items-center justify-center space-x-4 transition-all duration-300 ease-in-out transform hover:shadow-lg md:hover:scale-105 md:hover:bg-indigo-500 overflow-hidden relative ${isActive ? 'bg-indigo-500' : 'bg-[#36382E]'}`}>
      <div className="flex items-center justify-center space-x-4 z-10 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
        <span>{children}</span>
      </div>
      <div className="absolute inset-0 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </button>
  </a>
);

const Apply = () => {
    // Create a ref for the drag constraints
    const constraintsRef = useRef(null);

    return (
        <div id='applications' className="mb-20 md:pt-8">
            <ScrollReveal>
                <div className="grid place-items-center">
                    <h1 className='sm:mt-10 lg:mt-20 text-5xl sm:text-8xl md:text-8xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]'>
                        Applications
                    </h1>
                    <p className='w-[100%] text-lg font-space-mono text-[#f9f5e3] text-center font-normal leading-loose mt-3 rounded-xl'>
                        Apply as a Volunteer, Mentor or a Judge!
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-4">
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-end space-y-4">
                    <Button href="https://forms.gle/wqMnRRsZof53fFy18" icon={BookOpenCheck}>
                        Apply as a Judge
                    </Button>
                    <Button href="https://forms.gle/6DkPBgAoWpf5P5oz8" icon={CodeXml} >
                        Apply as a Mentor
                    </Button>
                    <Button href="https://forms.gle/vW8fad7XbddW7xFx9" icon={User2Icon}>
                        Apply as a Volunteer
                    </Button>
                    </div>
                    <div className="md:w-1/2 md:mt-10">
                        <img
                            src={pic}
                            alt=""
                            className="w-[70%] mt-10 md:mt-0 md:w-[80%] xl:w-[60%] mx-auto object-cover standing-fox"
                        />
                    </div>
                </div>
            </ScrollReveal>
            <div className='flex justify-end w-full'>
                <img src={OrangeCloud} className='max-w-[50%] md:max-w-[40%] relative -right-16'/>
            </div>
            <FAQ />
            <div className='flex justify-start w-full'>
                <img src={OrangeCloud} className='max-w-[50%] md:max-w-[40%] relative -left-16'/>
            </div>
            <Sponsor />
            <div className='flex justify-end w-full'>
                <img src={OrangeCloud} className='max-w-[50%] md:max-w-[40%] relative -right-16'/>
            </div>
            <Team />
            <div className='flex justify-start w-full'>
                <img src={OrangeCloud} className='max-w-[50%] md:max-w-[40%] relative -left-16'/>
            </div>
            <Contact/>
        </div>
    );
}

export default Apply;