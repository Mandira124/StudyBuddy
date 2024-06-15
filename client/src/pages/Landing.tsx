import React, { useState, useEffect } from "react";
import profilePic from "../assets/profile.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./SideBar";
import NavBar from "./NavBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleDown, faComment } from '@fortawesome/free-solid-svg-icons';

interface CommunityPost {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
  profilePic: string;
  username: string;
  subject: string;
  post_content: string;
  photos: string[];
  comments: number;
}

interface IFormInput {
  subject: string;
  content: string;
  photos: File[];
}

const Landing: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { username } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const subjectt = localStorage.getItem('subject');
  
  useEffect(() => {
    if (!subjectt) {
      axios.get('http://localhost:3001/api/posts', {
        params: { subjectt, username }
      })
        .then(response => {
          console.log('Posts Response:', response.data);
          if (Array.isArray(response.data)) {
            setPosts(response.data);
          } else {
            console.error('Unexpected posts response format:', response.data);
          }
          localStorage.removeItem("subject");
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    }
  }, [subjectt, username]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const handleLike = (postId: number) => {
    // Check if user has already upvoted
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      const updatedPosts = [...posts];
      if (updatedPosts[postIndex].upvotes === 1) {
        // Undo upvote
        updatedPosts[postIndex].upvotes = 0;
      } else {
        // Upvote
        updatedPosts[postIndex].upvotes = 1;
        // Ensure downvote is reset
        updatedPosts[postIndex].downvotes = 0;
      }
      setPosts(updatedPosts);
      // Update backend with new upvote status
      axios.post(`http://localhost:3001/api/posts/${postId}/upvote`)
        .then(response => {
          console.log('Upvote successful:', response.data);
          // Optionally, you can fetch updated posts after successful upvote
          // fetchPosts();
        })
        .catch(error => {
          console.error('Error upvoting post:', error);
        });
    }
  };

  const handleDislike = (postId: number) => {
    // Check if user has already downvoted
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      const updatedPosts = [...posts];
      if (updatedPosts[postIndex].downvotes === 1) {
        // Undo downvote
        updatedPosts[postIndex].downvotes = 0;
      } else {
        // Downvote
        updatedPosts[postIndex].downvotes = 1;
        // Ensure upvote is reset
        updatedPosts[postIndex].upvotes = 0;
      }
      setPosts(updatedPosts);
      // Update backend with new downvote status
      axios.post(`http://localhost:3001/api/posts/${postId}/downvote`)
        .then(response => {
          console.log('Downvote successful:', response.data);
          // Optionally, you can fetch updated posts after successful downvote
          // fetchPosts();
        })
        .catch(error => {
          console.error('Error downvoting post:', error);
        });
    }
  };

  const toggleReportMenu = (postId: number) => {
    setShowReportMenu(showReportMenu === postId ? null : postId);
  };

  const goToFormPost = () => {
    navigate('/PostForm');
  };

  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <div className="flex justify-between space-x-5 mt-2">
        <div className="w-1/6 transparent">
          <div className="fixed w-full">
            <Sidebar />
          </div>
        </div>
        <div className="flex flex-col w-5/6 mt-2">
          <div className="flex flex-1 justify-end">
            <button
              className="mt-[-4px] mr-6 p-1 text-white bg-emerald-800 hover:bg-emerald-800 hover:text-which transition-transform transform hover:scale-110 rounded-full text-base"
              onClick={goToFormPost}
            >
              <i className="fas fa-plus text-base"></i>
              <span>Create Post</span>
            </button>
          </div>
          <div className="overflow-y-auto mt-2">
            {posts.map(post => (
              <div
                key={post.id}
                className="post p-4 mb-4 bg-gray-100 shadow rounded-xl relative"
              >
                <div className="absolute top-0 right-0 m-2">
                  <button onClick={() => toggleReportMenu(post.id)}>
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                  {showReportMenu === post.id && (
                    <div className="bg-white absolute top-full right-0 mt-1 shadow rounded">
                      <button className="block w-full py-2 px-4 text-left hover:bg-gray-200">
                        Report
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center mb-2">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span className="font-bold">{post.username}</span>
                </div>
                <h3 className="text-sm">{post.subject}</h3>
                <p className="mb-2">{post.post_content}</p>
                {post.photos && (
                  <div className="flex flex-wrap">
                    {post.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo} 
                        alt="Post"
                        className="w-1/4 h-1/4 m-1"
                      />
                    ))}
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex flex-row">
                    <button onClick={() => handleLike(post.id)} className="mr-2">
                      <FontAwesomeIcon
                        icon={faCircleUp}
                        className={`text-2xl ${post.upvotes === 1 ? "text-emerald-800" : "text-gray-500"}`}
                      />
                      <span className={`ml-2 ${post.upvotes === 1 ? "text-emerald-800" : "text-gray-500"}`}>
                        {post.upvotes}
                      </span>
                    </button>
                    <button onClick={() => handleDislike(post.id)}>
                      <FontAwesomeIcon
                        icon={faCircleDown}
                        className={`text-2xl ${post.downvotes === 1 ? "text-red-800" : "text-gray-500"}`}
                      />
                      <span className={`ml-2 ${post.downvotes === 1 ? "text-red-800" : "text-gray-500"}`}>
                        {post.downvotes}
                      </span>
                    </button>
                  </div>
                  <div className="flex-grow"></div>
                  <button>
                    <FontAwesomeIcon icon={faComment} className="text-2xl text-gray-500" />
                    <span className="ml-2">{post.comments}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
