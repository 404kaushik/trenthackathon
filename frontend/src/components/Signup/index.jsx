import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Stars from "../../pages/Stars";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	axios.defaults.withCredentials = true;
	const handleSubmit = async (e) => {
		e.preventDefault();
		axios.post('https://trenthackathon-backend.vercel.app/',{firstName, lastName, email, password})
		.then(result => console.log(result))
		.catch(error => console.error(error));
		try {
			const url = "http://localhost:8000/api/users";
			const { data: res } = await axios.post(url, data);
			console.log(res.message);  // Log response message for debugging
			navigate("/login");
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
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
                <Stars starCount={1000}/>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1 className="text-white text-4xl text-center font-space-mono font-semibold">Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
                <div className={styles.left}>
					<h1 className="text-white text-4xl text-center font-space-mono text-nowrap font-semibold">Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="bg-gray-400 w-52 p-5 rounded-xl m-2 font-space-mono text-xl font-semibold hover:bg-gray-700">
							Sign in
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;
