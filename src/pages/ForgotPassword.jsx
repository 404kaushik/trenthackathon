import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-8 rounded shadow-md max-w-md w-full space-y-4 bg-white">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

        {message && <p className="text-blue-500">{message}</p>}

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Send Reset Email</button>
      </form>
    </div>
  );
}

export default ForgotPassword;