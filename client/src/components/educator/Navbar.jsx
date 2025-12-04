import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logger from "../Logger";
const Navbar = () => {
	const educatorData = dummyEducatorData;
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
			<Link to="/">
				<img src={assets.logo} alt="logo" className="w-28 lg:w-32" />
			</Link>

			<div className="flex items-center gap-5 text-gray-500 relative">
				<div className="hidden md:block">
					<Logger />
				</div>
				<p>Hi! {user ? user.name : "Developers"} </p>
				{user ? (
					<div className="flex items-center gap-3">
						<img 
							src={user.imageUrl || assets.profile_img} 
							alt={user.name} 
							className="w-8 h-8 rounded-full object-cover"
						/>
						<button
							onClick={() => { logout(); navigate('/'); }}
							className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
						>
							Logout
						</button>
					</div>
				) : (
					<img className="max-w-8" src={assets.profile_img} alt="profile_img" />
				)}
			</div>
		</div>
	);
};

export default Navbar;
