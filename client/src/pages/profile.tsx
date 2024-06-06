import React, { useState } from "react";
import profilePic from "../assets/profile.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleCreatePostClick = () => {
    setShowForm(!showForm);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/6 bg-green-800 p-4 h-screen rounded-xl overflow-y-auto">
        <div className="text-white font-bold mb-4 text-xl">Topics</div>
        <div className="flex flex-col space-y-2">
          <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
            <i className="fas fa-fire text-lg"></i>
            <span>Trending</span>
          </button>
          <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
            <i className="fas fa-fire-alt text-lg"></i>
            <span>Hot</span>
          </button>
          <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
            <i className="fas fa-thumbs-up text-lg"></i>
            <span>Liked</span>
          </button>
          <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm" onClick={toggleDropdown}>
            <i className="fas fa-caret-down text-lg"></i>
            <span>Subject</span>
          </button>
          {showDropdown && (
            <>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
                <i className="fas fa-book text-lg"></i>
                <span>Button 4</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
                <i className="fas fa-book text-lg"></i>
                <span>Button 5</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
                <i className="fas fa-book text-lg"></i>
                <span>Button 6</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
                <i className="fas fa-book text-lg"></i>
                <span>Button 7</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
                <i className="fas fa-book text-lg"></i>
                <span>Button 8</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
                <i className="fas fa-book text-lg"></i>
                <span>Button 9</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-sm">
                <i className="fas fa-book text-lg"></i>
                <span>Button 10</span>
              </button>
            </>
          )}
        </div>
        <div>
          <button className="mt-auto p-2 text-green-800 bg-white hover:bg-white hover:text-green-800 transition-transform transform hover:scale-110 rounded-full text-sm" onClick={handleCreatePostClick}>
            <i className="fas fa-plus"></i>
            <span>Create Post</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:w-5/6">
        <div className="relative p-4">
          <button className="absolute top-0 right-0 mt-4 mr-4 p-2 text-white bg-emerald-800 hover:bg-emerald-900 transition-transform rounded-full text-sm">Log Out</button>

          <div className="transition-transform duration-300 mt-16">
            <div className="flex flex-col items-center w-full p-4">
              <div className="flex justify-between items-center w-full mb-8">
                <div className="flex items-center space-x-4">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="text-xl">
                      <p className="text-lg">USERNAME</p>
                    </div>
                    <div className="text-sm">
                      <p>Add a bio</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white shadow rounded-lg w-full">
                <div className="text-sm">
                  <button text-emerald-800>Posts</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add any additional content here, like posts, forms, etc. */}
      </div>
    </div>
  );
};

export default Profile;
