import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

function AdminMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const hamburgerMenuClassName = clsx([
		"bg-[#151515]",
		"p-2",
		"fixed",
		"rounded-lg",
		isMenuOpen ? "top-2 right-2" : "top-5 right-7",
	]);

	const navigationList = (
		<ul className="list-none mt-2">
            {/* Dashboard */}
			<li>
				<NavLink
					className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
					to="/admin/dashboard"
                    style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white"
                    })}>
					Admin Dashboard
				</NavLink>
			</li>

            {/* Create Category */}
            <li>
				<NavLink
					className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
					to="/admin/create-category"
                    style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white"
                    })}>
					Create Category
				</NavLink>
			</li>

            {/* Create Product */}
            <li>
				<NavLink
					className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
					to="/admin/create-product"
                    style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white"
                    })}>
					Create Product
				</NavLink>
			</li>

            {/* User List */}
            <li>
				<NavLink
					className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
					to="/admin/user-list"
                    style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white"
                    })}>
					Manage Users
				</NavLink>
			</li>

            {/* Order List */}
            <li>
				<NavLink
					className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
					to="/admin/order-list"
                    style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white"
                    })}>
					Manage Orders
				</NavLink>
			</li>
		</ul>
	);

	return (
		<>
			<button
				className={hamburgerMenuClassName}
				onClick={toggleMenu}>
				{isMenuOpen ? (
					<FaTimes color="white" />
				) : (
					<>
						{/* Hamburger dashes */}
						<div className="w-5 h-1 bg-gray-200 my-1 rounded-lg"></div>
						<div className="w-5 h-1 bg-gray-200 my-1 rounded-lg"></div>
						<div className="w-5 h-1 bg-gray-200 my-1 rounded-lg"></div>
					</>
				)}

                {isMenuOpen && (
                    <section className="bg-[#151515] p-4 fixed right-7 top-5">
                        {navigationList}
                    </section>
                )}
			</button>
		</>
	);
}

export default AdminMenu;
