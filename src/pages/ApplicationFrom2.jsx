import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { AlertCircle } from 'lucide-react';

function ApplicationForm2() {
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('applicationStep2');
        return savedData ? JSON.parse(savedData) : {
          question1: '',
          question2: '',
        };
    });

    const [errors, setErrors] = useState({});
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

    const validateField = (name, value) => {
        if (!value.trim()) {
            return 'This field is required';
        }
        if (value.length > 200) {
            return 'Maximum 200 characters allowed';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
    };
    
    const handleNext = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length === 0) {
            navigate('/application-3');
        } else {
            setErrors(newErrors);
        }
    };

    const handleBack = () => {
        navigate('/application');
    };

    const renderTextarea = (name, label) => {
        return (
            <div className="mb-6">
                <label className="block text-gray-600 text-lg sm:text-xl font-space-mono font-bold mb-2">
                    {label}
                </label>
                <div className="relative">
                    <textarea
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className={`border-2 ${errors[name] ? 'border-red-500' : 'border-black'} rounded-md p-2 w-full h-32 resize-none pr-16 focus:ring-blue-200 transition duration-300`}
                        rows="4"
                        maxLength={200}
                    ></textarea>
                    <div className="absolute bottom-2 right-2 text-sm text-gray-500 px-1 rounded">
                        {formData[name]?.length || 0}/200
                    </div>
                </div>
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
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 md:mt-24">
            <div className="bg-[#f9f5e3] rounded-xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-xl-screen">
                {/* Progress Bar */}
                <div className="mb-6 text-center">
                    <p className="text-gray-600 text-lg sm:text-3xl font-space-mono font-bold mb-4">Step 2/4</p>
                    <div className="flex justify-center space-x-2">
                        <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
                        <div className="bg-black h-2 w-1/4 rounded-full"></div>
                        <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
                        <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
                    </div>
                </div>

                {/* Form Title */}
                <h2 className="text-center text-3xl sm:text-5xl font-semibold font-space-mono text-gray-700 mb-8">Hacker Questions</h2>

                {/* Form */}
                <form onSubmit={handleNext}>
                    <div className="space-y-6">
                        {renderTextarea("question1", "What is your favorite programming language?")}
                        {renderTextarea("question2", "What is your dream project?")}

                        <div className="flex justify-between items-center">
                            {/* Back Button */}
                            <button 
                                type="button"
                                onClick={handleBack}
                                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300 text-sm sm:text-base"
                            >
                                Back
                            </button>

                            {/* Next Button */}
                            <button 
                                type="submit" 
                                className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300 text-sm sm:text-base"
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

export default ApplicationForm2;