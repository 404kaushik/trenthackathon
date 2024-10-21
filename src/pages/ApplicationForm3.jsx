import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { AlertCircle } from 'lucide-react';

const ApplicationForm3 = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('applicationStep3');
    return savedData ? JSON.parse(savedData) : {
      tshirt_size: '',
      dietary_restrictions: [],
      code_of_conduct: false,
      share_info: false,
      receive_emails: false,
      share_resume: false,
      resume_url: '',
    };
  });

  const [errors, setErrors] = useState({});
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
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleResumeUrlChange = (e) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      resume_url: value
    }));
  };

  const handleDietaryRestrictionsChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData(prevData => ({
      ...prevData,
      dietary_restrictions: selected
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'tshirt_size':
        return value ? '' : 'T-shirt size is required';
      case 'dietary_restrictions':
        return value.length ? '' : 'Please select at least one option';
      case 'resume_url':
        return value ? '' : 'Please enter a resume URL';
      case 'code_of_conduct':
        return value ? '' : 'You must agree to the Code of Conduct';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      localStorage.setItem('applicationStep3', JSON.stringify(formData));
      navigate('/application-4');
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementsByName(firstErrorField)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center p-6 bg-gray-900 min-h-screen">
        <div className="bg-beige-100 w-full max-w-screen p-8 bg-[#f9f5e3] mt-28 rounded-lg shadow-md">
          {/* Progress Bar */}
          <div className="mb-6 text-center">
            <p className="text-gray-600 text-lg sm:text-3xl font-space-mono font-bold mb-4">Step 3/4</p>
            <div className="flex justify-center space-x-2">
              <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
              <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
              <div className="bg-black h-2 w-1/4 rounded-full"></div>
              <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
            </div>
          </div>

          {/* Form Title */}
          <h2 className="text-center text-3xl sm:text-5xl font-semibold font-space-mono text-gray-700 mb-8">Event Logistics</h2>
          <div className="space-y-4">
            {/* T-Shirt Size Dropdown */}
            <div>
              <label className="block text-gray-700 font-poppins font-semibold">T-Shirt Size</label>
              <select
                name="tshirt_size"
                value={formData.tshirt_size}
                onChange={handleInputChange}
                className={`w-full p-2 border ${errors.tshirt_size ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-blue-200`}
              >
                <option value="">Select an option</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
              {errors.tshirt_size && <p className="text-red-500 text-sm mt-1">{errors.tshirt_size}</p>}
            </div>

            {/* Dietary Restrictions */}
            <div>
              <label className="block text-gray-700 font-poppins font-semibold">Dietary Restrictions</label>
              <select
                multiple
                name="dietary_restrictions"
                value={formData.dietary_restrictions}
                onChange={handleDietaryRestrictionsChange}
                className={`w-full p-2 border ${errors.dietary_restrictions ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-blue-200`}
              >
                <option value="None">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </select>
              {errors.dietary_restrictions && <p className="text-red-500 text-sm mt-1">{errors.dietary_restrictions}</p>}
            </div>

            {/* Checkboxes */}
            <label className={`flex items-center space-x-2 ${errors.code_of_conduct ? 'text-red-500' : ''}`}>
              <input 
                type="checkbox" 
                name="code_of_conduct"
                checked={formData.code_of_conduct}
                onChange={handleInputChange}
                className={`h-4 w-4 text-blue-600 border-gray-300 rounded ${errors.code_of_conduct ? 'border-red-500' : ''}`}
                style={{ height: '16px', width: '16px' }}
              />
              <span>
                I have read and agree to the <a href='https://mlh.io/code-of-conduct' className="text-blue-600 underline">MLH Code of Conduct</a>.
              </span>
            </label>
            {errors.code_of_conduct && <p className="text-red-500 text-sm mt-1">{errors.code_of_conduct}</p>}

            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="share_info"
                checked={formData.share_info}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                style={{ height: '16px', width: '16px' }}
              />
              <span>
                I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the <a href='https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md' className="text-blue-600 underline">MLH Privacy Policy</a>.
                <br/>
                I further agree to the terms of both the <a href='https://github.com/MLH/mlh-policies/blob/main/contest-terms.md' className="text-blue-600 underline">MLH Contest Terms and Conditions</a> and the <a href='https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md' className="text-blue-600 underline">MLH Privacy Policy</a>.
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="receive_emails"
                checked={formData.receive_emails}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                style={{ height: '16px', width: '16px' }}
              />
              <span>
                I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.
              </span>
            </label>

            {/* Resume URL Input */}
            <div>
              <label className="block text-gray-700 font-poppins font-semibold">Resume (Google Drive URL)</label>
              <input 
                type="text" 
                name="resume_url" 
                value={formData.resume_url}
                onChange={handleResumeUrlChange}
                placeholder="Please share resume URL" 
                className={`w-full px-4 py-3 rounded-md bg-white text-black border ${errors.resume_url ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-200`}
              />
              {errors.resume_url && <p className="text-red-500 text-sm mt-1">{errors.resume_url}</p>}
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
                  className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300 text-sm sm:text-base"
                >
                  Back
                </button>
              </div>
              {/* Submit Button */}
              <div className="text-right">
                <button 
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300 text-sm sm:text-base"
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