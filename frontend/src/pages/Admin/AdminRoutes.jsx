import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdminSelector } from "../../redux/selectors";
import { toast } from "react-toastify";

function AdminRoutes() {
    const isAdmin = useSelector(isAdminSelector);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAdmin) {
            toast.error("Not authorized as admin");
            navigate("/login")
        }
    }, [isAdmin, navigate])

    return <Outlet />
}

export default AdminRoutes;