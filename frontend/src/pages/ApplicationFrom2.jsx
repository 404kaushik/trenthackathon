import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

function ApplicationForm2() {
    const [formData, setFormData] = useState(() => {
        // Load saved data from localStorage on component mount
        const savedData = localStorage.getItem('applicationStep2');
        return savedData ? JSON.parse(savedData) : {
          question1: '',
          question2: '',
        };
    });

    const navigate = useNavigate();

    const debouncedSave = useCallback(
        debounce((data) => {
          localStorage.setItem('applicationStep2', JSON.stringify(data));
          console.log('Autosaved');
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSave(formData);
    }, [formData, debouncedSave]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value.length <= 1000) {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };
    
    const handleNext = (e) => {
        e.preventDefault();
        localStorage.setItem('applicationStep2', JSON.stringify(formData));
        navigate('/application-3');
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 mt-28 p-4">
      <div className="bg-[#f9f5e3] rounded-xl shadow-lg p-10 w-screen">
            {/* Progress Bar */}
            <div className="mb-6 text-center">
                <p className="text-gray-600 text-xl font-space-mono font-bold mb-4">Step 2/4</p>
                <div className="flex justify-center space-x-5">
                    <div className="bg-[#f9f5e3] border-black border-2 h-5 w-80"></div>
                    <div className="bg-black border-black border-2 h-5 w-80"></div>
                    <div className="bg-[#f9f5e3] border-black border-2 h-5 w-80"></div>
                    <div className="bg-[#f9f5e3] border-black border-2 h-5 w-80"></div>
                </div>
            </div>
            {/* Form Title */}
            <h2 className="text-center text-5xl font-semibold font-space-mono text-gray-700 mb-8">Hacker Questions</h2>

        {/* Form */}
        <form onSubmit={handleNext}>
            <div className="flex flex-col items-center ">
                <div className="grid w-full">
                    {/* Question 1 */}
                    <label className="text-gray-600 text-xl font-space-mono font-bold mb-4">
                        What is your favorite programming language?
                    </label>
                    <div className="relative">
                        <textarea
                            name="question1"
                            value={formData.question1 || ''}
                            onChange={handleChange}
                            className="border-2 border-black rounded-md p-2 w-full h-32 resize-none pr-16"
                            rows="4"
                            maxLength={200}
                        ></textarea>
                        <div className="absolute bottom-2 right-2 text-sm text-gray-500 px-1 rounded">
                            {formData.question1?.length || 0}/200
                        </div>
                    </div>
                    {/* Question 2 */}
                    <label className="text-gray-600 text-xl font-space-mono font-bold mb-4 mt-8">
                        What is your dream project?
                    </label>
                    <div className="relative">
                        <textarea
                            name="question2"
                            value={formData.question2 || ''}
                            onChange={handleChange}
                            className="border-2 border-black rounded-md p-2 w-full h-32 resize-none pr-16"
                            rows="4"
                            maxLength={200}
                        ></textarea>
                        <div className="absolute bottom-2 right-2 text-sm text-gray-500 px-1 rounded">
                            {formData.question2?.length || 0}/200
                        </div>
                    </div>
                    <div className="flex justify-between">
                        {/* Back Button */}
                        <div className="text-right">
                            <a href="/application">
                                <button 
                                type="submit" 
                                className="bg-gray-800 text-white px-6 py-2 rounded-md"
                                >
                                Back
                                </button>
                            </a>
                        </div>
                        {/* Next Button */}
                        <div className="text-right">
                            <a href="/application-3">
                                <button 
                                    type="submit" 
                                    className="bg-gray-800 text-white px-6 py-2 rounded-md"
                                >
                                    Next
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm2;
