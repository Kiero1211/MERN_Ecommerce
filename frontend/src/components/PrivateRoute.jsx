import { useNavigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

import { userInfoSelector } from "../redux/selectors";
import { useEffect } from "react";
import { toast } from "react-toastify";

function PrivateRoute() {
    const userInfo = useSelector(userInfoSelector);
    const navigate = useNavigate();
    useEffect(() => {
        if (Object.keys(userInfo).length === 0){
            toast.error("You need to log in first");
            navigate("/login");
        }
    }, [userInfo, navigate])
    return <Outlet />
}

export default PrivateRoute;