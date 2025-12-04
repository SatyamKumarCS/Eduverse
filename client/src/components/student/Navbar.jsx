import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Logger from "../Logger";

const Navbar = () => {


	const isCourseListPage = location.pathname.includes("/course-list");
	const {navigate, isEducator, backendUrl, setIsEducator, getToken} = useContext(AppContext);
	const { user, logout } = useAuth();

	const becomeEducator = async () => {
		try {
			if(isEducator){
				navigate('/educator')
				return;
			}

			const token = getToken();

			const {data} = await axios.get(backendUrl + '/api/educator/update-role' , {headers: {Authorization: `Bearer ${token}`}})
			
			if(data.success){
				setIsEducator(true);
				toast.success(data.message)
			}else{
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	return (
		<div
			className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-3 ${
				isCourseListPage ? "bg-white" : "bg-cyan-100/70"
			} `}
		>
			<img onClick={()=>navigate('/')}
				src={assets.logo}
				alt="Logo"
				className="w-28 lg:w-32  cursor-pointer"
			/>
			<div className="hidden md:flex items-center gap-5 text-gray-500">
				<div className="flex items-center gap-5">
					<Logger/>
				</div>
				<div className="flex items-center gap-5">
					{user && (
						<>
							<button onClick={becomeEducator}>{isEducator ? "Educator Dashboard" : "Become Educator" }</button>|{" "}
							<Link to="/my-enrollments">My Enrollments</Link>
						</>
					)}
				</div>

				{user ? (
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2">
							<img 
								src={user.imageUrl || assets.user_icon} 
								alt={user.name} 
								className="w-8 h-8 rounded-full object-cover"
							/>
							<span className="text-sm">{user.name}</span>
						</div>
						<button
							onClick={logout}
							className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-600"
						>
							Logout
						</button>
					</div>
				) : (
					<div className="flex items-center gap-3">
						<button
							onClick={() => navigate('/login')}
							className="text-gray-600 hover:text-gray-800"
						>
							Login
						</button>
						<button
							onClick={() => navigate('/register')}
							className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
						>
							Create Account
						</button>
					</div>
				)}
			</div>
			<div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
				{/* for phone scree  */}
				
				<div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
        {user && (
						<>
						<button onClick={becomeEducator}>{isEducator ? "Educator Dashboard" : "Become Educator" }</button>|{" "}
						<Link to="/my-enrollments">My Enrollments</Link>
					</>
					)}
				</div>
        {
          user ? (
			<div className="flex items-center gap-2">
				<img 
					src={user.imageUrl || assets.user_icon} 
					alt={user.name} 
					className="w-8 h-8 rounded-full object-cover"
				/>
				<button
					onClick={logout}
					className="text-xs bg-red-500 text-white px-2 py-1 rounded"
				>
					Logout
				</button>
			</div>
		  ) : (
			<button onClick={()=>navigate('/login')}>
				<img src={assets.user_icon} alt="" />
			</button>
		  )
        }
			</div>
		</div>
	);
};

export default Navbar;
