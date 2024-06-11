import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const brandName = "StudyBuddy";
  const imageSrcPath = logo;
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/CommunityPost");
    handleNavItemClick('Home');
  };
  const goToProfile = () => {
    navigate("/profile");
    handleNavItemClick('Profile');
  };
  const goToChat = () => {
    navigate("/chat");
    handleNavItemClick('Chat');
  };
  const [activeNavItem, setActiveNavItem] = useState<string>("");

  const handleNavItemClick = (itemName: string) => {
    setActiveNavItem(itemName);
  };
  return (
    <nav className="bg-white shadow-lg w-full h-12">
<<<<<<< HEAD
      <div className="flex flex-row justify-between space-x-20 items-center ml-20 mr-20">
        <div>
          <button
            className="nav-item flex flex-row justify-center items-center space-x-2 "
            onClick={() => handleNavItemClick("Home")}
          >
=======
      <div className='flex flex-row justify-between items-center ml-20 mr-20'>
        <div>
          <button className="nav-item flex flex-row justify-center items-center space-x-2" onClick={goToHome}>
>>>>>>> 426c4cde31037be963a4f4abd8a7e1870b4ace48
            <img
              src={imageSrcPath}
              alt={`${brandName} logo`}
              width="40"
              height="40"
              className=""
            />
            <span className="font-bold text-xl ">{brandName}</span>
<<<<<<< HEAD
          </button>
        </div>

        <div className="hidden md:flex space-x-5 text-lg  ">
          <button
            className={`nav-item  transition-transform transform hover:scale-110 ${
              activeNavItem === "Home" ? "text-emerald-800" : "text-black"
            }`}
            onClick={goToHome}
          >
            <span>Home</span>
          </button>
          <button
            className={`nav-item flex items-center space-x-3  transition-transform transform hover:scale-110 ${
              activeNavItem === "Video" ? "text-emerald-800" : "text-black"
            }`}
            onClick={() => handleNavItemClick("Video")}
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
=======
          </button>
        </div>
        <div className="hidden md:flex space-x-5 text-lg">
          <button className={`nav-item transition-transform transform hover:scale-110 ${activeNavItem === 'Home' ? 'text-emerald-800' : 'text-black'}`} onClick={goToHome}>
            <span>Home</span>
          </button>
          <button className={`nav-item flex items-center space-x-3 transition-transform transform hover:scale-110 ${activeNavItem === 'Video' ? 'text-emerald-800' : 'text-black'}`} onClick={() => setActiveNavItem('Video')}>
            <span>VideoChat</span>
          </button>
          <button className={`nav-item transition-transform transform hover:scale-110 ${activeNavItem === 'Chat' ? 'text-emerald-800' : 'text-black'}`} onClick={goToChat}>
            <span>Chat</span>
          </button>
          <button className={`nav-item transition-transform transform hover:scale-110 ${activeNavItem === 'Profile' ? 'text-emerald-800' : 'text-black'}`} onClick={goToProfile}>
            <span>Profile</span>
          </button>
        </div>
>>>>>>> 426c4cde31037be963a4f4abd8a7e1870b4ace48
      </div>
    </nav>
  );
};

export default NavBar;