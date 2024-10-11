import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplicationForm4 = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load all saved data from localStorage
    const step1Data = JSON.parse(localStorage.getItem('applicationStep1') || '{}');
    const step2Data = JSON.parse(localStorage.getItem('applicationStep2') || '{}');
    const step3Data = JSON.parse(localStorage.getItem('applicationStep3') || '{}');

    setFormData({ ...step1Data, ...step2Data, ...step3Data });
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/submit-application', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response.data);
      // Clear application data from localStorage
      localStorage.removeItem('applicationStep1');
      localStorage.removeItem('applicationStep2');
      localStorage.removeItem('applicationStep3');
      // Navigate to a success page
      navigate('/application-success');
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-[#f9f5e3] rounded-xl shadow-lg p-10 w-full max-w-4xl">
        <h2 className="text-4xl font-space-mono font-bold text-gray-800 mb-6 text-center">Review Your Application</h2>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
        
        <div className="space-y-6">
          <section>
            <h3 className="text-2xl font-semibold mb-2">Personal Information</h3>
            <p><strong>Name:</strong> {formData.first_name} {formData.last_name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Pronouns:</strong> {formData.pronouns}</p>
            <p><strong>Race:</strong> {formData.race}</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-2">Education</h3>
            <p><strong>School:</strong> {formData.school}</p>
            <p><strong>Major:</strong> {formData.major}</p>
            <p><strong>Level of Study:</strong> {formData.level_of_study}</p>
            <p><strong>Country of Residence:</strong> {formData.country_of_residence}</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-2">Hacker Questions</h3>
            <p><strong>Favorite Programming Language:</strong> {formData.question1}</p>
            <p><strong>Dream Project:</strong> {formData.question2}</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-2">Event Logistics</h3>
            <p><strong>T-Shirt Size:</strong> {formData.tshirt_size}</p>
            <p><strong>Dietary Restrictions:</strong> {formData.dietary_restrictions.join(', ') || 'None'}</p>
            <p><strong>Agree to Code of Conduct:</strong> {formData.agree_conduct ? 'Yes' : 'No'}</p>
            <p><strong>Share Info with MLH:</strong> {formData.share_info ? 'Yes' : 'No'}</p>
            <p><strong>Receive Emails from MLH:</strong> {formData.receive_emails ? 'Yes' : 'No'}</p>
            <p><strong>Share Resume with Recruiters:</strong> {formData.share_resume ? 'Yes' : 'No'}</p>
          </section>
        </div>

        <div className="flex justify-between mt-8">
          <button 
            onClick={() => navigate('/application-3')}
            className="bg-gray-800 text-white px-6 py-2 rounded-md"
          >
            Back
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-gray-800 text-white px-6 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Confirm and Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm4;
