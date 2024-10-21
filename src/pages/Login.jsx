import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate to handle navigation
import Header from '../components/Header';
import logo from '../assets/logo2.png';
import ScrollReveal from '../components/ScrollReveal';
import Stars from './Stars';
import PinkClouds from '../assets/pink-cloud.png';
import '../App.css';
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigate
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  useEffect(() =>{
    window.scrollTo(0,0);
  },[])


  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      // Navigate to login
      setIsLoggedIn(true);
      navigate('/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5001'
      : 'https://trenthackathon-backend.onrender.com';
  
    const token = localStorage.getItem('token');
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 
          'Authorization': token ? `Bearer ${token}` : '', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
  
      // Save token in localStorage
      localStorage.setItem('token', data.token);
  
      // Reset isSubmitting to false after successful login
      setIsSubmitting(false);
  
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
  
      // Reset isSubmitting and display error message
      setIsSubmitting(false);
      setError('Login failed. Please check your credentials.');
    }
  };
  
  

  return (
    <div className="custom-gradient">
      <Header />
      <Stars starCount={1000} /> 
      <div className="custom-gradient min-h-screen flex items-center justify-center relative z-10">
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
              className="text-sm font-semibold text-gray-900 hover:text-blue-500 underline"
            >
              Forgot Password?
            </a>
          </div>

          <div className="">
            <a
              href="/register"
              className="text-sm font-semibold text-gray-900 underline hover:text-blue-500"
            >
              Don't have an account?
            </a>
          </div>

          <button type="submit" className="w-full bg-gray-500 font-semibold text-white py-2 rounded-md md:hover:bg-orange-400 md:hover:font-semibold" disabled={isSubmitting}>
            {isSubmitting ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
      <div className='galaxy-path cover'>
        <img src={PinkClouds} className='absolute z-10 -bottom-[1rem]'/>
      </div>
    </div>
  );
}

export default Login;
