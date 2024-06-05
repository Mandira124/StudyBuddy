import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import profilePic from '../assets/profile.png';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

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
    { id: 1, subject: 'Subject 1', content: 'Post 1 content', likes: 0, dislikes: 0, profilePic, username: 'User 1', photos: [] },
    { id: 2, subject: 'Subject 2', content: 'Post 2 content', likes: 0, dislikes: 0, profilePic, username: 'User 2', photos: [] },
    { id: 3, subject: 'Subject 3', content: 'Post 3 content', likes: 0, dislikes: 0, profilePic, username: 'User 3', photos: [] },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    const newPost: CommunityPost = {
      id: posts.length + 1,
      content: data.content,
      likes: 0,
      dislikes: 0,
      profilePic,
      username: 'New User', // Replace with actual username if needed
      subject: data.subject,
      photos: files
    };
    setPosts([newPost, ...posts]);
    reset();
    setFiles([]);
  };

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
        <div>
          <button className="mt-auto p-2 text-green-800 bg-white hover:bg-white hover:text-green-800 transition-transform transform hover:scale-110 rounded-full">
            <i className="fas fa-plus"></i>
            <span>Create Post</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              {...register("subject", { required: true })}
              className="border rounded p-2 w-full"
            />
            {errors.subject && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mt-4">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              {...register("content")}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mt-4">
            <div {...getRootProps({ className: 'dropzone border-dashed border-2 p-4' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
          <aside className="mt-4">
            {files.map((file, index) => (
              <div key={index}>{file.name}</div>
            ))}
          </aside>
          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>

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
            <h3 className="font-bold mb-2">{post.subject}</h3>
            <p className="mb-2">{post.content}</p>
            {post.photos.length > 0 && (
              <div className="flex flex-wrap">
                {post.photos.map((photo, index) => (
                  <img key={index} src={URL.createObjectURL(photo)} alt="Post" className="w-1/4 h-1/4 m-1" />
                ))}
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <div>
                <button onClick={() => handleLike(post.id)} className="mr-2">
                  <i className={`fas fa-thumbs-up ${post.likes === 1 ? 'text-blue-500' : ''}`}></i> {post.likes}
                </button>
                <button onClick={() => handleDislike(post.id)}>
                  <i className={`fas fa-thumbs-down ${post.dislikes === 1 ? 'text-red-500' : ''}`}></i> {post.dislikes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPosts;
