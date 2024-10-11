import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

function ApplicationForm() {
  const [formData, setFormData] = useState(() => {
    // Load saved data from localStorage on component mount
    const savedData = localStorage.getItem('applicationStep1');
    return savedData ? JSON.parse(savedData) : {
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      gender: '',
      pronouns: '',
      race: '',
      school: '',
      major: '',
      level_of_study: '',
      country_of_residence: '',
    };
  });

  const navigate = useNavigate();

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((data) => {
      localStorage.setItem('applicationStep1', JSON.stringify(data));
      console.log('Autosaved');
    }, 500),
    []
  );

  // Effect for autosave
  useEffect(() => {
    debouncedSave(formData);
  }, [formData, debouncedSave]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/application-2');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 mt-28 p-4">
      <div className="bg-[#f9f5e3] rounded-xl shadow-lg p-10 w-screen">
        {/* Progress Bar */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 text-xl font-space-mono font-bold mb-4">Step 1/4</p>
          <div className="flex justify-center space-x-5">
            <div className="bg-black h-5 w-80"></div>
            <div className="bg-[#f9f5e3] border-black border-2 h-5 w-80"></div>
            <div className="bg-[#f9f5e3] border-black border-2 h-5 w-80"></div>
            <div className="bg-[#f9f5e3] border-black border-2 h-5 w-80"></div>
          </div>
        </div>

        {/* Form Title */}
        <h2 className="text-center text-5xl font-semibold font-space-mono text-gray-700 mb-8">General Information</h2>

        {/* Form */}
        <form onSubmit={handleNext}>
          <div className="space-y-6">
            {/* First Name */}
            <div>
              <input 
                type="text" 
                name="first_name" 
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name" 
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <input 
                type="text" 
                name="last_name" 
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name" 
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address" 
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
                required
              />
            </div>

            {/* Age */}
            <div>
              <select 
                name="age" 
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
                required
              >
                <option>Select Age</option>
                <option value="18-24">18-24</option>
                <option value="25-30">25-30</option>
                <option value="31-40">31-40</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <select 
                name="gender" 
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
                required
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Pronouns */}
            <div>
              <select 
                name="pronouns" 
                value={formData.pronouns}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
              >
                <option>Select Pronouns</option>
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
              </select>
            </div>

            {/* Race */}
            <div>
              <select 
                name="race" 
                value={formData.race}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
              >
                <option>Select Race</option>
                <option value="Asian">Asian</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
              </select>
            </div>

            {/* School */}
            <div>
              <input 
                type="text" 
                name="school" 
                value={formData.school}
                onChange={handleChange}
                placeholder="Select School" 
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
              />
            </div>

            {/* Major/Field */}
            <div>
              <input 
                type="text" 
                name="major" 
                value={formData.major}
                onChange={handleChange}
                placeholder="Select Major/Field" 
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
              />
            </div>

            {/* Level of Study */}
            <div>
              <select 
                name="level_of_study" 
                value={formData.level_of_study}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
              >
                <option>Select Level of Study</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>

            {/* Country of Residence */}
            <div>
              <input 
                type="text" 
                name="country_of_residence" 
                value={formData.country_of_residence}
                onChange={handleChange}
                placeholder="Select Country of Residence" 
                className="w-full px-4 py-3 rounded-md bg-white border focus:outline-none"
              />
            </div>
            {/* Next Button */}
            <div className="text-right">
              <a href="/application-2">
                <button 
                  type="submit" 
                  className="bg-gray-800 text-white px-6 py-2 rounded-md"
                >
                  Next
                </button>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
