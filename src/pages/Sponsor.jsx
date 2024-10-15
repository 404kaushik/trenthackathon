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
import bestbuy from '../assets/best-buy.png';
import tcsa from '../assets/tcsa1.jpg'
import ScrollReveal from '../components/ScrollReveal';
import './Sponsor.css';

const logos = [
  { name: 'Cluster', src: cluster },
  { name: 'Trail', src: trail },
  { name: 'Champlain', src: champlain },
  { name: 'Ontonabbe', src: ontonabbe },
  { name: 'Lady', src: lady },
  { name: 'Gzowski', src: gzowski },
  { name: 'Best Buy', src: bestbuy },
  { name: 'TCSA', src: tcsa },
  { name: 'PWD', src: pwd },
];

const LogoSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrameId;
    let startPosition = 0;

    const scrollSlider = () => {
      startPosition += 1; // Increase the scroll speed by changing this value
      if (slider.scrollWidth - slider.clientWidth <= startPosition) {
        // Reset to the start once the scroll reaches the end
        startPosition = 0;
      }
      slider.scrollLeft = startPosition;
      animationFrameId = requestAnimationFrame(scrollSlider);
    };

    animationFrameId = requestAnimationFrame(scrollSlider);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[] rounded-[20px] md:mt-20">
      <h1 className="text-4xl sm:text-6xl md:text-6xl text-center font-potta-one font-normal leading-none text-[#f9f5e3] py-4">
        Our Sponsors
      </h1>
      <div
        className="flex overflow-hidden py-4 whitespace-nowrap gap-5"
        ref={sliderRef}
      >
        {[...logos, ...logos].map((logo, index) => (
          <img
            key={`${logo.name}-${index}`}
            src={logo.src}
            alt={`${logo.name} Logo`}
            className="w-36 h-auto object-contain inline-block py-4"
          />
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