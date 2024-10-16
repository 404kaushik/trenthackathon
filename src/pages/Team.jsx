import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollReveal from '../components/ScrollReveal';
import '../types/Team.css';


// Import images
import m1 from '../assets/Moon1.svg';
import m2 from '../assets/Moon2.svg';
import m3 from '../assets/Moon3.svg';
import m4 from '../assets/Moon4.svg';
import m5 from '../assets/Moon5.svg';
import m6 from '../assets/Moon6.svg';
import m7 from '../assets/Moon7.svg';
import soc1 from '../assets/insta.png';
import soc2 from '../assets/linkedin.png';
import soc3 from '../assets/github.png';
import user from '../assets/userDefault.png';
import leftArrow from '../assets/left-arrow.png';
import rightArrow from '../assets/right-arrow.png';


// Import team member images
import aiden from '../assets/Aiden.jpg';
import riya from '../assets/riya.JPG';
import fiona from '../assets/fiona_laygo.png';
import batool from '../assets/Batool.jpg';
import akash from '../assets/Akash_Bahl.png';
import kaushik from '../assets/Kaushik.png';
import kristy from '../assets/kristy.jpeg';
import deji from '../assets/Deji.JPG';
import lizi from '../assets/LiziVillas.jpeg';
import damiola from '../assets/damilola.jpg';
import anshika from '../assets/anshika.webp';
import swastika from '../assets/swastika_bansal.jpg';
import krunal from '../assets/Krunal_Patel.jpg';
import shelmah from '../assets/Shelmah_Chebet.png'


