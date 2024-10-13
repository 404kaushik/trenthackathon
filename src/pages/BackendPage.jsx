import React, { useEffect, useState } from 'react';

const BackendPage = () => {
  const [backendData, setBackendData] = useState('');

  useEffect(() => {
    // Fetch data from the backend
    const backendUrl = 'https://trenthackathon-backend.onrender.com';
    
    fetch(`${backendUrl}/api/test`)
      .then(response => response.json())
      .then(data => setBackendData(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Backend Test Page</h1>
      <p>Backend says: {backendData}</p>
    </div>
  );
};

export default BackendPage;
