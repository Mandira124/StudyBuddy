import React from "react";

interface SidebarProps {
  onCreatePostClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreatePostClick }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="lg:w-1/6 bg-emerald-800 p-4 h-screen rounded-xl overflow-y-auto">
      <div className="text-white font-bold mb-4 text-base">
        Topics
      </div>
      <div className="flex flex-col space-y-2">
        <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base">
          <i className="fas fa-fire text-base"></i>
          <span>Trending</span>
        </button>
        <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base">
          <i className="fas fa-fire-alt text-base"></i>
          <span>Hot</span>
        </button>
        <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base">
          <i className="fas fa-thumbs-up text-base"></i>
          <span>Liked</span>
        </button>
        <button
          className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base"
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
                className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-base"
              >
                <i className="fas fa-book text-base"></i>
                <span>Button {i + 4}</span>
              </button>
            ))}
          </>
        )}
      </div>
      <div>
        <button
          className="mt-auto p-2 text-green-800 bg-white hover:bg-white hover:text-green-800 transition-transform transform hover:scale-110 rounded-full text-base"
          onClick={onCreatePostClick}
        >
          <i className="fas fa-plus text-base"></i>
          <span>Create Post</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
