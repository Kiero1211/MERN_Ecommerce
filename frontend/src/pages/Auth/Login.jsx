import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Redux
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { userInfoSelector } from "../../redux/selectors";

import { toast } from "react-toastify";


//Components
import Loader from "../../components/Loader";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [loginApiCall, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector(userInfoSelector);

    const {search} = useLocation();
    const searchParam = new URLSearchParams(search);
    const redirect = searchParam.get(search) || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect, {state: "Already logged in"})
        }
    }, [navigate, redirect, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginApiCall({email, password}).unwrap();
            dispatch(setCredentials({...res}));
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    return (
        <>
            <section className="pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
                    <form onSubmit={handleSubmit} className="container w-[40rem]">
                        <div className="my-[2rem]">
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-white"
                            >   
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                className="mt-1 p-2 border rounded w-full" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-[2rem]">
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-white"
                            >   
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                className="mt-1 p-2 border rounded w-full" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}
                    </form>
                    <div className="mt-4">
                        <p className="text-white">
                            New Customer ? {" "} 
                            <Link 
                                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                className="text-pink-500 hover:underline"
                            >Register</Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;