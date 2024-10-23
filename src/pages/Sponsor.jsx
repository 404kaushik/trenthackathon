import React, { useState, useEffect, useRef } from 'react';
import pdf from '../utils/Package.pdf';
import FAQ from './FAQ';
import cluster from '../assets/cluster3.png';
import trail from '../assets/trail.png';
import champlain from '../assets/Champlain.png';
import ontonabbe from '../assets/ontonabee.png';
import lady from '../assets/lady.png';
import gzowski from '../assets/gzowski.png';
import pwd from '../assets/1pwd4.png';
import bestbuy from '../assets/bb5.png';
import tcsa from '../assets/tcsa2.png'
import ScrollReveal from '../components/ScrollReveal';
import Osmows from '../assets/osmows3.png';
import Chatime from '../assets/chatime.svg';
import './Sponsor.css';

const logosTier1 = [
  { name: 'TCSA', src: tcsa, tier: 1 },
  { name: 'Osmows', src: Osmows, tier: 1},
  { name: 'Chatime', src: Chatime, tier: 1},
];

const logosTier2 = [
  { name: 'Innovation Cluster', src: cluster, tier: 2 },
  { name: 'Trail College', src: trail, tier: 2 },
  { name: 'Champlain College', src: champlain, tier: 2 },
  { name: 'Ontonabbe College', src: ontonabbe, tier: 2 },
  { name: 'Lady Eaton College', src: lady, tier: 2 },
  { name: 'Gzowski College', src: gzowski, tier: 2 },
  { name: 'Best Buy', src: bestbuy, tier: 2 },
  { name: '1Password', src: pwd, tier: 2 },
];

const LogoSlider = () => {
  const tier2SliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const slider = tier2SliderRef.current;
    let animationFrameId;
    let startPosition = 0;
    
    const scrollSlider = () => {
      if (!isHovered) {
        startPosition += 0.4;
        if (slider && (slider.scrollWidth / 2 <= startPosition)) {
          startPosition = 0;
        }
        if (slider) {
          slider.scrollLeft = startPosition;
        }
      }
      animationFrameId = requestAnimationFrame(scrollSlider);
    };

    animationFrameId = requestAnimationFrame(scrollSlider);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <div id='sponsor' className="relative overflow-hidden rounded-xl md:rounded-[20px] px-4 md:px-8 py-6 md:py-8 w-full max-w-[85vw] mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl text-center font-potta-one font-normal leading-none text-[#f9f5e3] pb-8 md:pb-12">
          Our Sponsors
        </h1>

        {/* Tier 1 Sponsors */}
        <div className="mb-8 md:mb-16">
          <h2 className="text-xl md:text-2xl text-[#f9f5e3] text-center mb-6 md:mb-8 font-space-mono">
            Diamond Partners
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-8">
            {logosTier1.map((logo, index) => (
              <div 
                key={`${logo.name}-${index}`} 
                className="relative overflow-hidden bg-white backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20 border border-white/10 group w-full sm:w-auto"
              >
                <div className="w-full sm:w-[200px] md:w-[280px] h-[80px] md:h-[140px] flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={`${logo.name} Logo`}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2 Sponsors */}
        <div className="relative mt-8 md:mt-20">
          <h2 className="text-lg md:text-xl text-[#f9f5e3] text-center mb-6 md:mb-8 font-space-mono">
            Supporting Partners
          </h2>
          
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0B0B2A] to-transparent z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0B0B2A] to-transparent z-20"></div>
          
          <div 
            ref={tier2SliderRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="inline-flex gap-4 md:gap-8 animate-scroll py-4">
              {[...logosTier2, ...logosTier2].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-3 md:p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/10 group"
                >
                  <div className="h-16 w-32 md:h-20 md:w-40 flex items-center justify-center overflow-hidden">
                    <img
                      src={logo.src}
                      alt={`${logo.name} Logo`}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110 filter brightness-100 group-hover:brightness-110"
                    />
                  </div>
                  <div className="h-0 group-hover:h-12 transition-all duration-300 overflow-hidden">
                    <p className="text-center mt-2 text-[#f9f5e3] text-sm md:text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {logo.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

// const Sponsor = () => {
//   const [showPdf, setShowPdf] = useState(false);

//   const handlePdfPreview = () => {
//     setShowPdf((prevShowPdf) => !prevShowPdf);
//   };

//   return (
//     <div id="sponsor" className="py-8 md:py-12 grid place-items-center px-4">
//       <div className="w-full max-w-4xl mx-auto rounded-lg p-4 md:p-8 space-y-6 md:space-y-8">
//         <ScrollReveal>
//           <h1 className="mt-4 sm:mt-6 lg:mt-20 text-3xl sm:text-4xl md:text-6xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]">
//             Sponsorship Packages
//           </h1>
//           <p className="p-3 text-sm md:text-xl font-space-mono text-[#f9f5e3] text-center font-normal leading-loose mt-3 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl border border-white/10">
//             Trent University is excited to offer a variety of sponsorship packages for our upcoming hackathon. Choose the package that best suits your company and gain exposure to a diverse group of talented individuals.
//           </p>
//         </ScrollReveal>

//         <ScrollReveal>
//           <div className="mt-6 md:mt-8 text-center space-y-4 md:space-y-0 md:space-x-4">
//             <p className="p-2 md:p-3 text-sm md:text-xl font-space-mono text-[#f9f5e3] text-center font-normal leading-loose rounded-xl">
//               For more details...
//             </p>
//             <button
//               onClick={handlePdfPreview}
//               className="w-full md:w-auto bg-blue-600/80 backdrop-blur-sm text-white text-xs md:text-base py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 border border-blue-400/20 mb-2 md:mb-0"
//             >
//               {showPdf ? 'Close Preview' : 'Preview Package'}
//             </button>
//             <a
//               href={pdf}
//               download
//               className="inline-block w-full md:w-auto bg-green-600/80 backdrop-blur-sm text-white text-xs md:text-base py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 border border-green-400/20"
//             >
//               Download Package
//             </a>
//           </div>
//         </ScrollReveal>

//         {showPdf && (
//           <div className="mt-6 md:mt-8 w-full">
//             <iframe
//               src={pdf}
//               className="w-full h-[24rem] md:h-[32rem] rounded-lg shadow-lg"
//               title="Sponsorship Package PDF"
//             />
//           </div>
//         )}
//       </div>
//       <ScrollReveal>
//         <LogoSlider />
//       </ScrollReveal>
//     </div>
//   );
// };

export default LogoSlider;
