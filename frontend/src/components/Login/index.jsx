import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Stars from "../../pages/Stars";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 to-blue-900 relative">
			<Stars starCount={1000} />
			<div className="bg-[#f9f5e3] p-10 rounded-2xl shadow-2xl z-10 max-w-md w-full">
				<h1 className="text-center text-4xl font-bold font-potta-one mb-8 text-gray-900">Sign In</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-6">
						<input
							type="email"
							placeholder="Email/Username"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
						/>
					</div>
					<div className="mb-6 relative">
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
						/>
					</div>
					{error && <div className="text-red-500 font-bold text-center text-sm mb-4">{error}</div>}
					<button type="submit" className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300">
						LOG IN
					</button>
				</form>
				<div className="text-center mt-6">
					<span className="text-gray-600">Don't have an account? </span>
					<Link to="/signup" className="text-indigo-500 hover:underline">Sign Up</Link>
					<div className="text-center">
						<a href="#" className="text-sm text-gray-800 hover:text-indigo-500">
							Forgot your password?
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
