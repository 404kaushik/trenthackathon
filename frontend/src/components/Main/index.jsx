import React, { useState, useEffect } from "react";
import axios from "axios";
import Stars from "../../pages/Stars";

const Main = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
                const response = await axios.get("http://localhost:8000/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                });
                setUser(response.data);
            } catch (err) {
                setError("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div className="text-white text-center text-2xl">Loading...</div>;
    if (error) return <div className="text-red-500 text-center text-2xl">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 sm:p-8 grid place-items-center relative">
            <Stars starCount={1000} />
            <div className="relative z-10 max-w-4xl w-full mx-auto p-4 sm:p-8 bg-gray-800 bg-opacity-90 rounded-[16px] shadow-lg space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-varela mb-4 bg-clip-text text-purple-500 to-pink-600">
                        Welcome, {user.firstName} {user.lastName}!
                    </h1>
                    <p className="text-base sm:text-lg">Email: {user.email}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Example of a dynamic dashboard card */}
                    <div className="bg-gray-500 bg-opacity-75 p-4 sm:p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Profile</h2>
                        <p className="text-sm sm:text-base">Manage your profile and settings</p>
                    </div>
                    <div className="bg-gray-500 bg-opacity-75 p-4 sm:p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">Statistics</h2>
                        <p className="text-sm sm:text-base">View your activity and progress</p>
                    </div>
                    <div className="bg-gray-500 bg-opacity-75 p-4 sm:p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">Messages</h2>
                        <p className="text-sm sm:text-base">Check your inbox</p>
                    </div>
                </div>
                
                {/* Additional space-themed elements */}
                <div className="flex justify-center items-center mt-6">
                    <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default Main;
