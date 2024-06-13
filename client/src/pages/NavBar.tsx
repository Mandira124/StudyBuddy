import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const brandName = "StudyBuddy";
  const imageSrcPath = logo;
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/CommunityPost");
    handleNavItemClick("Home");
  };
  const goToProfile = () => {
    navigate("/profile");
    handleNavItemClick("Profile");
  };
  const goToChat = () => {
    navigate("/chat");
    handleNavItemClick("Chat");
  };
  const [activeNavItem, setActiveNavItem] = useState<string>("");

  const handleNavItemClick = (
    itemName: string,
    navigationCallback: () => void,
  ) => {
    setActiveNavItem(itemName);
    navigationCallback();
  };
  return (
<<<<<<< HEAD
    <nav className="bg-white shadow-lg w-full flex flex-col justify-between space-x-20 h-12">
      <div className="flex flex-row justify-between items-center ml-20 mr-20 py-4">
        <button
          className="nav-item flex flex-row justify-center items-center space-x-2"
          onClick={() => handleNavItemClick("Home", goToHome)}
        >
          <img
            src={imageSrcPath}
            alt={`${brandName} logo`}
            width="40"
            height="40"
            className=""
          />
          <span className="font-bold text-xl">{brandName}</span>
        </button>

        <div className="hidden md:flex space-x-5 text-lg">
          <button
            className={`nav-item transition-transform transform hover:scale-110 ${
              activeNavItem === "Home" ? "text-emerald-800" : "text-black"
            }`}
            onClick={() => handleNavItemClick("Home", goToHome)}
          >
            <span>Home</span>
          </button>
          <button
            className={`nav-item flex items-center space-x-3 transition-transform transform hover:scale-110 ${
=======
    <nav className="bg-white shadow-lg w-full h-12">
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
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
              activeNavItem === "Video" ? "text-emerald-800" : "text-black"
            }`}
            onClick={() => handleNavItemClick("Video", goToHome)} // Adjust navigation callback as needed
          >
<<<<<<< HEAD
            <span>Video Chat</span>
          </button>
          <button
            className={`nav-item transition-transform transform hover:scale-110 ${
              activeNavItem === "Chat" ? "text-emerald-800" : "text-black"
            }`}
            onClick={() => handleNavItemClick("Chat", goToChat)}
          >
            <span>Live Text</span>
          </button>
          <button
            className={`nav-item transition-transform transform hover:scale-110 ${
              activeNavItem === "Profile" ? "text-emerald-800" : "text-black"
            }`}
            onClick={() => handleNavItemClick("Profile", goToProfile)}
=======
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
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
          >
            <span>Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
