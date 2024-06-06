import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faVideo, faCommentAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png"

const NavBar: React.FC = () => {
  const brandName = "StudyBuddy";
  const imageSrcPath = logo;

  return (
    <nav className="bg-white shadow w-full h-16 flex items-center px-6 justify-between">
      <div className="flex items-center space-x-6 md:space-x-20">
        <button className="flex items-center space-x-2">
          <img
            src={imageSrcPath}
            alt={`${brandName} logo`}
            width="40"
            height="40"
            className="inline-block"
          />
          <span className="font-bold text-xl">{brandName}</span>
        </button>
        <div className="hidden md:flex space-x-5 text-lg">
          <button className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </button>
          <button className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faVideo} />
            <span>Video Chat</span>
          </button>
          <button className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCommentAlt} />
            <span>Live Text</span>
          </button>
          <button className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
