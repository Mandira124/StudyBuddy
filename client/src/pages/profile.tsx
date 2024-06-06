import React, { useState } from "react";
import profilePic from "../assets/profile.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./SideBar";

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleCreatePostClick = () => {
    setShowForm(!showForm);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar onCreatePostClick={handleCreatePostClick} />

      <div className="flex flex-col lg:w-5/6">
        <div className="relative p-4">
          <button className="absolute top-0 right-0 mt-4 mr-4 p-2 text-white bg-emerald-800 hover:bg-emerald-900 transition-transform rounded-full text-sm">
            Log Out
          </button>

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
