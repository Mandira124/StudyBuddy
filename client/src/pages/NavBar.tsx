
import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const brandName = "StudyBuddy";
  const imageSrcPath = logo;
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/CommunityPost");
  };
  const goToProfile = () => {
    navigate("/profile");
  };
  const goToChat = () => {
    navigate("/chat");
  };
  const [activeNavItem, setActiveNavItem] = useState<string>('');

  const handleNavItemClick = (itemName: string) => {
    setActiveNavItem(itemName);
  };

  return (
    <nav className="bg-white shadow-lg w-full flex flex-col justify-between space-x-20 h-12">
      <div className="flex items-center space-x-20 py-4 px-4 mt-[-4px]">
        <button className="nav-item ml-4 flex items-center space-x-2" onClick={() => handleNavItemClick('Home')}>
          <img
            src={imageSrcPath}
            alt={`${brandName} logo`}
            width="40"
            height="40"
            className="inline-block"
          />
          <span className="font-bold text-xl">{brandName}</span>
        </button>
        <div className="hidden md:flex space-x-5 text-lg mt-[-6px]  ">
          <button className="nav-item  transition-transform transform hover:scale-110" onClick={goToHome}>
            <span>Home</span>
          </button>
          <button className={`nav-item flex items-center space-x-3  transition-transform transform hover:scale-110 ${activeNavItem === 'Video' ? 'text-emerald-800' : 'text-black'}`} onClick={() => handleNavItemClick('Video')}>
          
            <span>Video Chat</span>
          </button>
          <button className="nav-item  transition-transform transform hover:scale-110" onClick={goToChat}>
            
            <span>Live Text</span>
          </button>
          <button className="nav-item  transition-transform transform hover:scale-110" onClick={goToProfile}>
            
            <span>Profile</span>
          </button>
        </div>
      </div>
      <div className="h-1 bg-gray-200 w-full"></div>
    </nav>
  );
};

export default NavBar;
