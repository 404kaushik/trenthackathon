import React, { useState } from 'react';
import Stars from '../pages/Stars';
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword field
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
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

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      console.log(data);

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '', // Reset confirmPassword
      });
      setSuccessMessage('Successfully registered!');
    } catch (error) {
      console.error(error);
      setErrors({ form: 'Failed to register. Please try again later.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Stars starCount={1000} />
      <form onSubmit={handleSubmit} className="bg-[#f9f5e3] p-8 rounded-[16px] shadow-md max-w-md w-full space-y-4 md:mt-12 relative">
        <h2 className="text-3xl font-bold mb-6 text-center font-potta-one">Register</h2>

        {errors.form && <div className="text-red-500 mb-4">{errors.form}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${errors.name ? 'border-red-500' : ''}`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${errors.password ? 'border-red-500' : ''}`}
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="w-full bg-gray-500 font-semibold text-white py-2 rounded-md md:hover:bg-orange-400 md:hover:font-semibold">Register</button>
      </form>
    </div>
  );
}

export default Register;
