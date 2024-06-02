import React, { useState } from 'react';
import profilePic from '../assets/profile.png';
import lines from '../assets/lines.png';
import greenlines from "../assets/greenlines.png";

const Profile = () => {
  const [showButtons, setShowButtons] = useState(false);

  const toggleMenu = () => {
    setShowButtons(prevState => !prevState);
  };

  const closeMenu = () => {
    setShowButtons(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-row w-screen">
        <div className="flex flex-1 w-11/12 items-center ml-40">
          <img src={profilePic} alt="Home" className="size-40 rounded-full" />
          <div className="flex flex-col ml-10">
            <div className="text-4xl">
              <p>Name</p>
            </div>
            <div className="text-2xl">
              <p>Username</p>
            </div>
            <div className="text-xl">
              <p>bio</p>
            </div>
          </div>
        </div>
        <div className="ml-auto mr-10 relative">
          {showButtons && (
            <div className="fixed top-0 right-0 h-screen w-1/6 bg-green-800 p-4">
              <div className="flex flex-col mt-4">
                <button className="p-2 text-white underline-btn hover:border-b hover:border-white">Button 1</button>
                <button className="p-2 text-white underline-btn hover:border-b hover:border-white">Button 2</button>
                <button className="p-2 text-white underline-btn hover:border-b hover:border-white">Button 3</button>
              </div>
            </div>
          )}
          <button onClick={toggleMenu}>
            <img src={showButtons ? greenlines : lines} alt="Menu" className="w-8 h-8 " />
          </button>
          {showButtons && (
            <img src={greenlines} alt="Green Lines" className="flex flex-1 absolute top-0 right-0 w-10 h-10" onClick={closeMenu} />
          )}
        </div>
      </div>
      <div className="bg-white shadow w-screen h-20 flex flex-row items-center  justify-between">
        <div className="ml-40 mt-5 p-1 text-xl">
          <p>Community posts</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
