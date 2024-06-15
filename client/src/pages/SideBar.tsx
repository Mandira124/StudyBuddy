import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/CommunityPost');
  }

  const buttonNames = ["DSA", "OOP", "Physics", "Chemistry", "Drawing", "Mechanics", "Statistics and Probability", "Discrete mathematics", "Advanced calculus", "Electronics", "Environment"];

  // useEffect(() => {
  //   const sendButtonNamesToBackend = async () => {
  //     try {
  //       const response = await fetch('YOUR_BACKEND_ENDPOINT', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ buttonNames }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to send button names to the backend');
  //       }

  //       const data = await response.json();
  //       console.log('Response from backend:', data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   sendButtonNamesToBackend();
  // }, [buttonNames]);

  const navigateToSubject = (subject: string) => {
    navigate(`/subjects/${subject}`);
  };

  return (
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
        >
          <i className="fas fa-caret-down text-base"></i>
          <span>Subject</span>
        </button>
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
      </div>
    </div>
  );
};

export default Sidebar;
