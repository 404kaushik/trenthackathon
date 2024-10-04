import React, { useState, useEffect} from 'react';
import m1 from '../assets/Moon1.svg';
import m2 from '../assets/Moon2.svg';
import m3 from '../assets/Moon3.svg';
import m4 from '../assets/Moon4.svg';
import m5 from '../assets/Moon5.svg';
import m6 from '../assets/Moon6.svg';
import m7 from '../assets/Moon7.svg';
import soc1 from '../assets/insta.png'
import soc2 from '../assets/github.png'
import soc3 from '../assets/linkedin.png'
import user from '../assets/userDefault.png'
import anshika from '../assets/anshika.webp'
import aiden from '../assets/Aiden.jpg'
import riya from '../assets/riya.JPG'
import kaushik from '../assets/Kaushik.png'
import fiona from '../assets/fiona_laygo.png'
import lizi from '../assets/LiziVillas.jpeg'
import kristy from '../assets/kristy.jpeg'
import deji from '../assets/Deji.JPG'
//import shelmah from '../assets/Shelmah_Chebet.png'
//import muneeb from '../assets/muneeb.jpg'
import damiola from '../assets/damilola.jpg'
import batool from '../assets/Batool.jpg'
import leftArrow from '../assets/left-arrow.png';
import rightArrow from '../assets/right-arrow.png';
import '../types/Team.css'
import {motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollReveal from '../components/ScrollReveal';

const teamData = {
  Marketing: {
    image: m3,
    members: [
      { name: 'XYZ', role: 'xyz', img: user, insta: '' },
      { name: 'XYZ', role: 'xyz', img: user, insta: '' },
    ],
  },
  Development: {
    image: m4,
    members: [
      // Add team members under Development
      { name: 'XYZ', role: 'xyz', img: user, insta: '' },
    ],
  },
  Design: {
      image: m2,
      members: [
          { name: 'Batool Kazmi', role: 'Lead Designer', img: batool, insta: 'https://www.instagram.com/_humain_ain/,', linkedin: 'https://www.linkedin.com/in/batoolkazmi/', github: 'https://github.com/BatoolKazmi' },
          { name: 'Lizi Villas', role: 'Designer', img: lizi, github: '', linkedin: '' },
      ],
  },
  Leadership: {
    image: m1,
    members: [
            // { name: 'Lizi Villas', role: 'Designer', img: lizi, insta: 'https://www.instagram.com/lizi_vie/', linkedin: 'www.linkedin.com/in/elizabetvillas', github: 'https://github.com/lizi-vie'  },                      
            // { name: 'Shelmah Chebet', role: '', img: shelmah, insta: '', linkedin: '', github: '' },
            // { name: 'Muneeb', role: '', img: muneeb, insta: '', linkedin: '', github: '' },
            // { name: 'Damilola', role: 'Outreach', img: damiola, insta: '', linkedin: '', github: '' },
            // { name: 'Batool Kazmi', role: 'Designer', img: batool, insta: 'https://www.instagram.com/_humain_ain/,', linkedin: 'https://www.linkedin.com/in/batoolkazmi/', github: 'https://github.com/BatoolKazmi' },
            { name: 'Aiden Miah', role: 'Director and Software Engineer intern @ Scotiabank and President @ TCSCA', img: aiden, insta: '', linkedin: '', github: '' },
            { name: 'Riya Jaykar', role: 'Co-Director and President of TCSA', img: riya, insta: '', linkedin: '', github: '' },
            { name: 'Anshika Gaur', role: 'Co-Director and Vice President of TCSA', img: anshika, insta: '', linkedin: '', github: '' },
        ],
    },
    Tech: {
        image: m5,
        members: [
            // Add team members under HR
            { name: 'Kaushik Nag Tumu', role: 'Lead Developer', img: kaushik, insta: '' },
            { name: 'Kristy Rath', role: 'Developer', img: kristy, insta: '', linkedin: 'https://www.linkedin.com/in/kristy-rath/', github: 'https://github.com/kristyrath'  },
            { name: 'Deji', role: 'Developer', img: deji, insta: 'https://www.instagram.com/lildejix?igsh=MTI2czM5anE5MjNyYQ%3D%3D&utm_source=qr', linkedin: 'https://www.linkedin.com/in/ayodeji-onawunmi-618835208/', github: 'https://github.com/DejMan2003' },
        ],
    },
    Outreach: {
        image: m6,
        members: [
            // Add team members under Operations
            { name: 'Fiona Laygo', role: 'Events Lead coordinator & Marketing Team Lead', img: fiona, insta: '', github: 'https://github.com/laygofiona', linkedin: 'https://www.linkedin.com/in/fionalaygo4015/' },
            { name: 'Damilola', role: 'Outreach', img: damiola, insta: '', linkedin: '', github: '' },
        ],
    },
    Finance: {
        image: m7,
        members: [
            // Add team members under Finance
            { name: 'XYZ', role: 'xyz', img: user, insta: '' },
            { name: 'XYZ', role: 'xyz', img: user, insta: '' },
        ],
    },
};

function Team() {
    const categories = Object.keys(teamData);
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
  
    useEffect(() => {
      const updateVisibleCount = () => {
        if (window.innerWidth >= 1024) {
          setVisibleCount(7);
        } else if (window.innerWidth >= 768) {
          setVisibleCount(4);
        } else {
          setVisibleCount(3);
        }
      };
  
      window.addEventListener('resize', updateVisibleCount);
      updateVisibleCount();
  
      return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);
  
    const handleNext = () => {
      setStartIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };
  
    const handlePrevious = () => {
      setStartIndex((prevIndex) =>
        prevIndex === 0 ? categories.length - 1 : prevIndex - 1
      );
    };
  
    const visibleCategories = categories
      .slice(startIndex, startIndex + visibleCount)
      .concat(
        categories.slice(0, Math.max(0, startIndex + visibleCount - categories.length))
      );
  
    const activeCategory = visibleCategories[Math.floor(visibleCount / 2)];
  
    return (
      <div id="team" className="text-center py-24 md:py-8">
        <ScrollReveal>
          <h1 className="sm:mt-10 lg:mt-20 text-4xl sm:text-6xl md:text-8xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]">
            Our Team
          </h1>
    
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 my-8">
            {/* Left Arrow */}
            <img
              src={leftArrow}
              alt="Previous"
              className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer lg:hover:-translate-y-1 lg:hover:scale-150"
              onClick={handlePrevious}
            />
    
            {/* Display Department Moons */}
            <div className="flex space-x-2 sm:space-x-4">
              {visibleCategories.map((category, index) => (
                <div
                  key={category}
                  className="text-center min-w-[60px] sm:min-w-[100px]"
                  onClick={() => setStartIndex(categories.indexOf(category))}
                >
                  <img
                    src={teamData[category].image}
                    alt={`${category} department`}
                    className={`w-24 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded-full mx-auto mb-2 cursor-pointer  ${category === activeCategory ? 'border-4 border-yellow-500' : ''}`}
                  />
                  <div className={`cursor-pointer text-xs sm:text-lg md:text-xl font-space-mono font-semibold ${category === activeCategory ? 'text-yellow-500' : 'text-[#f9f5e3]'}`}>
                    {category}
                  </div>
                </div>
              ))}
            </div>
    
            {/* Right Arrow */}
            <img
              src={rightArrow}
              alt="Next"
              className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer lg:hover:-translate-y-1 lg:hover:scale-150"
              onClick={handleNext}
            />
          </div>
        </ScrollReveal>
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {teamData[activeCategory].members.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    );
  }
  
  function TeamMember({ member }) {
    const { ref, inView } = useInView({
      triggerOnce: false, // Animate only once when the element comes into view
      threshold: 0.1, // Trigger the animation when 10% of the element is visible
    });
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          rotate: inView ? 360 : 0,
          scale: inView ? 1 : 0,
        }}
        transition={{
          duration: 0.6,          // Slightly longer for smoother transition
          type: 'spring',
          stiffness: 200,         // Reduce stiffness for a gentler effect
          damping: 20,            // Increased damping for smoother animation
          ease: 'easeInOut',      // Adding easing for smoother rotation
        }}
        className="relative bg-[#F9F5E3] text-black p-4 rounded-lg w-[90%] md:w-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-102 hover:shadow-2xl grid place-items-center"
      >
        <div className="bg-[#36382E] w-full flex items-center justify-center p-3 rounded-[16px]">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-60 sm:h-40 md:h-80 object-cover object-[center_25%] rounded-lg"
          />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mt-4">{member.name}</h3>
        <p className="text-gray-700">{member.role}</p>
        <div className="">
          <div className="flex justify-center space-x-4 mt-4">
            <a href={member.insta} className="text-gray-800 hover:text-blue-700 text-xl">
              <img src={soc1} alt="Instagram" className="w-8" />
            </a>
            <a href={member.linkedin} className="text-gray-800 hover:text-blue-700 text-xl">
              <img src={soc2} alt="LinkedIn" className="w-8" />
            </a>
            <a href={member.github} className="text-gray-800 hover:text-blue-700 text-xl">
              <img src={soc3} alt="GitHub" className="w-8" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }
  
export default Team;