const teamData = {
  Outreach: {
    image: m3,
    members: [
      { name: 'Fiona Laygo', role: 'VP of Outreach', img: fiona, insta: '', github: 'https://github.com/laygofiona', linkedin: 'https://www.linkedin.com/in/fionalaygo4015/' },
      { name: 'Damilola', role: 'Outreach Executive', img: damiola, insta: '', linkedin: '', github: '' },
      { name: 'Swastika Bansal', role: 'Marketing Executive', img: swastika, insta: 'https://www.instagram.com/swastikaabansal/', github: 'https://github.com/sw-astika', linkedin: 'https://www.linkedin.com/in/swastika-bansal-sk2909/' },
      { name: 'Aiden Miah', role: 'Director and President @ TCSCA', img: aiden, insta: 'https://www.instagram.com/_aiden.m_/', linkedin: 'https://www.linkedin.com/in/aidenm/', github: '' },
      { name: 'Riya Jaykar', role: 'Communications Director', img: riya, insta: 'https://www.instagram.com/tcsawithriya/', linkedin: 'https://www.linkedin.com/in/riyajaykar/' },
      { name: 'Akash Bahl', role: 'Outreach Executive', img: akash, insta: '', linkedin: '', github: '' },
      { name: 'Batool Kazmi', role: 'Outreach Executive', img: batool, insta: '', linkedin: '', github: '' },
      { name: 'Rony', role: 'Outreach Executive', img: user, insta: '', linkedin: '', github: '' },
    ],
  },
  Marketing: {
    image: m4,
    members: [
      { name: 'Fiona Laygo', role: 'VP of Marketing', img: fiona, insta: '', github: 'https://github.com/laygofiona', linkedin: 'https://www.linkedin.com/in/fionalaygo4015/' },
      { name: 'Swastika Bansal', role: 'Marketing Executive', img: swastika, insta: 'https://www.instagram.com/swastikaabansal/', github: 'https://github.com/sw-astika', linkedin: 'https://www.linkedin.com/in/swastika-bansal-sk2909/' },
      { name: 'Neema', role: 'Marketing Executive', img: user, insta: '', github: '', linkedin: '' },
      { name: 'Rida', role: 'Marketing Executive', img: user, insta: '', github: '', linkedin: '' },
      { name: 'Tahsin', role: 'Marketing Executive', img: user, insta: '', github: '', linkedin: '' },
    ],
  },
  Design: {
    image: m2,
    members: [
      { name: 'Batool Kazmi', role: 'Lead Designer', img: batool, insta: 'https://www.instagram.com/_humain_ain/', linkedin: 'https://www.linkedin.com/in/batoolkazmi/', github: 'https://github.com/BatoolKazmi' },
      { name: 'Lizi Villas', role: 'Design Executive', img: lizi, insta: 'https://www.instagram.com/lizi_vie/', github: 'https://github.com/lizi-vie', linkedin: 'www.linkedin.com/in/elizabetvillas' },
      { name: 'Shelmah', role: 'Design Executive', img: shelmah, github: '', linkedin: '' },
    ],
  },
  Leadership: {
    image: m1,
    members: [
      { name: 'Aiden Miah', role: 'Director and President @ TCSCA', img: aiden, insta: 'https://www.instagram.com/_aiden.m_/', linkedin: 'https://www.linkedin.com/in/aidenm/', github: '' },
      { name: 'Riya Jaykar', role: 'Co-Director and President of TCSA', img: riya, insta: 'https://www.instagram.com/tcsawithriya/', linkedin: 'https://www.linkedin.com/in/riyajaykar/' },
      { name: 'Anshika Gaur', role: 'Co-Director and Vice President of TCSA', img: anshika, insta: '', linkedin: '', github: '' },
    ],
  },
  Tech: {
    image: m5,
    members: [
      { name: 'Kaushik Nag Tumu', role: 'VP of Web Dev', img: kaushik, insta: '', linkedin: '', github: '' },
      { name: 'Kristy Rath', role: 'Developer', img: kristy, insta: '', linkedin: 'https://www.linkedin.com/in/kristy-rath/', github: 'https://github.com/kristyrath' },
      { name: 'Deji', role: 'Developer', img: deji, insta: 'https://www.instagram.com/lildejix?igsh=MTI2czM5anE5MjNyYQ%3D%3D&utm_source=qr', linkedin: 'https://www.linkedin.com/in/ayodeji-onawunmi-618835208/', github: 'https://github.com/DejMan2003' },
    ],
  },
  Logistics: {
    image: m6,
    members: [
      { name: 'Akash Bahl', role: 'VP of Logistics', img: akash, insta: '', linkedin: '', github: '' },
      { name: 'Krunal Patel', role: 'Logistics Executive', img: krunal, insta: '', linkedin: '', github: '' },
      { name: 'Dave', role: 'Logistics Executive', img: user, insta: '', linkedin: '', github: '' },
    ],
  },
  Finance: {
    image: m7,
    members: [
      { name: 'Nitika', role: 'Finance Executive', img: user, insta: '', linkedin: '', github: '' },
    ],
  },
};

const getVisibleCount = () => {
  if (window.innerWidth >= 1024) return 7;
  if (window.innerWidth >= 768) return 5;
  return 3;
};

const getStartIndex = (visibleCount, fullCount) => {
  const fullSideLength = Math.floor(fullCount / 2);
  const visibleSideLength = Math.floor(visibleCount / 2);
  return fullSideLength - visibleSideLength;
};

