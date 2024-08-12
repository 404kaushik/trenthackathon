import React, { useState, useEffect } from 'react';
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
import leftArrow from '../assets/left-arrow.png';
import rightArrow from '../assets/right-arrow.png';
import '../types/Team.css'

const teamData = {
    Design: {
        image: m2,
        members: [
            { name: 'Lizi', role: 'Designer', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg', github: '', linkedin: '' },
        ],
    },
    Marketing: {
        image: m3,
        members: [
            { name: 'Shelmah Chebet', role: 'Designer & Event Coordinator', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg', insta: '' },
            { name: 'Lizi', role: 'Designer', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg', insta: '' },
        ],
    },
    Development: {
        image: m4,
        members: [
            // Add team members under Development
            { name: 'Lizi', role: 'Designer', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg', insta: '' },
        ],
    },
    Leadership: {
        image: m1,
        members: [
            { name: 'Lizi', role: 'Designer', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg', insta: '' },
            { name: 'Shelmah Chebet', role: 'Designer & Event Coordinator', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg' },
            { name: 'Fiona', role: 'Lead Event Coordinator & Lead Marketing Team', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg' },
        ],
    },
    HR: {
        image: m5,
        members: [
            // Add team members under HR
            { name: 'Lizi', role: 'Designer', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg', insta: '' },
        ],
    },
    Operations: {
        image: m6,
        members: [
            // Add team members under Operations
            { name: 'Lizi', role: 'Designer', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg', insta: '' },
        ],
    },
    Finance: {
        image: m7,
        members: [
            // Add team members under Finance
            { name: 'Lizi', role: 'Designer', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg', insta: '' },
            { name: 'Lizi', role: 'Designer', img: 'https://m.media-amazon.com/images/M/MV5BMWQzZTJmMmUtM2ZjNi00MTQ4LWI4NTItYWJiNjQyMzBkYzU2XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_FMjpg_UX1000_.jpg', insta: '' },
        ],
    },
};

function Team() {
    const categories = Object.keys(teamData);
    const [startIndex, setStartIndex] = useState(0); // Track the starting index of the visible moons
    const [visibleCount, setVisibleCount] = useState(3); // Default to showing 3 moons

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth >= 1024) {
                setVisibleCount(7); // lg screens show 7 moons
            } else if (window.innerWidth >= 768) {
                setVisibleCount(4); // md screens show 4 moons
            } else {
                setVisibleCount(3); // sm screens show 3 moons
            }
        };

        window.addEventListener('resize', updateVisibleCount);
        updateVisibleCount(); // Initialize on mount

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

    const activeCategory = visibleCategories[Math.floor(visibleCount / 2)]; // Centered moon as active

    return (
        <div className="text-center py-8">
            <h1 className="sm:mt-10 lg:mt-20 text-4xl sm:text-6xl md:text-8xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]">
                Our Team
            </h1>

            <div className="flex justify-center items-center space-x-2 sm:space-x-4 my-8">
                {/* Left Arrow */}
                <img
                    src={leftArrow}
                    alt="Previous"
                    className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
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
                                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded-full mx-auto mb-2 cursor-pointer ${category === activeCategory ? 'border-4 border-yellow-500' : ''}`}
                            />
                            <div className={`cursor-pointer text-sm sm:text-lg md:text-xl font-space-mono font-semibold ${category === activeCategory ? 'text-yellow-500' : 'text-[#f9f5e3]'}`}>
                                {category}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <img
                    src={rightArrow}
                    alt="Next"
                    className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
                    onClick={handleNext}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {teamData[activeCategory].members.map((member, index) => (
                    <div
                    key={index}
                    className="relative bg-[#F9F5E3] text-black p-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl grid place-items-center"
                    >
                        <div className="bg-[#36382E] flex items-center justify-center p-3 rounded-[16px]">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-32 sm:h-40 md:h-80 object-cover rounded-lg "
                            />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold">{member.name}</h3>
                        <p className="text-gray-700">{member.role}</p>
                        <div className="">
                            <div className="flex justify-center space-x-4 mt-4">
                            <a href="#" className="text-gray-800 hover:text-blue-700 text-xl">
                                <img src={soc1} alt="" className='w-8' />
                            </a>
                            <a href="#" className="text-gray-800 hover:text-blue-700 text-xl">
                                <img src={soc2} alt="" className='w-8' />
                            </a>
                            <a href="#" className="text-gray-800 hover:text-blue-700 text-xl">
                                <img src={soc3} alt="" className='w-8' />
                            </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PROFILE CARDS */}
            {/* <div class="main">
                {teamData[activeCategory].members.map((member, index) => (
                    <div key={index} class="profile-card">
                        <div class="img">
                            <img src={member.img} alt={member.name} />
                        </div>
                        <div class="caption">
                            <h3 className="text-sm font-semibold">{member.name}</h3>
                            <p className="text-gray-700">{member.role}</p>
                            <div className='flex items-center justify-center'>
                                <a href={member.insta} target="_blank" rel="noopener noreferrer"><img src={soc1} alt="" className='w-8'/></a>
                                <a href={member.github} target="_blank" rel="noopener noreferrer"><img src={soc2} alt="" className='w-8'/></a>
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><img src={soc3} alt="" className='w-8'/></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default Team;
