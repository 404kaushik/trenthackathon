import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Stars from './Stars';
import logo from '../assets/application-logo.png';
import InstagramLogo from '../assets/black-instagram-icon.svg';
import linkedin from '../assets/linkedin-square-icon.svg';
import discord from '../assets/discord-round-black-icon.svg';
import github from '../assets/github-icon.svg';

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Use navigate to route the user to the application form

  // Function to fetch user data
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');

    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5001'
      : 'https://trenthackathon-backend.onrender.com';
    
    if (!token) {
      setError('Unauthorized access. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/dashboard`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        setError('Session expired. Please log in again.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to load dashboard');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to handle application submission
  const handleSubmitApplication = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://trenthackathon-backend.onrender.com/submit-application', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const data = await response.json();
      alert(data.message);
      
      // Re-fetch user data to get the updated application status
      fetchUserData();
    } catch (error) {
      console.error(error);
      setError('Failed to submit application');
    }
  };

  // Navigate to the application form
  const handleApplyNowClick = () => {
    navigate('/application'); // Assuming /application-form is the route for your form
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Set the default application status to "Not Started" if there's no status
  const applicationStatus = userData.application_status || 'Not Started';

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white mt-16">
      <Stars starCount={1000} />
      <main className="container mx-auto mt-8 p-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hack Trent Information Card */}
          <div className="bg-[#f9f5e3] rounded-[50px] p-4 row-span-2 text-black">
            <img src={logo} alt="Hack Trent Logo" className="w-full h-96 rounded-[50px] object-cover mb-4" />
            <div className="flex flex-col justify-end p-2">
              <h2 className="text-4xl font-bold mb-2 font-poppins">HackTrent</h2>
              <p className="text-md font-poppins">Date: November 8 to 10</p>
              <p className="text-md font-poppins">Duration: 48 Hours of Hacking</p>
            </div>
          </div>

          {/* Application Status Card */}
          <div className="bg-[#f9f5e3] rounded-[50px] p-6 col-span-2 text-black">
            <h3 className="text-5xl font-bold mb-2 font-space-mono">Current Application Status</h3>
            <p className="text-3xl font-bold font-poppins">
              Status: <span className={
                          applicationStatus === 'In Review'
                            ? 'text-yellow-500'
                            : applicationStatus === 'Accepted'
                            ? 'text-green-500'
                            : 'text-orange-500'
                        }>
                          {applicationStatus}
                        </span>
            </p>
            <p className="text-gray-800 mt-2 font-poppins"><span className="font-bold">Application Due Date:</span> November 1, 2024</p>
            
            {applicationStatus === 'In Review' || applicationStatus === 'Accepted' ? (              
              <button 
                disabled
                className="mt-4 bg-gray-500 px-4 py-2 rounded-[12px] text-white font-semibold font-poppins cursor-not-allowed"
              >
                Application Submitted
              </button>              
            ) : (
              <button 
                onClick={handleApplyNowClick}
                className="mt-4 bg-purple-600 px-4 py-2 rounded-[12px] text-white font-semibold font-poppins hover:bg-orange-700 transition-colors duration-100"
              >
                Apply Now
              </button>
            )}
          </div>

          {/* Welcome Section */}
          <div className="bg-[#f9f5e3] rounded-[50px] p-6 col-span-2 text-black">
            <h2 className="text-3xl font-bold font-poppins mb-4">Hello, {userData.name || '{$FirstName}'}!</h2>
            <p className="text-md mb-4 font-poppins">
              Welcome to Hack Trent 2024! This hackathon is the fifth edition of Trent University's esteemed
              hackathon series, formerly known as Electric City Hacks. After 5 years, Hack Trent is back!
            </p>
            <h3 className="text-2xl font-bold mb-4 font-poppins">Our Socials</h3>
            <div className="flex justify-center space-x-6">
              <a href="https://www.instagram.com/hacktrentu/" target="_blank" rel="noopener noreferrer">
                <img src={InstagramLogo} alt="Instagram" className="w-24 h-16 text-black" />
              </a>
              <a href="https://www.linkedin.com/company/hack-trent/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="LinkedIn" className="w-24 h-16 text-black" />
              </a>
              <a href="https://discord.gg/XwhG9KVY" target="_blank" rel="noopener noreferrer">
                <img src={discord} alt="Discord" className="w-24 h-16 text-black" />
              </a>
              <a href="https://github.com/orgs/Trent-Computer-Science-Club-Association/dashboard" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="GitHub" className="w-24 h-16 text-black" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
