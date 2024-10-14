import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate to handle navigation
import Header from '../components/Header';
import logo from '../assets/logo2.png';
import ScrollReveal from '../components/ScrollReveal';
import Stars from './Stars';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigate
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };


  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      // Navigate to login
      navigate('/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Determine the base URL based on the environment (development or production)
    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5001'
      : 'https://trenthackathon-backend.onrender.com';
  
    // Get the token from localStorage (if it exists)
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 
          'Authorization': token ? `Bearer ${token}` : '',  // Only include token if it exists
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
  
      // Save token in localStorage (assuming the backend returns a JWT token)
      localStorage.setItem('token', data.token);
  
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials.');
    }
  };
  

  return (
    <div className="custom-gradient">
      <nav className="bg-[#1C1D21] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b-2 border-gray-200 dark:border-gray-600">
      <ScrollReveal>
        <div className="w-screen flex items-center justify-between mx-auto p-6 box-border">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-16 object-cover hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out" alt="HackTrent Logo" />
          </a>
          <div className="flex-grow flex items-center justify-center">
          
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={handleAuthButtonClick}
              className="text-black font-semibold bg-[#f9f5e3] md:hover:bg-orange-400 md:hover:text-white hover:bg-blue-700 px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </ScrollReveal>
    </nav>
    <Stars starCount={1000} /> 
      <div className="custom-gradient min-h-screen flex items-center justify-center relative">
        <form onSubmit={handleSubmit} className="bg-[#f9f5e3] p-8 rounded-[16px] shadow-md max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center font-potta-one ">Login</h2>

          {error && <p className="text-red-500">{error}</p>}

          <div className='mb-6'>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="text-right mb-6">
            <a
              href="/forgot-password"
              className="text-sm font-semibold text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <div className="">
            <a
              href="/register"
              className="text-sm font-semibold text-gray-900 hover:underline"
            >
              Don't have an account?
            </a>
          </div>

          <button type="submit" className="w-full bg-gray-500 font-semibold text-white py-2 rounded-md md:hover:bg-orange-400 md:hover:font-semibold">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
