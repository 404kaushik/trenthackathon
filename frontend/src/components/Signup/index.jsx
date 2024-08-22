import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Stars from "../../pages/Stars";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const validate = () => {
		const newErrors = {};
		if (!data.firstName) newErrors.firstName = "Please enter your first name.";
		if (!data.lastName) newErrors.lastName = "Please enter your last name.";
		if (!data.email) newErrors.email = "Please enter your email.";
		if (!data.password) newErrors.password = "Please enter your password.";
		if (data.password !== data.confirmPassword)
			newErrors.confirmPassword = "Passwords do not match.";
		return newErrors;
	};

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		if (errors[input.name]) {
			setErrors({ ...errors, [input.name]: "" });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			const url = "http://localhost:8000/api/users";
			const { data: res } = await axios.post(url, data);
			console.log(res.message); // Log response message for debugging
			navigate("/account-created");
		} catch (error) {
			console.error("Error during signup:", error); // Log the full error object
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setErrors({ api: error.response.data.message });
			} else {
				setErrors({ api: "An unexpected error occurred. Please try again later." });
			}
		}
	};

	return (
		<div className="min-h-screen grid place-items-center mt-12 bg-gradient-to-b from-indigo-900 to-blue-900 relative">
			<Stars starCount={1000} />
			<div className="bg-[#f9f5e3] p-10 rounded-2xl shadow-2xl z-10 max-w-lg w-full">
				<h1 className="text-center text-4xl font-bold font-potta-one mb-8 text-gray-900">Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-indigo-500`}
						/>
						{errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
					</div>
					<div className="mb-4">
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-indigo-500`}
						/>
						{errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
					</div>
					<div className="mb-4">
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-indigo-500`}
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
					</div>
					<div className="mb-4">
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-indigo-500`}
						/>
						{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
					</div>
					<div className="mb-4">
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							onChange={handleChange}
							value={data.confirmPassword}
							required
							className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-indigo-500`}
						/>
						{errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
					</div>
					{errors.api && <div className="text-red-500 text-sm mb-4">{errors.api}</div>}
					<button type="submit" className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300">
						SIGN UP
					</button>
				</form>
				<div className="text-center mt-6">
					<span className="text-gray-600">Already have an account? </span>
					<Link to="/login" className="text-indigo-500 hover:underline">Sign In</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;
