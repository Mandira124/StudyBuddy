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
    <div className="lg:w-1/6 bg-green-800 p-4 h-screen rounded-xl overflow-y-auto">
      <div className="text-white font-bold mb-4 text-xl sm:text-xl md:text-xl lg:text-xl">
        Topics
      </div>
      <div className="flex flex-col space-y-2">
        <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-xl sm:text-xl md:text-2xl lg:text-3xl">
          <i className="fas fa-fire sm:text-sm md:text-base lg:text-xl"></i>
          <span className="text-sm sm:text-sm md:text-sm lg:text-lg">
            Trending
          </span>
        </button>
        <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-xl sm:text-xl md:text-2xl lg:text-3xl">
          <i className="fas fa-fire-alt sm:text-sm md:text-base lg:text-xl"></i>
          <span className="text-sm sm:text-sm md:text-sm lg:text-lg">Hot</span>
        </button>
        <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-xl sm:text-xl md:text-2xl lg:text-3xl">
          <i className="fas fa-thumbs-up sm:text-sm md:text-base lg:text-xl"></i>
          <span className="text-sm sm:text-sm md:text-sm lg:text-lg">
            Liked
          </span>
        </button>
        <button
          className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105 text-xl sm:text-xl md:text-2xl lg:text-3xl"
          onClick={toggleDropdown}
        >
          <i className="fas fa-caret-down sm:text-sm md:text-base lg:text-xl"></i>
          <span className="text-sm sm:text-sm md:text-sm lg:text-lg">
            Subject
          </span>
        </button>
        {showDropdown && (
          <>
            {Array.from({ length: 7 }, (_, i) => (
              <button
                key={i}
                className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105"
              >
                <i className="fas fa-book"></i>
                <span className="text-base sm:text-base md:text-xl lg:text-2xl">
                  Button {i + 4}
                </span>
              </button>
            ))}
          </>
        )}
      </div>
      <div>
        <button
          className="mt-auto p-2 text-green-800 bg-white hover:bg-white hover:text-green-800 transition-transform transform hover:scale-110 rounded-full"
          onClick={onCreatePostClick}
        >
          <i className="fas fa-plus"></i>
          <span className="text-base sm:text-sm md:text-base lg:text-">
            Create Post
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
