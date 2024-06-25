import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { userInfoSelector } from "../../redux/selectors";

import { toast } from "react-toastify";

function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const { userInfo } = useSelector(userInfoSelector);
	const navigate = useNavigate();

	const [registerApiCall, { isLoading }] = useRegisterMutation();

	const { search } = useLocation();
	const searchParam = new URLSearchParams(search);
	const redirect = searchParam.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	const validateForm = () => {
		const usernameErrorElement = document.querySelector(".usernameError");
		const emailErrorElement = document.querySelector(".emailError");
		const passwordErrorElement = document.querySelector(".passwordError");
		const confirmPasswordErrorElement = document.querySelector(".confirmPasswordError");

		let usernameError = false;
		let emailError = false;
		let passwordError = false;
		let confirmPasswordError = false;

		const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

		try {
			// Validate username
			if (!username) {
				usernameErrorElement.innerHTML = "*Please enter your username";
				usernameError = true;
			} else {
				usernameErrorElement.innerHTML = "";
			}

			// Validate email
			if (!email) {
				emailErrorElement.innerHTML = "*Please enter your email";
				emailError = true;
			} else if (!email.match(emailPattern)) {
				emailErrorElement.innerHTML = "*Invalid email";
				emailError = true;
			} else {
				emailErrorElement.innerHTML = "";
			}

			// Validate password
			if (!password) {
				passwordErrorElement.innerHTML = "*Please enter your password";
				passwordError = true;
			} else {
				passwordErrorElement.innerHTML = "";
			}

			// Validate confirm password
			if (!confirmPassword) {
				confirmPasswordErrorElement.innerHTML = "*Please confirm your password";
				confirmPasswordError = true;
			} else if (password !== confirmPassword) {
				confirmPasswordErrorElement.innerHTML = "*Passwords does not match";
				confirmPasswordError = true;
			} else {
				confirmPasswordErrorElement.innerHTML = "";
			}

			if (usernameError || emailError || passwordError || confirmPasswordError) {
				throw new Error("Please re-check your information");
			}
		} catch (error) {
			toast.error(error.message);
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				const res = await registerApiCall({ username, email, password }).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate(redirect);
				toast.success("Registerd successfully");
			} catch (error) {
				console.log(error.message);
				toast.error(error.data.message);
			}
		}
	};

	return (
		<section className="pl-[10rem] grid grid-cols-2 gap-x-5">
			<div className="mr-[4rem] mt-[5rem]">
				<h1 className="text-2xl font-semibold mb-4">Register</h1>

				<form
					onSubmit={handleSubmit}
					className="container w-[40rem]">
					<div className="my-[2rem]">
						<label
							htmlFor="username"
							className="block text-sm font-medium text-white">
							Name
						</label>
						<input
							type="text"
							name="username"
							id="username"
							className="mt-1 p-2 border rounded w-full"
							placeholder="Enter username..."
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<div
							className="usernameError"
							style={{ color: "red" }}></div>
					</div>
					<div className="my-[2rem]">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-white">
							Email Address
						</label>
						<input
							type="text"
							name="email"
							id="email"
							className="mt-1 p-2 border rounded w-full"
							placeholder="Enter email..."
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div
							className="emailError"
							style={{ color: "red" }}></div>
					</div>
					<div className="my-[2rem]">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-white">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="mt-1 p-2 border rounded w-full"
							placeholder="Enter password..."
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div
							className="passwordError"
							style={{ color: "red" }}></div>
					</div>
					<div className="my-[2rem]">
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-white">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							className="mt-1 p-2 border rounded w-full"
							placeholder="Confirm password..."
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<div
							className="confirmPasswordError"
							style={{ color: "red" }}></div>
					</div>

					<button
						disabled={isLoading}
						type="submit"
						className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:opacity-80">
						{isLoading ? "Registering..." : "Register"}
					</button>

					{isLoading && <Loader />}
				</form>

				<div className="mt-4">
					<p className="text-white">
						Already have an account?{" "}
						<Link
							to={redirect ? `/login?redirect=${redirect}` : "/login"}
							className="text-pink-500 hover:underline">
							Login
						</Link>
					</p>
				</div>
			</div>
            <figure>
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                    alt=""
                    className="h-[100vh] w-[100%] xl:block md:hidden sm:hidden rounded-lg"
                />
            </figure>
		</section>
	);
}

export default Register;
