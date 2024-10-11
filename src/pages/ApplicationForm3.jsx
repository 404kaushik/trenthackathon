import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

const ApplicationForm3 = () => {
  const [formData, setFormData] = useState(() => {
    // Load saved data from localStorage on component mount
    const savedData = localStorage.getItem('applicationStep3');
    return savedData ? JSON.parse(savedData) : {
      tshirt_size: '',
      dietary_restrictions: [],
      agree_conduct: false,
      share_info: false,
      receive_emails: false,
      share_resume: false,
    };
  });
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const debouncedSave = useCallback(
    debounce((data) => {
      localStorage.setItem('applicationStep3', JSON.stringify(data));
      console.log('Autosaved');
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSave(formData);
  }, [formData, debouncedSave]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDietaryRestrictionsChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setFormData(prevData => ({
      ...prevData,
      dietary_restrictions: selected
    }));
  };

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save the final state to localStorage before submitting
    localStorage.setItem('applicationStep3', JSON.stringify(formData));
    
    const formData = new FormData();
    for (const key in formData) {
      if (key === 'dietary_restrictions') {
        formData.append(key, formData[key].join(','));
      } else {
        formData.append(key, formData[key]);
      }
    }
    
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response.data);
      // Navigate to a success page or next step
      navigate('/application-success');
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center p-6 bg-gray-900 min-h-screen">
        <div className="bg-beige-100 w-full max-w-screen p-8 bg-[#f9f5e3] mt-28 rounded-lg shadow-md">
          {/* Progress Bar */}
          <div className="mb-6 text-center">
            <p className="text-gray-600 text-xl font-space-mono font-bold mb-4">Step 3/4</p>
            <div className="flex justify-center space-x-5">
              <div className="bg-[#f9f5e3] border-black border-2 h-5 w-80"></div>
              <div className="bg-[#f9f5e3] border-black border-2 h-5 w-80"></div>
              <div className="bg-black border-black border-2 h-5 w-80"></div>
              <div className="bg-[#f9f5e3] border-black border-2 h-5 w-80"></div>
            </div>
          </div>
          <h2 className="text-4xl font-space-mono font-bold text-gray-800 mb-6">Event Logistics</h2>
          <div className="space-y-4">
            {/* T-Shirt Size Dropdown */}
            <div>
              <label className="block text-gray-700 font-poppins font-semibold">T-Shirt Size</label>
              <select
                name="tshirt_size"
                value={formData.tshirt_size}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              >
                <option value="">Select an option</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <label className="block text-gray-700 font-poppins font-semibold">Dietary Restrictions</label>
              <select
                multiple
                name="dietary_restrictions"
                value={formData.dietary_restrictions}
                onChange={handleDietaryRestrictionsChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              >
                <option value="None">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="agree_conduct"
                  checked={formData.agree_conduct}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                />
                <span>I agree to the <a href="#" className="text-blue-600 underline">MLH Code of Conduct</a></span>
              </label>

              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="share_info"
                  checked={formData.share_info}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                />
                <span>I consent to sharing my info with Major League Hacking</span>
              </label>

              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="receive_emails"
                  checked={formData.receive_emails}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                />
                <span>I agree to receive emails from Major League Hacking</span>
              </label>
            </div>

            {/* Resume Upload */}
            <div className="border border-gray-300 rounded-md p-4">
              <label className="block text-gray-700 font-semibold">Upload Resume</label>
              <input
                type="file"
                onChange={handleResumeUpload}
                className="w-full text-gray-700 mt-2"
              />
            </div>

            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="share_resume"
                checked={formData.share_resume}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
              />
              <span>I would like to share my resume with potential recruiters.</span>
            </label>

            <div className="flex justify-between">
              {/* Back Button */}
              <div className="text-left">
                <button 
                  type="button" 
                  onClick={() => navigate('/application-2')}
                  className="bg-gray-800 text-white px-6 py-2 rounded-md"
                >
                  Back
                </button>
              </div>
              {/* Submit Button */}
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => navigate('/application-4')}
                  className="bg-gray-800 text-white px-6 py-2 rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ApplicationForm3;