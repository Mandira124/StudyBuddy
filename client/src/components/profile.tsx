import React, { useState } from 'react';
import profilePic from '../assets/profile.png';
import lines from '../assets/lines.png';

const Profile = () => {
  const [showButtons, setShowButtons] = useState(false);

  const handleClick = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div>
        <div className="flex flex-row w-screen">
            <div className="flex flex-1 w-11/12 items-center ml-40">
                <img src={profilePic} alt="Home" className="size-80 rounded-full" />
                <div className="flex flex-col ml-40">
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
            <div className="ml-auto mr-10">
                <button onClick={handleClick}><img src={lines} alt="Home" className="size-12 rounded-full"/></button>
                {showButtons && (
                    <div className="flex flex-col bg-green-800 width-250px h-screen">
                    <button>Button 1</button>
                    <button>Button 2</button>
                    <button>Button 3</button>
                    </div>
                )}
                </div>
            </div>
        <div className="bg-white shadow w-screen h-20 flex flex-row items-center p-2 justify-between">
            <div className="ml-40 text-3xl">
            <p>Community posts</p>
            </div>
      </div>
</div>
  );
};

export default Profile;
