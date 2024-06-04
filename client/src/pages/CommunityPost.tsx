import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import profilePic from '../assets/profile.png';

interface CommunityPost {
  id: number;
  content: string;
  likes: number;
  dislikes: number;
  boosts: number;
  boosted: boolean;
  profilePic: string;
  username: string;
}

const CommunityPosts: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    { id: 1, content: 'Post 1 content', likes: 0, dislikes: 0, boosts: 0, boosted: false, profilePic, username: 'User 1' },
    { id: 2, content: 'Post 2 content', likes: 0, dislikes: 0, boosts: 0, boosted: false, profilePic, username: 'User 2' },
    { id: 3, content: 'Post 3 content', likes: 0, dislikes: 0, boosts: 0, boosted: false, profilePic, username: 'User 3' },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState<number | null>(null);

  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { 
              ...post,
              likes: post.likes === 1 ? 0 : 1,
              dislikes: 0
            }
          : post
      )
    );
  };

  const handleDislike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { 
              ...post, 
              dislikes: post.dislikes === 1 ? 0 : 1,
              likes: 0
            }
          : post
      )
    );
  };

  const handleBoost = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId && !post.boosted
          ? { ...post, boosts: post.boosts + 1, boosted: true }
          : post
      )
    );
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const toggleReportMenu = (postId: number) => {
    setShowReportMenu(showReportMenu === postId ? null : postId);
  };

  return (
    <div className="flex">
      <div className="w-1/6 bg-green-800 p-4 h-screen rounded-xl">
        <div className="text-white font-bold mb-4">Topics</div>
        <div className="flex flex-col space-y-2">
          <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
            <i className="fas fa-fire"></i>
            <span>Trending</span>
          </button>
          <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
            <i className="fas fa-fire-alt"></i>
            <span>Hot</span>
          </button>
          <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
            <i className="fas fa-thumbs-up"></i>
            <span>Liked</span>
          </button>
          <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105" onClick={toggleDropdown}>
            <i className="fas fa-caret-down"></i>
            <span>Subject</span>
          </button>
          {showDropdown && (
            <>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
                <i className="fas fa-book"></i>
                <span>Button 4</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
                <i className="fas fa-book"></i>
                <span>Button 5</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
                <i className="fas fa-book"></i>
                <span>Button 6</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
                <i className="fas fa-book"></i>
                <span>Button 7</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
                <i className="fas fa-book"></i>
                <span>Button 8</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
                <i className="fas fa-book"></i>
                <span>Button 9</span>
              </button>
              <button className="p-2 text-white flex items-center space-x-2 rounded transition-transform transform hover:scale-105">
                <i className="fas fa-book"></i>
                <span>Button 10</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 rounded-2xl">
        {posts.map(post => (
          <div key={post.id} className="post p-4 mb-4 bg-gray-100 shadow rounded-lg relative">
            <div className="absolute top-0 right-0 m-2">
              <button onClick={() => toggleReportMenu(post.id)}>
                <i className="fas fa-ellipsis-v"></i>
              </button>
              {showReportMenu === post.id && (
                <div className="bg-white absolute top-full right-0 mt-1 shadow rounded">
                  <button className="block w-full py-2 px-4 text-left hover:bg-gray-200">Report</button>
                </div>
              )}
            </div>
            <div className="flex items-center mb-2">
              <img src={post.profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              <span className="font-bold">{post.username}</span>
            </div>
            <p className="ml-10">{post.content}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleLike(post.id)}
                className={`px-4 py-2 text-white flex items-center space-x-2 rounded-full ${
                  post.likes === 1 ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              >
                                <i className="fas fa-thumbs-up"></i>
                                <span>Like ({post.likes})</span>
                            </button>
                            <button
                                onClick={() => handleDislike(post.id)}
                                className={`px-4 py-2 text-white flex items-center space-x-2 rounded-full ${post.dislikes === 1 ? 'bg-red-500' : 'bg-gray-400'
                                    }`}
                            >
                                <i className="fas fa-thumbs-down"></i>
                                <span>Dislike ({post.dislikes})</span>
                            </button>
                            <button
                                onClick={() => handleBoost(post.id)}
                                disabled={post.boosted}
                                className={`px-4 py-2 text-white flex items-center space-x-2 rounded-full ${post.boosts > 0 ? 'bg-yellow-500' : 'bg-gray-400'
                                    }`}
                            >
                                <i className="fas fa-rocket"></i>
                                <span>Boost ({post.boosts})</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityPosts;
