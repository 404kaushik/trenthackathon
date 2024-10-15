import React from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import '../App.css';

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Trigger confetti animation on component mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-[#f9f5e3] rounded-xl shadow-lg p-10 w-full max-w-2xl text-center mt-32">
        <h2 className="text-5xl font-space-mono font-bold text-gray-800 mb-6">
          Application Submitted!
        </h2>
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xl text-gray-600 mb-8">
          Congratulations! Your application has been successfully submitted. We're excited to review it and will be in touch soon.
        </p>
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-gray-800 text-white px-6 py-3 rounded-md w-full transition duration-300 ease-in-out hover:bg-gray-700"
          >
            Return to Dashboard
          </button>
          <button 
            onClick={() => window.location.href = 'https://hacktrent.ca'}
            className="bg-blue-600 text-white px-6 py-3 rounded-md w-full transition duration-300 ease-in-out hover:bg-blue-500"
          >
            Visit HackTrent Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccess;