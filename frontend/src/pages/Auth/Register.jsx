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
    const userInfo = useSelector(userInfoSelector);
    const navigate = useNavigate()

    const [registerApiCall, {isLoading}] = useRegisterMutation();

    const {search} = useLocation();
    const searchParam = new URLSearchParams(search);
    const redirect = searchParam.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect, {state: "Already logged in"});
        }
    }, [navigate, redirect, userInfo]);

    return (
        
    );
}

export default Register;