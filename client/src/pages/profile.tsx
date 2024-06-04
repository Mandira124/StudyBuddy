import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCog } from '@fortawesome/free-solid-svg-icons';
import profilePic from '../assets/profile.png';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: "User 1",
        username: "user1",
        bio: "User 1's bio",
        profilePic: profilePic
    });

    const [showButtons, setShowButtons] = useState(false);

    const toggleMenu = () => {
        setShowButtons(prevState => !prevState);
    };

    const closeMenu = () => {
        setShowButtons(false);
    };

    return (
        <div className="relative">
            <div className="flex flex-col md:flex-row w-screen">
                <div className="flex flex-1 w-full md:w-11/12 items-center md:ml-40 px-4 md:px-0">
                    <img src={userData.profilePic} alt="Profile" className="w-20 md:w-40 h-20 md:h-40 rounded-full" />
                    <div className="flex flex-col ml-4 md:ml-10">
                        <div className="text-2xl md:text-4xl">
                            <p>{userData.name}</p>
                        </div>
                        <div className="text-xl md:text-2xl">
                            <p>{userData.username}</p>
                        </div>
                        <div className="text-base md:text-xl">
                            <p>{userData.bio}</p>
                        </div>
                    </div>
                </div>
                <div className="ml-auto mr-4 md:mr-10 relative">
                    <button onClick={toggleMenu}>
                        {showButtons ? (
                            <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-black" />
                        ) : (
                            <FontAwesomeIcon icon={faBars} className="w-8 h-8 text-black" />
                        )}
                    </button>
                    {showButtons && (
                        <div className="fixed top-0 right-0 h-screen w-full md:w-1/6 bg-green-800 p-4 flex flex-col rounded-xl">
                            <div className="flex items-center justify-center text-white mb-4">
                                <div className="flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                                    <div className="mr-2">Settings</div>
                                </div>

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
            </div>
            <div className="bg-white shadow w-screen h-20 flex flex-row items-center justify-between px-4 md:px-40">
                <div className="mt-5 p-1 text-base md:text-xl">
                    <p>Community posts</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;