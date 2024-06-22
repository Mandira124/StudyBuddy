import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const brandName = "StudyBuddy";
  const imageSrcPath = logo;
  const navigate = useNavigate();
  const goToVideoChat = () => {
    navigate("/lobby");
    handleNavItemClick("Video Chat");
  };
  const goToHome = () => {
    navigate("/landing");
    handleNavItemClick("Home");
  };
  const goToProfile = () => {
    navigate("/profile");
    handleNavItemClick("Profile");
  };
  const goToChat = () => {
    navigate("/room");
    handleNavItemClick("Chat");
  };
  const [activeNavItem, setActiveNavItem] = useState<string>("");

  const handleNavItemClick = (itemName: string) => {
    setActiveNavItem(itemName);
  };
  return (
    <nav className="bg-white shadow-lg w-full h-12 z-50">
      <div className='flex flex-row  items-center ml-10 mt-1 mr-20'>
        <div className='flex flex-row justify-between space-x-20 '>
          <button className="nav-item flex flex-row justify-center items-center space-x-2" onClick={goToHome}>
            <img
              src={imageSrcPath}
              alt={`${brandName} logo`}
              width="40"
              height="40"
              className=""
            />
            <span className="font-bold text-xl ">{brandName}</span>
          </button>
        </div>
        <div className=" flex flex-row justify-between space-x-5 text-lg ml-20">
          <button className={`nav-item transition-transform transform hover:scale-110 ${activeNavItem === 'Home' ? 'text-emerald-800' : 'text-black'}`} onClick={goToHome}>
            <span>Home</span>
          </button>
          <button
            className={`nav-item flex items-center space-x-3  transition-transform transform hover:scale-110 ${
              activeNavItem === "Video" ? "text-emerald-800" : "text-black"
            }`}
            onClick={goToVideoChat}
          >
            <span>VideoChat</span>
          </button>
          <button
            className={`nav-item  transition-transform transform hover:scale-110 ${
              activeNavItem === "Chat" ? "text-emerald-800" : "text-black"
            }`}
            onClick={goToChat}
          >
            <span>Chat</span>
          </button>
          <button
            className={`nav-item  transition-transform transform hover:scale-110 ${
              activeNavItem === "Profile" ? "text-emerald-800" : "text-black"
            }`}
            onClick={goToProfile}
          >
            <span>Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
