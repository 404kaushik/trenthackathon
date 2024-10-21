import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { AlertCircle } from 'lucide-react';
import Header from '../components/Header';

function ApplicationForm() {
  const [formData, setFormData] = useState(() => {
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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const debouncedSave = useCallback(
    debounce((data) => {
      localStorage.setItem('applicationStep1', JSON.stringify(data));
      console.log('Autosaved');
    }, 500),
    []
  );

  const validateField = (name, value) => {
    switch (name) {
      case 'first_name':
      case 'last_name':
        return value.trim() ? '' : 'This field is required';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
      case 'phonenumber':
        return /^\+?1?\d{10,14}$/.test(value) ? '' : 'Invalid phone number';
      case 'age':
        return value ? '' : 'Please select your age';
      case 'gender':
      case 'pronouns':
      case 'race':
      case 'school':
      case 'level_of_study':
        return value ? '' : 'Please make a selection';
      case 'major':
      case 'country_of_residence':
        return value.trim() ? '' : 'This field is required';
      default:
        return '';
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    debouncedSave(formData);
  }, [formData, debouncedSave]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      navigate('/application-2');
    } else {
      setErrors(newErrors);
    }
  };

  const renderField = (name, label, type = 'text', options = null) => {
    const inputClasses = `w-full px-4 py-3 rounded-md bg-white border ${
      errors[name] ? 'border-red-500' : 'border-gray-300'
    } focus:ring-blue-200 transition duration-300`;

    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-poppins font-semibold mb-2">{label}</label>
        {type === 'select' ? (
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={`Enter ${label}`}
            className={inputClasses}
          />
        )}
        {errors[name] && (
          <div className="text-red-500 mt-1 flex items-center text-sm">
            <AlertCircle size={16} className="mr-1 flex-shrink-0" />
            <span>{errors[name]}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="bg-[#f9f5e3] rounded-xl shadow-lg p-6 sm:p-8 md:p-10 w-full md:mt-24 max-w-xl-screen">
        <div className="mb-6 text-center">
          <p className="text-gray-600 text-lg sm:text-3xl font-space-mono font-bold mb-4">Step 1/4</p>
          <div className="flex justify-center space-x-2">
            <div className="bg-black h-2 w-1/4 rounded-full"></div>
            <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
            <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
            <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
          </div>
        </div>

        <h2 className="text-center text-3xl sm:text-5xl font-semibold font-space-mono text-gray-700 mb-8">General Information</h2>

        <form onSubmit={handleNext} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderField('first_name', 'First Name')}
            {renderField('last_name', 'Last Name')}
          </div>
          {renderField('email', 'Email Address', 'email')}
          {renderField('phonenumber', 'Phone Number', 'tel')}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderField('age', 'Age', 'select', Array.from({ length: 26 }, (_, i) => (i + 15).toString()))}
            {renderField('gender', 'Gender', 'select', ['Male', 'Female', 'Other', 'Choose Not To Say'])}
          </div>
          {renderField('pronouns', 'Pronouns', 'select', ['He/Him', 'She/Her', 'They/Them', 'He/They', 'She/They'])}
          {renderField('race', 'Race', 'select', ['Asian', 'Black or African American', 'White or Caucasian', 'Hispanic or Latino', 'South Asian', 'Native American or Alaska Native', 'Native Hawaiian or Other Pacific Islander', 'Middle Eastern or North African', 'Mixed Race', 'Other', 'Prefer Not to Say'])}
          {renderField('school', 'School', 'select', ['Trent University', 'University of Toronto', 'McGill University', 'University of British Columbia', 'University of Alberta', 'University of Calgary', 'University of Ottawa', 'Western University', 'Queen\'s University', 'University of Waterloo', 'York University', 'Simon Fraser University', 'Dalhousie University', 'University of Victoria', 'Carleton University', 'Concordia University', 'Université de Montréal', 'Université Laval', 'Brock University', 'University of Manitoba', 'University of Saskatchewan', 'Memorial University of Newfoundland', 'Ryerson University (Toronto Metropolitan University)', 'Université du Québec à Montréal (UQAM)', 'Université de Sherbrooke', 'Wilfrid Laurier University', 'University of New Brunswick', 'University of Guelph', 'McMaster University', 'Mount Allison University', 'St. Francis Xavier University', 'Other'])}
          {renderField('major', 'Major/Field')}
          {renderField('level_of_study', 'Level of Study', 'select', ['High School', 'Diploma', 'Certificate', 'Undergraduate', 'Graduate', 'Professional Development', 'Continuing Education', 'Doctoral', 'Postdoctoral'])}
          {renderField('country_of_residence', 'Country of Residence')}

          <div className="text-right">
            <button 
              type="submit" 
              className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300 text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;