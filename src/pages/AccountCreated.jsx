import React from "react";
import { Link } from "react-router-dom";

const AccountCreated = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-5xl text-green-500 font-bold mb-5">Account Created!</h1>
        <p className="text-xl text-white mb-8">
          Your account has been successfully created.
        </p>
        <Link to="/login">
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-green-400 transition duration-300">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AccountCreated;
