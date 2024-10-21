import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';

const ApplicationForm4 = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    window.scrollTo(0, 0);

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
  
    if (!formData.first_name || !formData.last_name || !formData.email) {
      setError('Please fill in all the required fields.');
      setLoading(false);
      return;
    }
  
    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5001'
      : 'https://trenthackathon-backend.onrender.com';
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}/submit-application`, {
        method: 'POST',
        headers: { 
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application.');
      }
  
      localStorage.removeItem('applicationStep1');
      localStorage.removeItem('applicationStep2');
      localStorage.removeItem('applicationStep3');
  
      navigate('/application-success');
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <Header />
      <div className="bg-[#f9f5e3] rounded-2xl shadow-2xl p-8 w-full max-w-xl-screen md:mt-32">
       {/* Progress Bar */}
       <div className="mb-6 text-center">
        <p className="text-gray-600 text-lg sm:text-3xl font-space-mono font-bold mb-4">Step 4/4</p>
          <div className="flex justify-center space-x-2">
              <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
              <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
              <div className="bg-gray-300 h-2 w-1/4 rounded-full"></div>
              <div className="bg-black h-2 w-1/4 rounded-full"></div>
          </div>
        </div>

      {/* Form Title */}
      <h2 className="text-center text-3xl sm:text-5xl font-semibold font-space-mono text-gray-700 mb-8">Review Your Application</h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        <div className="space-y-8">
          <Section title="Personal Information" icon="👤">
            <InfoItem label="Name" value={`${formData.first_name} ${formData.last_name}`} />
            <InfoItem label="Email" value={formData.email} />
            <InfoItem label="Age" value={formData.age} />
            <InfoItem label="Gender" value={formData.gender} />
            <InfoItem label="Pronouns" value={formData.pronouns} />
            <InfoItem label="Race" value={formData.race} />
          </Section>

          <Section title="Education" icon="🎓">
            <InfoItem label="School" value={formData.school} />
            <InfoItem label="Major" value={formData.major} />
            <InfoItem label="Level of Study" value={formData.level_of_study} />
            <InfoItem label="Country of Residence" value={formData.country_of_residence} />
          </Section>

          <Section title="Hacker Questions" icon="💡">
            <InfoItem label="Favorite Programming Language" value={formData.question1} />
            <InfoItem label="Dream Project" value={formData.question2} />
          </Section>

          <Section title="Event Logistics" icon="🎪">
            <InfoItem label="T-Shirt Size" value={formData.tshirt_size} />
            <InfoItem label="Dietary Restrictions" value={formData.dietary_restrictions || 'None'} />
            <InfoItem label="Agree to Code of Conduct" value={formData.code_of_conduct ? 'Yes' : 'No'} />
            <InfoItem label="Share Info with MLH" value={formData.share_info ? 'Yes' : 'No'} />
            <InfoItem label="Receive Emails from MLH" value={formData.receive_emails ? 'Yes' : 'No'} />
            <InfoItem label="Resume URL" value={formData.resume_url ? 'Provided' : 'None'} />
            <InfoItem label="Share Resume with Recruiters" value={formData.share_resume ? 'Yes' : 'No'} />
          </Section>
        </div>

        <div className="flex justify-between items-center mt-3">
          <button 
            onClick={() => navigate('/application-3')}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300 text-sm sm:text-base"
          >            
            <span>Back</span>
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center space-x-2 text-sm sm:text-base"
            disabled={loading}
          >
            <span>{loading ? 'Submitting...' : 'Confirm and Submit'}</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, children }) => (
  <section className="bg-white bg-opacity-60 text-black rounded-xl p-6 shadow-xl">
    <h3 className="text-2xl font-semibold font-poppins mb-4 flex items-center space-x-2">
      <span>{icon}</span>
      <span>{title}</span>
    </h3>
    <div className="space-y-2">
      {children}
    </div>
  </section>
);

const InfoItem = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-gray-900 py-2">
    <span className="text-black font-semibold font-poppins">{label}:</span>
    <span className="text-black font-semibold font-poppins">{value}</span>
  </div>
);

export default ApplicationForm4;