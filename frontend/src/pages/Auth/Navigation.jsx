import { useState } from "react";
import clsx from "clsx";
import {
	AiOutlineHome,
	AiOutlineShopping,
	AiOutlineLogin,
	AiOutlineUserAdd,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

import {useDispatch, useSelector} from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

import { userInfoSelector } from "../../redux/selectors";

const Navigation = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const dispatch = useDispatch();
	const userInfo = useSelector(userInfoSelector);
	const navigate = useNavigate();

	const [loginApiCall] = useLoginMutation();

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	const sidebarClassName = clsx(
		isSidebarOpen && "show", 
		"xl:flex", 
		"lg:flex",
		"md:hidden",
		"sm:hidden",
		"flex-col",
		"justify-between",
		"p-4",
		"text-white",
		"bg-black",
		"w-[4%]",
		"hover:w-[15%]",
		"h-[100vh]",
		"fixed"
	);
	const linkClassName = clsx(
		"flex",
		"items-center",
		"transition-transform",
		"transform",
		"hover:translate-x-2"
	)
	return (
		<div
			style={{ zIndex: 99 }}
			className={sidebarClassName}
			id="navigation-container">
				<div className="flex flex-col justify-center space-y-4">
					<Link to="/" className={linkClassName}> 
						<AiOutlineHome className="mr-2 mt-[3rem]" size={26}/>
						<span className="hidden nav-item-name mt-[3rem]">HOME</span>
					</Link>
					<Link to="/shop" className={linkClassName}> 
						<AiOutlineShopping className="mr-2 mt-[3rem]" size={26}/>
						<span className="hidden nav-item-name mt-[3rem]">SHOP</span>
					</Link>
					<Link to="/cart" className={linkClassName}> 
						<AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26}/>
						<span className="hidden nav-item-name mt-[3rem]">CART</span>
					</Link>
					<Link to="/favorite" className={linkClassName}> 
						<FaHeart className="mr-2 mt-[3rem]" size={26}/>
						<span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
					</Link>
				</div>

				<div className="relative">
					<button 
						className="flex items-center text-gray-8000 focus:outline-none"
						onClick={toggleDropdown}
					>
						{userInfo && <span className="text-white">{userInfo.username}</span>}
					</button>
				</div>

				<ul>
					<li>
						<Link to="/login" className={linkClassName}> 
							<AiOutlineLogin className="mr-2 mt-[3rem]" size={26}/>
							<span className="hidden nav-item-name mt-[3rem]">Login</span>
						</Link>
					</li>
					<li>
						<Link to="/register" className={linkClassName}> 
							<AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26}/>
							<span className="hidden nav-item-name mt-[3rem]">Register</span>
						</Link>
					</li>
				</ul>
		</div>
	);
};

export default Navigation;
