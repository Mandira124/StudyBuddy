<<<<<<< HEAD
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const brandName = "StudyBuddy";
  const imageSrcPath = logo;
=======
import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
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
  const [activeNavItem, setActiveNavItem] = useState<string>("");

  const handleNavItemClick = (
    itemName: string,
    navigationCallback: () => void,
  ) => {
    setActiveNavItem(itemName);
    navigationCallback();
  };

  const buttonNames = ["DSA", "OOP", "Physics", "Chemistry", "Drawing", "Mechanics", "Statistics and Probability", "Discrete mathematics", "Advanced calculus", "Electronics", "Environment"];

  useEffect(() => {
    const sendButtonNamesToBackend = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ buttonNames }),
        });

        if (!response.ok) {
          throw new Error('Failed to send button names to the backend');
        }

        const data = await response.json();
        console.log('Response from backend:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    sendButtonNamesToBackend();
  }, [buttonNames]);

  const navigateToSubject = (subject: string) => {
    navigate(`/subjects/${subject}`);
  };

  return (
<<<<<<< HEAD
    <nav className="bg-white shadow-lg w-full flex flex-col justify-between space-x-20 h-12">
      <div className="flex flex-row justify-between items-center ml-20 mr-20 py-4">
        <button
          className="nav-item flex flex-row justify-center items-center space-x-2"
          onClick={() => handleNavItemClick("Home", goToHome)}
=======
    <div className="lg:w-1/6 bg-white p-4 h-screen rounded-sm overflow-y-auto shadow-2xl ">
      <button
        className="flex items-center text-emerald-800 mb-4 font-bold transition-transform transform hover:scale-105 text-base"
        onClick={goToHome}
      >
        <i className="fas fa-home mr-2"></i> Home
      </button>
      <div className="text-emerald-800 font-bold mb-4 text-base">Topics</div>
      <div className="flex flex-col space-y-2">
        <button className="p-2 text-emerald-900 flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base">
          <i className="fas fa-fire text-base"></i>
          <span>Trending</span>
        </button>
        <button className="p-2 text-emerald-800 flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base">
          <i className="fas fa-fire-alt text-base"></i>
          <span>Hot</span>
        </button>
        <button className="p-2 text-emerald-800 flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base">
          <i className="fas fa-thumbs-up text-base"></i>
          <span>Liked</span>
        </button>
        <button
          className="p-2 text-emerald-800 flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base"
          onClick={toggleDropdown}
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
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
<<<<<<< HEAD

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
              activeNavItem === "Video" ? "text-emerald-800" : "text-black"
            }`}
            onClick={() => handleNavItemClick("Video", goToHome)} // Adjust navigation callback as needed
          >
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
          >
            <span>Profile</span>
          </button>
        </div>
=======
        {showDropdown && (
          <>
            {buttonNames.map((name, i) => (
              <button
                key={i}
                className="p-2 text-emerald-800 flex items-center space-x-2 text-left rounded transition-transform transform hover:scale-105 text-base"
                onClick={() => navigateToSubject(name)}
              >
                <i className="fas fa-book text-base"></i>
                <span>{name}</span>
              </button>
            ))}
          </>
        )}
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
      </div>
    </nav>
  );
};

export default NavBar;
