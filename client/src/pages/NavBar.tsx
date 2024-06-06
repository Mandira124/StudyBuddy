import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faVideo,
  faCommentAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
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
  return (
    <nav className="bg-white shadow-lg w-full flex flex-col justify-between h-12 ">
      <div className="flex items-center space-x-6 md:space-x-20 py-4 p-4 mt-[-4px]">
        <button className="nav-item ml-4">
          <img
            src={imageSrcPath}
            alt={`${brandName} logo`}
            width="40"
            height="40"
            className="inline-block"
          />
          <span className="font-bold text-xl">{brandName}</span>
        </button>
        <div className="hidden md:flex space-x-5 text-lg mt-[-6px]">
          <button className="nav-item" onClick={goToHome}>
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </button>
          <button className="nav-item">
            <FontAwesomeIcon icon={faVideo} />
            <span>Video Chat</span>
          </button>
          <button className="nav-item" onClick={goToChat}>
            <FontAwesomeIcon icon={faCommentAlt} />
            <span>Live Text</span>
          </button>
          <button className="nav-item" onClick={goToProfile}>
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </button>
        </div>
      </div>
      <div className="h-1 bg-gray-200 w-full"></div>
    </nav>
  );
};

export default NavBar;