function Team() {
  const categories = Object.keys(teamData);
  const [sectionState, setSectionState] = useState(() => {
    const visibleCount = getVisibleCount();
    const startIndex = getStartIndex(visibleCount, categories.length);
    const visibleCategories = categories.slice(startIndex, startIndex + visibleCount);
    const activeCategory = visibleCategories[Math.floor(visibleCount / 2)];
    
    return { visibleCount, startIndex, visibleCategories, activeCategory };
  });
  
  const { visibleCount, startIndex, visibleCategories, activeCategory } = sectionState;

  useEffect(() => {
    const updateVisibleCategories = () => {
      const newVisibleCount = getVisibleCount();
      const newStartIndex = getStartIndex(newVisibleCount, categories.length);
      const newVisibleCategories = categories.slice(newStartIndex, newStartIndex + newVisibleCount);
      const newActiveCategory = newVisibleCategories[Math.floor(newVisibleCount / 2)];

      setSectionState({
        visibleCount: newVisibleCount,
        startIndex: newStartIndex,
        visibleCategories: newVisibleCategories,
        activeCategory: newActiveCategory,
      });
    };

    window.addEventListener('resize', updateVisibleCategories);
    return () => window.removeEventListener('resize', updateVisibleCategories);
  }, []);

  const handleSelection = (direction) => {
    const currentIndex = categories.indexOf(activeCategory);
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = categories.length - 1;
    if (newIndex >= categories.length) newIndex = 0;

    const newActiveCategory = categories[newIndex];
    const newVisibleCategories = [...visibleCategories];
    const middleIndex = Math.floor(visibleCount / 2);

    if (direction === 1) {
      newVisibleCategories.push(categories[(newIndex + middleIndex) % categories.length]);
      newVisibleCategories.shift();
    } else {
      newVisibleCategories.unshift(categories[(newIndex - middleIndex + categories.length) % categories.length]);
      newVisibleCategories.pop();
    }

    setSectionState({
      ...sectionState,
      visibleCategories: newVisibleCategories,
      activeCategory: newActiveCategory,
    });
  };

  return (
    <div id="team" className="text-center py-24 md:py-8">
      <ScrollReveal>
        <h1 className="sm:mt-10 lg:mt-20 text-4xl sm:text-6xl md:text-8xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]">
          Our Team
        </h1>

        <div className="flex justify-center items-center space-x-2 sm:space-x-4 my-8">
          <img
            src={leftArrow}
            alt="Previous"
            className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={() => handleSelection(-1)}
          />

          <div className="w-full sm:w-auto flex space-x-1 sm:space-x-4">
            {visibleCategories.map((category, index) => (
              <div
                key={category}
                className="text-center min-w-[60px] sm:min-w-[100px]"
                // NOTE: this is temporaily disabled due to bugs. Users can just navigate using left and right arrows.
                // onClick={() => setSectionState({ ...sectionState, activeCategory: category })} 
              >
                <img
                  src={teamData[category].image}
                  alt={`${category} department`}
                  className={`w-24 h-16 sm:w-15 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded-full mx-auto mb-2 cursor-pointer transition-transform duration-300 hover:scale-110 ${
                    category === activeCategory ? 'border-4 border-yellow-500' : ''
                  }`}
                />
                <div className={`cursor-pointer text-xs sm:text-lg md:text-xl font-space-mono font-semibold ${
                  category === activeCategory ? 'text-yellow-500' : 'text-[#f9f5e3]'
                }`}>
                  {category}
                </div>
              </div>
            ))}
          </div>

          <img
            src={rightArrow}
            alt="Next"
            className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={() => handleSelection(1)}
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
    triggerOnce: false,
    threshold: 0.1,
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
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
        damping: 20,
        ease: 'easeInOut',
      }}
      className="relative bg-[#F9F5E3] text-black p-4 rounded-lg w-[90%] md:w-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl grid place-items-center"
    >
      <div className="bg-[#36382E] w-full flex items-center justify-center p-3 rounded-[16px]">
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-60 sm:h-40 md:h-80 object-cover object-[center_25%] rounded-lg"
        />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mt-4">{member.name}</h3>
      <p className="text-gray-700 text-sm">{member.role}</p>
      <div className="flex justify-center space-x-4 mt-4">
        {member.insta && (
          <a href={member.insta} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-700 transition-colors duration-300">
            <img src={soc1} alt="Instagram" className="w-8" />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-700 transition-colors duration-300">
            <img src={soc2} alt="LinkedIn" className="w-8" />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-700 transition-colors duration-300">
            <img src={soc3} alt="GitHub" className="w-8" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default Team;