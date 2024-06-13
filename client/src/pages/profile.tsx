
import axios from "axios";
import React, { useEffect,useState, useContext } from "react";
import profilePic from "../assets/profile.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./SideBar";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleDown, faComment } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/contextapi";




interface Post {
  _id: string;
  user: string;
  username: string;
  upvotes: number;
  downvotes: number;
  subject: string;
  post_content: string;
  profile_pic: string | null;
  comments: Array<any>;
}

interface Email {
  email: string;
}

const Profile: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const { username } = useContext(UserContext);
  const [email, setEmail] = useState<string>('');
  const [showReportMenu, setShowReportMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log("profileeee");
  

  useEffect(() => {
    // Fetch user's posts
    axios.get('http://localhost:3001/api/user-posts', {
      params: { username }
    })
      .then(response => {
        console.log('Posts Response:', response.data);

        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error('Unexpected posts response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });


  },[username]);
  useEffect(() => {

    axios.get('http://localhost:3001/api/user-email', {
      params: {username}
    })
      .then(response => {
        console.log('Email Response:', response.data);

        if (response.data.email) {
          setEmail(response.data.email);
        } else {
          console.error('No email found for the user:', username);
        }
      })
      .catch(error => {
        console.error('Error fetching email:', error);
      });
  },[username]);

  const goToLogin = () => {
    navigate('/login');
  }
  
    const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  const navigate = useNavigate();
  

  console.log("profileeee");
  
  const handleLogout = () => {
    
    navigate("/login");

  };

  const toggleReportMenu = (postId: string) => {
    setShowReportMenu(prev => (prev === postId ? null : postId));
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? {
              ...post,
              upvotes: post.upvotes === 0 ? 1 : 0,
              downvotes: post.downvotes === 1 ? 0 : post.downvotes, // Reset downvotes if already disliked
            }
          : post
      )
    );
  };

  const handleDislike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? {
              ...post,
              downvotes: post.downvotes === 0 ? 1 : 0,
              upvotes: post.upvotes === 1 ? 0 : post.upvotes, // Reset upvotes if already liked
            }
          : post
      )
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-1/6 transparent">
          <div className="fixed w-full">
            <Sidebar />
          </div>
        </div>
      <div className="flex flex-col lg:w-5/6">
        <div className="relative p-4">
          <button className="absolute top-0 right-0 mt-4 mr-4 p-2 text-white bg-emerald-800 hover:bg-emerald-800 transition-transform transform hover:scale-110 rounded-full text-base" onClick={goToLogin}>Log Out</button>
          <button
            className="absolute top-0 right-0 mt-4 mr-4 p-2 text-white bg-emerald-800 hover:bg-emerald-800 transition-transform transform hover:scale-110 rounded-full text-base"
            onClick={goToLogin}
        

          >
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
                      <p className="text-lg">{username}</p>
                    </div>
                    <div className="text-sm">
                      <p>{email}</p>
                    </div> 
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white shadow rounded-lg w-full">
                <div className="text-sm space-y-2">
                  <button className="text-emerald-800">Posts</button>
                </div>
              </div>
              <div className="overflow-y-auto mt-2 w-full">
                {posts.map(post => (
                  <div
                    key={post._id}
                    className="post p-4 mb-4 bg-gray-100 shadow rounded-xl relative"
                  >
                    <div className="absolute top-0 right-0 m-2">
                      <button onClick={() => toggleReportMenu(post._id)}>
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      {showReportMenu === post._id && (
                        <div className="bg-white absolute top-full right-0 mt-1 shadow rounded">
                          <button className="block w-full py-2 px-4 text-left hover:bg-gray-200">
                            Report
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src={post.profile_pic || profilePic}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <span className="font-bold">{post.user}</span>
                    </div>
                    <h3 className="font-bold mb-2">{post.subject}</h3>
                    <p className="mb-2">{post.post_content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex flex-row">
                        <button onClick={() => handleLike(post._id)} className="mr-2">
                          <FontAwesomeIcon
                            icon={faCircleUp}
                            className={`text-2xl ${post.upvotes > post.downvotes ? "text-emerald-800" : "text-black"}`}
                          />
                          <span className={`ml-2 ${post.upvotes > post.downvotes ? "text-emerald-800" : "text-black"}`}>
                            {post.upvotes}
                          </span>
                        </button>
                        <button onClick={() => handleDislike(post._id)}>
                          <FontAwesomeIcon
                            icon={faCircleDown}
                            className={`text-2xl ${post.downvotes > post.upvotes ? "text-emerald-800" : "text-black"}`}
                          />
                          <span className={`ml-2 ${post.downvotes > post.upvotes ? "text-emerald-800" : "text-black"}`}>
                            {post.downvotes}
                          </span>
                        </button>
                      </div>
                      <button>
                        <FontAwesomeIcon icon={faComment} className="text-2xl" />
                        <span className="ml-2">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

