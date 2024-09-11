import React, { useState } from 'react';
import pdf from '../utils/Package.pdf';
<<<<<<< HEAD
=======
import FAQ from './FAQ'
>>>>>>> c500fd6782f97bebcc176cbdaa99aa6cbf8216ad

const Sponsor = () => {
  const [showPdf, setShowPdf] = useState(false);

  const handlePdfPreview = () => {
    setShowPdf((prevShowPdf) => !prevShowPdf); // Toggle the state
  };

  return (
    <div className="py-12 grid place-items-center">
      <div className="max-w-4xl mx-auto rounded-lg p-8 space-y-8">
        <h1 className="sm:mt-10 lg:mt-20 text-4xl sm:text-6xl md:text-6xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]">
          Sponsorship Packages
        </h1>
        <p className="p-3 text-md md:text-xl font-space-mono text-[#f9f5e3] text-center font-normal leading-loose mt-3 bg-gray-800 rounded-xl">
          Trent University is excited to offer a variety of sponsorship packages for our upcoming hackathon. Choose the package that best suits your company and gain exposure to a diverse group of talented individuals.
        </p>


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
    </div>
  );
};

export default Sponsor;
