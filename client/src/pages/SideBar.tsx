import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onCreatePostClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreatePostClick }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/CommunityPost");
  };

  return (
    <div className="lg:w-1/6 bg-white p-4 h-screen rounded-sm overflow-y-auto shadow-2xl">
      <button
        className="flex items-center text-emerald-900 mb-4 font-bold transition-transform transform hover:scale-105 text-base"
        onClick={goToHome}
      >
        <i className="fas fa-home mr-2"></i> Home
      </button>
      <div className="text-emerald-900 font-bold mb-4 text-base">Topics</div>
      <div className="flex flex-col space-y-2">
        <button className="p-2 text-emerald-900 flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base">
          <i className="fas fa-fire text-base"></i>
          <span>Trending</span>
        </button>
        <button className="p-2 text-emerald-900 flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base">
          <i className="fas fa-fire-alt text-base"></i>
          <span>Hot</span>
        </button>
        <button className="p-2 text-emerald-900 flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base">
          <i className="fas fa-thumbs-up text-base"></i>
          <span>Liked</span>
        </button>
        <button
          className="p-2 text-emerald-900 flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base"
          onClick={toggleDropdown}
        >
          <i className="fas fa-caret-down text-base"></i>
          <span>Subject</span>
        </button>
        {showDropdown && (
          <>
            {Array.from({ length: 7 }, (_, i) => (
              <button
                key={i}
                className="p-2 text-emerald-900 flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base"
              >
                <i className="fas fa-book text-base"></i>
                <span>Button {i + 4}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
