import React, { useState } from "react";
import profilePic from "../assets/profile.png";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Sidebar from "./SideBar";
import PostForm from "./PostForm";
import "../styles/comp.css";
import NavBar from "./NavBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp, faCircleDown } from '@fortawesome/free-solid-svg-icons';

interface CommunityPost {
  id: number;
  content: string;
  likes: number;
  dislikes: number;
  profilePic: string;
  username: string;
  subject: string;
  photos: File[];
}

interface IFormInput {
  subject: string;
  content: string;
  photos: File[];
}

const CommunityPosts: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 1,
      subject: "Subject 1",
      content: "Post 1 content",
      likes: 0,
      dislikes: 0,
      profilePic,
      username: "User 1",
      photos: [],
    },
    {
      id: 2,
      subject: "Subject 2",
      content: "Post 2 content",
      likes: 0,
      dislikes: 0,
      profilePic,
      username: "User 2",
      photos: [],
    },
    {
      id: 3,
      subject: "Subject 3",
      content: "Post 3 content",
      likes: 0,
      dislikes: 0,
      profilePic,
      username: "User 3",
      photos: [],
    },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes === 1 ? 0 : 1,
              dislikes: 0,
            }
          : post
      )
    );
  };

  const handleCreatePostClick = () => {
    setShowForm(!showForm);
  };

  const handleDislike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              dislikes: post.dislikes === 1 ? 0 : 1,
              likes: 0,
            }
          : post
      )
    );
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleReportMenu = (postId: number) => {
    setShowReportMenu(showReportMenu === postId ? null : postId);
  };

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex flex-row justify-between space-x-5">
        <Sidebar onCreatePostClick={handleCreatePostClick} />

        <div className="flex flex-col lg:w-5/6 mt-5">
          <div className="overflow-y-auto">
            {posts.map((post) => (
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
                    src={post.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span className="font-bold">{post.username}</span>
                </div>
                <h3 className="font-bold mb-2">{post.subject}</h3>
                <p className="mb-2">{post.content}</p>
                {post.photos.length > 0 && (
                  <div className="flex flex-wrap">
                    {post.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt="Post"
                        className="w-1/4 h-1/4 m-1"
                      />
                    ))}
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <button onClick={() => handleLike(post.id)} className="mr-2">
                      <FontAwesomeIcon
                        icon={faCircleUp}
                        className={`text-2xl ${
                          post.likes === 1 ? "text-emerald-800" : "text-black"
                        }`}
                      />
                      <span className={`ml-2 ${post.likes === 1 ? "text-emerald-800" : "text-black"}`}>
                        {post.likes}
                      </span>
                    </button>
                    <button onClick={() => handleDislike(post.id)}>
                      <FontAwesomeIcon
                        icon={faCircleDown}
                        className={`text-2xl ${
                          post.dislikes === 1 ? "text-emerald-800" : "text-black"
                        }`}
                      />
                      <span className={`ml-2 ${post.dislikes === 1 ? "text-emerald-800" : "text-black"}`}>
                        {post.dislikes}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPosts;
