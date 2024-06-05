import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faCog } from "@fortawesome/free-solid-svg-icons";
import profilePic from "../assets/profile.png";

const Profile = () => {
  const [showButtons, setShowButtons] = useState(false);

  const toggleMenu = () => {
    setShowButtons((prevState) => !prevState);
  };

  const closeMenu = () => {
    setShowButtons(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Main Content (Profile Header) */}
      <div
        className={`transition-transform duration-300 ${
          showButtons
            ? "transform -translate-x-2/3 sm:-translate-x-1/2 md:-translate-x-1/3 lg:-translate-x-1/4"
            : ""
        }`}
      >
        <div className="flex flex-col items-center w-full p-4 md:p-8 lg:px-40">
          {/* Toggle Button */}
          <button
            onClick={toggleMenu}
            className="focus:outline-none absolute top-0 right-0 p-3 md:p-4 lg:p-5 text-black"
          >
            {showButtons ? (
              <FontAwesomeIcon
                icon={faTimes}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            )}
          </button>

          {/* Profile Header */}
          <div className="flex justify-between items-center w-full mb-8">
            <div className="flex items-center space-x-4 md:space-x-8">
              <div>
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-20 h-20 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full"
                />
              </div>
              <div className="flex flex-col ">
                <div className="text-xl md:text-3xl lg:text-4xl">
                  <p className="text-lg md:text-xl lg:text-2xl">USERNAME</p>
                </div>
                <div className="ml-auto mr-10 relative">
                    <button onClick={toggleMenu}>
                        {showButtons ? (
                            <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-black" />
                        ) : (
                            <FontAwesomeIcon icon={faBars} className="w-8 h-8 text-black" />
                        )}
                    </button>
                    {showButtons && (
                        <div className="fixed top-0 right-0 h-screen w-1/6 bg-green-800 p-4 flex flex-col rounded-xl">
                            <div className="flex items-center justify-center text-white mb-4">
                                <div className="flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                                    <div className="mr-2">Settings</div>
                                </ div>

                                <button onClick={closeMenu} className="ml-auto">
                                    <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-black" />
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <button className="p-2 text-white transform hover:scale-110 rounded-lg">Button 1</button>
                                <button className="p-2 text-white transform hover:scale-110 rounded-lg">Button 2</button>                   
                                <button className="p-2 text-white transform hover:scale-110 rounded-lg">Button 3</button>
                            </div>
                            <button className="mt-auto p-2 text-green-800 bg-white hover:bg-white hover:text-green-800 transition-transform transform hover:scale-110 rounded-full">Log Out</button>
                        </div>
                    )}
                </div>
                <div className="text-sm md:text-base lg:text-lg">
                  <p>Add a bio</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}

          {/* // Community Posts Section // */}
          <div className="p-4 bg-white shadow rounded-lg w-full">
            <div className="text-sm md:text-base lg:text-xl">
              <p>Community posts will appear here...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel (Settings) */}
      {showButtons && (
        <div className="fixed top-0 left-0 h-full w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 bg-green-800 bg-opacity-95 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col z-10">
          <div className="flex items-center justify-between text-white mb-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              <span className="text-sm sm:text-base md:text-2xl lg:text-3xl">
                Settings
              </span>
            </div>
            <button onClick={closeMenu} className="focus:outline-none">
              <FontAwesomeIcon
                icon={faTimes}
                className="w-6 h-6 md:w-8 md:h-8 text-white"
              />
            </button>
          </div>
          <div className="flex flex-col space-y-4 flex-grow">
            <button className="p-2 sm:p-3 md:p-4 lg:p-5 text-sm sm:text-base md:text-2xl lg:text-2xl xl:text-3xl w-full text-white bg-green-600 rounded  bg-transparent hover:text-xl sm:hover:text-xl md:hover:text-2xl lg:hover:text-3xl xl:hover:text-4xl
             transition ease-in-out duration-200">
              Button 1
            </button>
            <button className="p-2 sm:p-3 md:p-4 lg:p-5 text-sm sm:text-base md:text-2xl lg:text-2xl xl:text-3xl w-full text-white bg-green-600 rounded  bg-transparent hover:text-xl sm:hover:text-xl md:hover:text-2xl lg:hover:text-3xl xl:hover:text-4xl
             transition ease-in-out duration-200">
              Button 2
            </button>
            <button className="p-2 sm:p-3 md:p-4 lg:p-5 text-sm sm:text-base md:text-2xl lg:text-2xl xl:text-3xl w-full text-white bg-green-600 rounded  bg-transparent hover:text-xl sm:hover:text-xl md:hover:text-2xl lg:hover:text-3xl xl:hover:text-4xl
             transition ease-in-out duration-200">
              Button 3
            </button>
          </div>
          <button className="mt-auto p-2 sm:p-3 md:p-4 lg:p-5 text-xs sm:text-sm md:text-base lg:text-lg text-green-800 bg-white rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
