import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import Sidebar from './SideBar';
import profilepic from "../assets/profile.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleDown, faPaperclip } from '@fortawesome/free-solid-svg-icons';

interface CommentData {
  id: number;
  username: string;
  content: string;
  likes: number;
  dislikes: number;
  file?: File | null;
}

interface PostData {
  id: number;
  username: string;
  profilePic: string;
  content: string;
  likes: number;
  dislikes: number;
}

const CommentPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [commentUsername, setCommentUsername] = useState<string>(''); // Assuming this is the username of the logged-in user
  const [file, setFile] = useState<File | null>(null); // For handling file upload
  const [posts, setPosts] = useState<PostData[]>([
    {
      id: parseInt(postId || '0'),
      username: 'username',
      profilePic: profilepic,
      content: 'This is the post content.',
      likes: 0,
      dislikes: 0,
    }
  ]);

  useEffect(() => {
   
    const fetchCurrentUser = async () => {
      const username = await getCurrentUsername();
      setCommentUsername(username);
    };

    fetchCurrentUser();
  }, []);

  const getCurrentUsername = async () => {
    
    return 'current user';
  };

  const handleCommentSubmit = () => {
    if (newComment && commentUsername) {
      const comment: CommentData = {
        id: comments.length + 1,
        username: commentUsername,
        content: newComment,
        likes: 0,
        dislikes: 0,
        file: file,
      };
      setComments([comment, ...comments]); 
      setNewComment('');
      setFile(null);
    }
  };

  const handleLike = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
            ...comment,
            likes: comment.likes === 1 ? 0 : 1,
            dislikes: 0,
          }
          : comment
      )
    );
  };

  const handleDislike = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
            ...comment,
            dislikes: comment.dislikes === 1 ? 0 : 1,
            likes: 0,
          }
          : comment
      )
    );
  };

  return (
    <div className="flex flex-col w-full h-full">
      <NavBar />
      <div className="flex flex-row flex-1 overflow-hidden">
        <div className="w-1/6 transparent">
          <div className="fixed w-full">
            <Sidebar />
          </div>
        </div>
        <div className="flex flex-col w-full overflow-auto p-4">
          {posts.map((post) => (
            <div key={post.id} className="post bg-white p-6 rounded-lg shadow-md">
              <div className="post-header flex items-center mb-4">
                <img src={post.profilePic} alt={`${post.username}'s profile`} className="w-12 h-12 rounded-full mr-4" />
                <h3 className="text-lg font-semibold">{post.username}</h3>
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="post-actions flex space-x-4">
                <button onClick={() => handleLike(post.id)} className="mr-2">
                  <FontAwesomeIcon
                    icon={faCircleUp}
                    className={`text-2xl ${post.likes > 0 ? "text-emerald-800" : "text-gray-500"}`}
                  />
                  <span className={`ml-2 ${post.likes > 0 ? "text-emerald-800" : "text-gray-500"}`}>
                    {post.likes}
                  </span>
                </button>
                <button onClick={() => handleDislike(post.id)}>
                  <FontAwesomeIcon
                    icon={faCircleDown}
                    className={`text-2xl ${post.dislikes > 0 ? "text-emerald-800" : "text-gray-500"}`}
                  />
                  <span className={`ml-2 ${post.dislikes > 0 ? "text-emerald-800" : "text-gray-500"}`}>
                    {post.dislikes}
                  </span>
                </button>
              </div>
            </div>
          ))}
          <div className="comment-form bg-white p-6 rounded-lg shadow-md mt-6">
            <h4 className="text-lg font-semibold mb-4">Leave a comment</h4>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center text-black">
                <img src={profilepic} alt="Your profile" className="w-8 h-8 rounded-full mr-2" />
                <span>{commentUsername}</span>
              </div>
            </div>
            <textarea
              placeholder="Your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className='flex flex-1 justify-end'>
              <label htmlFor="file-upload" className="cursor-pointer">
                <FontAwesomeIcon icon={faPaperclip} className="text-emerald-800 mr-2 mt-2 size-6" />
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
              />
              <button onClick={handleCommentSubmit} className="bg-emerald-800 text-white px-4 py-2 rounded-full hover:bg-emerald-800 transition-transform transform hover:scale-110">
                Submit
              </button>
            </div>
          </div>
          <div className="comments bg-white p-6 rounded-lg shadow-md mt-6">
            <h4 className="text-lg font-semibold mb-4">Comments</h4>
            {comments.map((comment, index) => (
              <div key={comment.id} className="comment mb-4">
                <div className="flex items-center">
                  <img src={profilepic} alt="Your profile" className="w-8 h-8 rounded-full mr-2" />
                  <h5 className="font-semibold">{comment.username}</h5>
                </div>
                <p className="text-gray-700">{comment.content}</p>
                {comment.file && (
                  <div className="file-attachment">
                    <span>Attachment: {comment.file.name}</span>
                  </div>
                )}
                <div className="post-actions flex space-x-4">
                  <button onClick={() => handleLike(comment.id)} className="mr-2">
                    <FontAwesomeIcon
                      icon={faCircleUp}
                      className={`text-2xl ${comment.likes > 0 ? "text-emerald-800" : "text-black"}`}
                    />
                    <span className={`ml-2 ${comment.likes > 0 ? "text-emerald-800" : "text-black"}`}>
                      {comment.likes}
                    </span>
                  </button>
                  <button onClick={() => handleDislike(comment.id)}>
                    <FontAwesomeIcon
                      icon={faCircleDown}
                      className={`text-2xl ${comment.dislikes > 0 ? "text-emerald-800" : "text-black"}`}
                    />
                    <span className={`ml-2 ${comment.dislikes > 0 ? "text-emerald-800" : "text-black"}`}>
                      {comment.dislikes}
                    </span>
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

export default CommentPage;

