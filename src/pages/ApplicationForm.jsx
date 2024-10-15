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
      phonenumber: '',
    };
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((data) => {
      localStorage.setItem('applicationStep1', JSON.stringify(data));
      console.log('Autosaved');
    }, 500),
    []
  );

   // Validation function to check if all fields are filled
   const validateForm = () => {
    const {
      first_name,
      last_name,
      email,
      age,
      gender,
      pronouns,
      race,
      school,
      major,
      level_of_study,
      country_of_residence,
      phonenumber,
    } = formData;

    if (
      !first_name || 
      !last_name || 
      !email || 
      !age || 
      !gender || 
      !pronouns || 
      !race || 
      !school || 
      !major || 
      !level_of_study || 
      !country_of_residence || 
      !phonenumber
    ) {
      return false;
    }
    return true;
  };

  // Effect for autosave
  useEffect(() => {
    debouncedSave(formData);
  }, [formData, debouncedSave]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError(''); // Clear any previous errors
      navigate('/application-2');
    } else {
      setError('Please fill out all fields before proceeding.');
    }
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
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
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
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
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
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
                required
              />
            </div>


            {/* Phone Number */}
            <div>
              <input 
                type="tel" 
                name="phonenumber"  // Added phonenumber input field
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="+1(---)-(---)-(----)" 
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
                required
              />
            </div>


            {/* Age */}
            <div>
              <select 
                name="age" 
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
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
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
                required
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Choose Not To Say">Choose Not To Say</option>
              </select>
            </div>


            {/* Pronouns */}
            <div>
              <select 
                name="pronouns" 
                value={formData.pronouns}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
              >
                <option>Select Pronouns</option>
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
                <option value="He/They">He/They</option>
                <option value="She/They">She/They</option>
              </select>
            </div>


            {/* Race */}
            <div>
              <select 
                name="race" 
                value={formData.race}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
              >
                <option value="">Select Race</option>
                <option value="Asian">Asian</option>
                <option value="Black or African American">Black or African American</option>
                <option value="White or Caucasian">White or Caucasian</option>
                <option value="Hispanic or Latino">Hispanic or Latino</option>
                <option value="Native American or Alaska Native">Native American or Alaska Native</option>
                <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                <option value="Middle Eastern or North African">Middle Eastern or North African</option>
                <option value="Mixed Race">Mixed Race</option>
                <option value="Other">Other</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
              </select>
            </div>


            {/* School (Canadian Universities) */}
            <div>
              <select 
                name="school" 
                value={formData.school}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
                required
              >
                <option value="">Select School</option>
                <option value="Trent University">Trent University</option>
                <option value="University of Toronto">University of Toronto</option>
                <option value="McGill University">McGill University</option>
                <option value="University of British Columbia">University of British Columbia</option>
                <option value="University of Alberta">University of Alberta</option>
                <option value="University of Calgary">University of Calgary</option>
                <option value="University of Ottawa">University of Ottawa</option>
                <option value="Western University">Western University</option>
                <option value="Queen's University">Queen's University</option>
                <option value="University of Waterloo">University of Waterloo</option>
                <option value="York University">York University</option>
                <option value="Simon Fraser University">Simon Fraser University</option>
                <option value="Dalhousie University">Dalhousie University</option>
                <option value="University of Victoria">University of Victoria</option>
                <option value="Carleton University">Carleton University</option>
                <option value="Concordia University">Concordia University</option>
                <option value="Université de Montréal">Université de Montréal</option>
                <option value="Université Laval">Université Laval</option>
                <option value="Brock University">Brock University</option>
                <option value="University of Manitoba">University of Manitoba</option>
                <option value="University of Saskatchewan">University of Saskatchewan</option>
                <option value="Memorial University of Newfoundland">Memorial University of Newfoundland</option>
                <option value="Ryerson University (Toronto Metropolitan University)">Ryerson University (Toronto Metropolitan University)</option>
                <option value="Université du Québec à Montréal (UQAM)">Université du Québec à Montréal (UQAM)</option>
                <option value="Université de Sherbrooke">Université de Sherbrooke</option>
                <option value="Wilfrid Laurier University">Wilfrid Laurier University</option>
                <option value="University of New Brunswick">University of New Brunswick</option>
                <option value="University of Guelph">University of Guelph</option>
                <option value="McMaster University">McMaster University</option>
                <option value="Mount Allison University">Mount Allison University</option>
                <option value="St. Francis Xavier University">St. Francis Xavier University</option>
                <option value="Other">Other</option>
              </select>
            </div>


            {/* Major/Field */}
            <div>
              <input 
                type="text" 
                name="major" 
                value={formData.major}
                onChange={handleChange}
                placeholder="Major/Field" 
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
              />
            </div>


            {/* Level of Study */}
            <div>
              <select 
                name="level_of_study" 
                value={formData.level_of_study}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
              >
                <option>Select Level of Study</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Diploma">Diploma</option>
                <option value="Certificate">Certificate</option>
                <option value="Doctoral">Doctoral</option>
                <option value="Postdoctoral">Postdoctoral</option>
                <option value="High School">High School</option>
                <option value="Professional Development">Professional Development</option>
                <option value="Continuing Education">Continuing Education</option>
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
                className="w-full px-4 py-3 rounded-md bg-white border focus:ring-blue-200"
              />
            </div>
            

            {/* Display error message */}
            {error && <p className="text-red-500">{error}</p>}


            {/* Next Button */}            
            <div className="text-right">
              <button 
                type="submit" 
                className="bg-gray-800 text-white px-6 py-2 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
