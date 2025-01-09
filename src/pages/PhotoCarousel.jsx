import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Code2, Binary, BrainCircuit } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

// Import all images from assets
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpg';
import image4 from '../assets/image4.jpg';
import image6 from '../assets/image6.png';
import image7 from '../assets/image7.png';
import image8 from '../assets/image8.png';
import image9 from '../assets/image9.png';
import image10 from '../assets/image10.png';
import image11 from '../assets/image11.png';
import image12 from '../assets/image12.png';

// ... import remaining images

const images = [
    {
        src: image1,
        alt: 'Hackathon Innovation Showcase',
        title: 'Shaping the Future',
        description: 'Explore groundbreaking projects and cutting-edge ideas at HackTrent.',
        category: 'Technology'
      },
      {
        src: image10,
        alt: 'Brains Behind The Project',
        title: 'HackTrent Directors',
        description: 'The dedicated team behind HackTrent, driving innovation and success.',
        category: 'Leadership'
      },
      {
        src: image2,
        alt: 'Hackathon Team Brainstorming',
        title: 'Collaboration in Action',
        description: 'Witness creativity unfold as teams tackle real-world challenges.',
        category: 'Teamwork'
      },
      {
        src: image4,
        alt: 'Hackathon Coding Session',
        title: 'Code the Change',
        description: 'Empowering participants to solve problems with technology.',
        category: 'Programming'
      },
      {
        src: image6,
        alt: 'Mentorship During Hackathon',
        title: 'Guiding Innovation',
        description: 'Mentors and experts supporting participants through the journey.',
        category: 'Support'
      },
      {
        src: image7,
        alt: 'Hackathon Presentation',
        title: 'Pitching Ideas',
        description: 'Teams presenting their innovative solutions to the judges.',
        category: 'Innovation'
      },
      {
        src: image8,
        alt: 'Networking at HackTrent',
        title: 'Building Connections',
        description: 'Fostering relationships and networking among future tech leaders.',
        category: 'Community'
      },
      {
        src: image9,
        alt: 'Hackathon Closing Ceremony',
        title: 'Celebrating Achievements',
        description: 'Acknowledging participants for their efforts and innovation.',
        category: 'Recognition'
      },
      {
        src: image11,
        alt: 'Hackathon Judges Deliberating',
        title: 'Deciding the Best',
        description: 'Judges evaluating the best solutions presented during HackTrent.',
        category: 'Judging'
      },
      {
        src: image12,
        alt: 'Excited Participants at HackTrent',
        title: 'Inspiring Innovation',
        description: 'Celebrating the enthusiasm and passion of HackTrent participants.',
        category: 'Innovation'
      },      
  
];

const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationDirection, setAnimationDirection] = useState('next');
  const containerRef = useRef(null);

  const globalStyles = `
    @keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    }

    .animate-float {
    animation: float 3s ease-in-out infinite;
    }

    @keyframes slideNext {
    from {
        transform: translateX(-${currentIndex * 100}%);
    }
    to {
        transform: translateX(-${(currentIndex + 1) * 100}%);
    }
    }

    @keyframes slidePrev {
    from {
        transform: translateX(-${currentIndex * 100}%);
    }
    to {
        transform: translateX(-${(currentIndex - 1) * 100}%);
    }
    }

    .animate-slideNext {
    animation: slideNext 0.7s ease-out;
    }

    .animate-slidePrev {
    animation: slidePrev 0.7s ease-out;
    }
    `;

  // Particle effect for tech aesthetic
  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAnimationDirection('next');
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const navigate = (direction) => {
    setAnimationDirection(direction);
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return prev === images.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  return (
    <div className="max-w-7xl mx-auto relative overflow-hidden " id="ht2024">
        <ScrollReveal>
        <h1 className='text-center font-potta-one font-normal leading-none text-[#f9f5e3] text-5xl sm:text-8xl md:text-8xl '> HackTrent 2024 </h1>
            <div 
                ref={containerRef}
                className="max-w-7xl mx-auto px-4 py-12"
            >
                {/* Tech-inspired decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-3xl" />
                
                <div className="relative rounded-2xl overflow-hidden bg-gray-900/80 shadow-2xl border border-gray-800">
                <ParticleBackground />
                
                {/* Main carousel */}
                <div className="aspect-[21/9] relative group">
                    <div 
                    className={`absolute w-full h-full transition-transform duration-700 ease-out flex ${
                        animationDirection === 'next' ? 'animate-slideNext' : 'animate-slidePrev'
                    }`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                    {images.map((image, index) => (
                        <div
                        key={index}
                        className="relative w-full h-full flex-shrink-0"
                        >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        {/* Futuristic overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center space-x-2 mb-3">
                                <BrainCircuit className="w-5 h-5 text-blue-400" />
                                <span className="text-blue-400 text-sm font-mono">
                                {image.category}
                                </span>
                            </div>
                            <h3 className="text-white text-3xl font-bold mb-3 font-sans tracking-tight">
                                {image.title}
                            </h3>
                            <p className="text-gray-300 text-lg max-w-2xl">
                                {image.description}
                            </p>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>

                    {/* Navigation controls */}
                    <div className="absolute bottom-8 right-8 flex space-x-3">
                    <button
                        onClick={() => navigate('prev')}
                        className="bg-gray-900/50 hover:bg-gray-900 p-3 rounded-full backdrop-blur-sm transition-all border border-gray-700 hover:border-blue-500 group"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-5 h-5 text-white group-hover:text-blue-400" />
                    </button>
                    <button
                        onClick={() => navigate('next')}
                        className="bg-gray-900/50 hover:bg-gray-900 p-3 rounded-full backdrop-blur-sm transition-all border border-gray-700 hover:border-blue-500 group"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-5 h-5 text-white group-hover:text-blue-400" />
                    </button>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-800 h-1">
                    <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
                    />
                </div>

                {/* Thumbnail navigation */}
                <div className="bg-gray-900/90 p-6 border-t border-gray-800">
                    <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800">
                    {images.map((image, index) => (
                        <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden ${
                            currentIndex === index 
                            ? 'ring-2 ring-blue-500 opacity-100' 
                            : 'opacity-50 hover:opacity-100'
                        }`}
                        >
                        <img
                            src={image.src}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-20 w-36 object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        </ScrollReveal>
    </div>
  );
};

export default PhotoCarousel;

