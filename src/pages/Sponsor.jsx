import React, { useState, useEffect, useRef } from 'react';
import pdf from '../utils/Package.pdf';
import FAQ from './FAQ';
import cluster from '../assets/cluster2.png';
import trail from '../assets/trail.png';
import champlain from '../assets/Champlain.png';
import ontonabbe from '../assets/ontonabee.png';
import lady from '../assets/lady.png';
import gzowski from '../assets/gzowski.png';
import pwd from '../assets/1pwd4.png';
import bestbuy from '../assets/bb5.png';
import tcsa from '../assets/tcsa1.jpg'
import ScrollReveal from '../components/ScrollReveal';
import Osmows from '../assets/osmows.webp';
import Chatime from '../assets/chatime.svg';
import './Sponsor.css';

const logosTier1 = [
  { name: 'TCSA', src: tcsa, tier: 1 },
  { name: 'Osmows', src: Osmows, tier: 1},
  { name: 'Chatime', src: Chatime, tier: 1},
]
// className:'w-36 h-auto object-contain inline-block py-4'
const logosTier2 = [
  { name: 'Cluster', src: cluster, tier: 2, className:'w-36 h-auto object-contain inline-block py-4'},
  { name: 'Trail', src: trail , tier: 2, className:'w-36 h-auto object-contain inline-block py-4'},
  { name: 'Champlain', src: champlain, tier: 2, className:'w-36 h-auto object-contain inline-block py-4' },
  { name: 'Ontonabbe', src: ontonabbe , tier: 2, className:'w-36 h-auto object-contain inline-block py-4'},
  { name: 'Lady', src: lady , tier : 2, className:'w-36 h-auto object-contain inline-block py-4'},
  { name: 'Gzowski', src: gzowski, tier: 2, className:'w-36 h-auto object-contain inline-block py-4'},
  { name: 'Best Buy', src: bestbuy, tier: 2, className:'w-36 h-auto object-contain inline-block py-4'},
  { name: 'PWD', src: pwd, tier: 2, className:'w-36 h-auto object-contain inline-block py-4'},
];

const LogoSlider = () => {
  const sliderRef = useRef(null);

  // SCROLL ANIMATION TEMPORARILY REMOVED UNLESS THERE'S MORE SPONSORS
  // useEffect(() => {
  //   const slider = sliderRef.current;
  //   let animationFrameId;
  //   let startPosition = 0;

  //   const scrollSlider = () => {
  //     startPosition += 1; // Increase the scroll speed by changing this value
  //     if (slider.scrollWidth - slider.clientWidth <= startPosition) {
  //       // Reset to the start once the scroll reaches the end
  //       startPosition = 0;
  //     }
  //     slider.scrollLeft = startPosition;
  //     animationFrameId = requestAnimationFrame(scrollSlider);
  //   };

  //   animationFrameId = requestAnimationFrame(scrollSlider);

  //   return () => cancelAnimationFrame(animationFrameId);
  // }, []);

  return (
    <div className="relative overflow-hidden bg-[] rounded-[20px] md:mt-20">
      <h1 className="text-4xl sm:text-6xl md:text-6xl text-center font-potta-one font-normal leading-none text-[#f9f5e3] py-4">
        Our Sponsors
      </h1>
      <div
        className="flex flex-wrap md:flex-nowrap gap-4 justify-center mt-[3rem] items-center"
        ref={sliderRef}
      >
        {[...logosTier1].map((logo, index) => (
          <div className='w-full md:w-[15rem] flex items-center justify-center rounded-xl bg-white overflow-hidden md:py-0'>
            <img
              key={`${logo.name}-${index}`}
              src={logo.src}
              alt={`${logo.name} Logo`}
              className='h-[6rem] md:h-[7rem] p-5 md:p-5'
            />
          </div>
        ))}
      </div>
      <div className='flex mt-[3rem] justify-center flex-wrap'>
      {[...logosTier2].map((logo, index) => (
        <div className='h-[7.5rem]'>
          <img
            key={`${logo.name}-${index}`}
            src={logo.src}
            alt={`${logo.name} Logo`}
            className='h-[100%]'
          />
        </div>
        ))}
      </div>
    </div>
  );
};


const Sponsor = () => {
  const [showPdf, setShowPdf] = useState(false);

  const handlePdfPreview = () => {
    setShowPdf((prevShowPdf) => !prevShowPdf);
  };

  return (
    <div id="sponsor" className="py-12 grid place-items-center">
      <div className="max-w-4xl mx-auto rounded-lg p-8 space-y-8">
        <ScrollReveal>
          <h1 className="sm:mt-10 lg:mt-20 text-4xl sm:text-6xl md:text-6xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]">
            Sponsorship Packages
          </h1>
          <p className="p-3 text-md md:text-xl font-space-mono text-[#f9f5e3] text-center font-normal leading-loose mt-3 bg-gray-800 rounded-xl">
            Trent University is excited to offer a variety of sponsorship packages for our upcoming hackathon. Choose the package that best suits your company and gain exposure to a diverse group of talented individuals.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-8 text-center space-x-4">
            <p className="p-3 text-md md:text-xl font-space-mono text-[#f9f5e3] text-center font-normal leading-loose mt-3 rounded-xl">
              For more details...
            </p>
            <button
              onClick={handlePdfPreview}
              className="bg-blue-600 text-white text-xs md:text-base py-2 md:px-4 p-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {showPdf ? 'Close Preview' : 'Preview Package'}
            </button>
            <a
              href={pdf}
              download
              className="bg-green-600 text-white text-xs md:text-base py-2 md:px-4 p-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Download Package
            </a>
          </div>
        </ScrollReveal>

        {showPdf && (
          <div className="mt-8 w-full">
            <iframe
              src={pdf}
              className="w-full h-[32rem] rounded-lg shadow-lg"
              title="Sponsorship Package PDF"
            ></iframe>
          </div>
        )}
      </div>
      <ScrollReveal>
        <LogoSlider />
      </ScrollReveal>
    </div>
  );
};

export default Sponsor;