import { useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

import { userInfoSelector, favoriteProductSelector, cartItemsSelector } from "../../redux/selectors";
import CountBubble from "../../components/CountBubble";

const Navigation = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const dispatch = useDispatch();
	const userInfo = useSelector(userInfoSelector);
	const navigate = useNavigate();

	const favoriteProductCount = useSelector(favoriteProductSelector).length;
	const cartItemsCount = useSelector(cartItemsSelector);

	const [logoutApiCall] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/login", {state: "Logged out successfuly"})
		} catch (error) {
			console.log(error.message);
		}
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const openSidebar = () => {
		setIsSidebarOpen(true);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};


	// Detect if sidebar is closed, then close dropdown
	useEffect(() => {
		if (!isSidebarOpen)
			setIsDropdownOpen(false);
	}, [isDropdownOpen, isSidebarOpen])

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
		"h-[100vh]",
		"fixed"
	);
	const linkClassName = clsx("flex", "items-center", "transition-transform", "transform", "hover:translate-x-2");
	const dropdownClassName = clsx([
		"mt-2",
		"space-y-2",
		"bg-white",
		"text-gray-600",
		userInfo.isAdmin ? "-top-80" : "-top-20",
	]);
	return (
		<div
			style={{ zIndex: 99 }}
			className={sidebarClassName}
			id="navigation-container"
			onMouseOver={() => openSidebar()}
			onMouseLeave={() => closeSidebar()}>
			<div className="flex flex-col justify-center space-y-4">
				<Link
					to="/"
					className={linkClassName}>
					<AiOutlineHome
						className="mr-2 mt-[3rem]"
						size={26}
					/>
					<span className="hidden nav-item-name mt-[3rem]">HOME</span>
				</Link>
				<Link
					to="/shop"
					className={linkClassName}>
					<AiOutlineShopping
						className="mr-2 mt-[3rem]"
						size={26}
					/>
					<span className="hidden nav-item-name mt-[3rem]">SHOP</span>
				</Link>
				<Link
					to="/cart"
					className={linkClassName}>
					<AiOutlineShoppingCart
						className="mr-2 mt-[3rem]"
						size={26}
					/>
					<span className="hidden nav-item-name mt-[3rem]">CART</span>
					{" "} {cartItemsCount > 0 && <CountBubble value={cartItemsCount}/>}
				</Link>
				<Link
					to="/favorite"
					className={linkClassName}>
					<FaHeart
						className="mr-2 mt-[3rem]"
						size={26}
					/>
					<span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
					{" "} {favoriteProductCount > 0 && <CountBubble value={favoriteProductCount} />}
				</Link>
			</div>

			<div className="flex items-end gap-2">
				<button
					onClick={toggleDropdown}
					className="relative flex items-center text-gray-800 focus:outline-none"
					>
					{Object.keys(userInfo).length > 0 && (
						<>
							<span className="text-white">{userInfo.username}</span>
							<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`h-4 w-4 ml-1 ${
								isDropdownOpen ? "transform rotate-180" : ""
							}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="white"
							>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={isDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
							/>
							</svg>
						</>
						
					)}
				</button>
				{isDropdownOpen && Object.keys(userInfo).length > 0 && (
					<ul className={dropdownClassName}>
						{userInfo.isAdmin && (
							<>
								<li>
									<Link
										to="/admin/dashboard"
										className="block w-[100%] text-left px-4 py-2 hover:bg-gray-100">
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										to="/admin/create-product"
										className="block w-[100%] text-left px-4 py-2 hover:bg-gray-100">
										Products
									</Link>
								</li>
								<li>
									<Link
										to="/admin/create-category"
										className="block w-[100%] text-left px-4 py-2 hover:bg-gray-100">
										Categories
									</Link>
								</li>
								<li>
									<Link
										to="/admin/order-list"
										className="block w-[100%] text-left px-4 py-2 hover:bg-gray-100">
										Orders
									</Link>
								</li>
								<li>
									<Link
										to="/admin/user-list"
										className="block w-[100%] text-left px-4 py-2 hover:bg-gray-100">
										Users
									</Link>
								</li>
							</>
						)}
						<li>
							<Link
								to="/profile"
								className="block w-[100%] text-left px-4 py-2 hover:bg-gray-100">
								Profile
							</Link>
						</li>
						<li>
							<button
								className="block w-[100%] text-left px-4 py-2 hover:bg-gray-100"
								onClick={handleLogout}>
								Log Out
							</button>
						</li>
					</ul>
				)}

			</div>

			{Object.keys(userInfo).length === 0 && (
				<ul>
					<li>
						<Link
							to="/login"
							className={linkClassName}>
							<AiOutlineLogin
								className="mr-2 mt-[3rem]"
								size={26}
							/>
							<span className="hidden nav-item-name mt-[3rem]">Login</span>
						</Link>
					</li>
					<li>
						<Link
							to="/register"
							className={linkClassName}>
							<AiOutlineUserAdd
								className="mr-2 mt-[3rem]"
								size={26}
							/>
							<span className="hidden nav-item-name mt-[3rem]">Register</span>
						</Link>
					</li>
				</ul>
			)}
		</div>
	);
};

export default Navigation;
