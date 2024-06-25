import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/selectors";
import { useProfileMutation } from "../../redux/api/userApiSlice";

// Auth
import { setCredentials } from "../../redux/features/auth/authSlice";

// Utils
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

function Profile() {
	const userInfo = useSelector(userInfoSelector);

	const [username, setUsername] = useState(() => userInfo.username);
	const [email, setEmail] = useState(() => userInfo.email);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [updateProfileApiCall, { isLoading }] = useProfileMutation();

	const dispatch = useDispatch();

	const validateInputs = ({ email, password, confirmPassword }) => {
        try {
            let emailError = false;
            let confirmPasswordError = false;
            if (email) {
                const emailErrorElement = document.querySelector(".emailError");
                const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
                // Validate email
                if (!email.match(emailPattern)) {
                    emailErrorElement.innerHTML = "*Invalid email";
                    emailError = true;
                } else {
                    emailErrorElement.innerHTML = "";
                }
            }
    
            if (password || confirmPassword) {
                const confirmPasswordErrorElement = document.querySelector(".confirmPasswordError");
                if (password !== confirmPassword) {
                    confirmPasswordErrorElement.innerHTML = "*Passwords does not match";
                    confirmPasswordError = true;
                } else {
                    confirmPasswordErrorElement.innerHTML = "";
                }
            }
    
            if (emailError || confirmPasswordError) {
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
		const formInputs = {
			username,
			email,
			password,
			confirmPassword,
		};
		if (validateInputs(formInputs)) {
			try {
				const res = await updateProfileApiCall(formInputs).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("Profile updated successfully");
			} catch (error) {
				console.log(error.message);
				toast.error(error.message);
			}
		}
	};

	return (
		<div className="container mx-auto p-4 pt-[10rem]">
			<div className="flex justify-center align-center md:flex md:space-x-4">
				<div className="md:w-1/3">
					<h1 className="text-2xl font-semibold mb-4">Update Profile</h1>

					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="username">Name</label>
							<input
								type="text"
								name="username"
								id="username"
								placeholder="Enter name..."
								className="form-input p-4 rounded-sm w-full"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<div className="usernameError"></div>
						</div>
						<div className="mb-4">
							<label htmlFor="email">Email Address</label>
							<input
								type="text"
								name="email"
								id="email"
								placeholder="Enter email..."
								className="form-input p-4 rounded-sm w-full"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<div className="emailError"></div>
						</div>
						<div className="mb-4">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="........."
								className="form-input p-4 rounded-sm w-full"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div className="passwordError"></div>
						</div>
						<div className="mb-4">
							<label htmlFor="confirmPassword">Confirm password</label>
							<input
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								placeholder="........."
								className="form-input p-4 rounded-sm w-full"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<div className="confirmPasswordError"></div>
						</div>

						<div className="flex justify-between">
							<button
								type="submit"
								className="bg-pink-600 text-white py-2 px-4 w-[9rem] text-center rounded hover:bg-pink-700">
								Update profile
							</button>
							<Link
								to="/user-orders"
								className="bg-pink-600 text-white py-2 px-4 w-[9rem] text-center rounded hover:bg-pink-700">
								My orders
							</Link>
						</div>
					</form>
				</div>
				{isLoading && <Loader />}
			</div>
		</div>
	);
}

export default Profile;
