import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import Stars from '../pages/Stars';
import PinkClouds from '../assets/pink-cloud.png';
import { AlertCircle, CheckCircle } from 'lucide-react'; // Import Lucide-React icons
import '../App.css';

function Register() {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5001'
      : 'https://trenthackathon-backend.onrender.com';

    if (!validateForm()) return;

    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to register');

      const data = await response.json();
      console.log(data);

      setIsOtpSent(true);
      setSuccessMessage('OTP sent to your email. Please verify to complete registration.');
    } catch (error) {
      console.error(error);
      setErrors({ form: 'Failed to register. Please try again later.' });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5001'
      : 'https://trenthackathon-backend.onrender.com';

    try {
      console.log('Sending OTP:', formData.otp);  // Log OTP
      console.log('Sending Email:', formData.email);  // Log email

      const response = await fetch(`${baseUrl}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      if (!response.ok) throw new Error('Failed to verify OTP');

      const data = await response.json();
      console.log(data);

      setSuccessMessage('Registration completed successfully! Redirecting to login page...');
      
      // Redirect to the login page after 3 seconds using useNavigate
      setTimeout(() => {
        navigate('/login'); // Use navigate instead of history.push
      }, 3000);

    } catch (error) {
      console.error(error);
      setErrors({ otp: 'Invalid OTP. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Stars starCount={1000} />
      <form onSubmit={isOtpSent ? handleVerifyOtp : handleSubmit} className="bg-[#f9f5e3] p-8 z-10 rounded-[16px] shadow-md max-w-md w-full space-y-4 md:mt-12 relative">
        <h2 className="text-3xl font-bold mb-6 text-center font-potta-one">
          {isOtpSent ? 'Verify OTP' : 'Start here'}
        </h2>

        {/* Displaying Errors */}
        {errors.form && (
          <div className="flex items-center text-red-500 mb-4">
            <AlertCircle className="mr-2" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* Visually Appealing Success Message */}
        {successMessage && (
          <div className="flex items-center bg-green-100 text-green-600 border border-green-300 rounded-md p-3 mb-4">
            <CheckCircle className="mr-2" />
            <span>{successMessage}</span>
          </div>
        )}

        {!isOtpSent ? (
          <>
            <div>
              <label className="block text-gray-700 font-poppins font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${errors.name ? 'border-red-500' : ''}`}
                required
              />
              {errors.name && (
                <p className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-poppins font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                required
              />
              {errors.email && (
                <p className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-poppins font-semibold">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${errors.password ? 'border-red-500' : ''}`}
                required
              />
              {errors.password && (
                <p className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-poppins font-semibold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`}
                required
              />
              {errors.confirmPassword && (
                <p className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button type="submit" className="w-full bg-gray-500 font-semibold text-white py-2 rounded-md md:hover:bg-orange-400 md:hover:font-semibold">
              Register
            </button>
          </>
        ) : (
          <div>
            <label className="block text-gray-700 font-poppins font-semibold">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${errors.otp ? 'border-red-500' : ''}`}
              required
            />
            {errors.otp && (
              <p className="flex items-center text-red-500 text-sm mt-1">
                <AlertCircle className="mr-1" />
                {errors.otp}
              </p>
            )}
            <button type="submit" className="w-full bg-gray-500 font-semibold text-white py-2 rounded-md md:hover:bg-orange-400 md:hover:font-semibold mt-4">
              Verify OTP
            </button>
          </div>
        )}
      </form>
      <div className='galaxy-path cover'>
        <img src={PinkClouds} className='absolute z-10 -bottom-[1rem]' alt="Pink clouds" />
      </div>
    </div>
  );
}

export default Register;
