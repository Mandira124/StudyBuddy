import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Sidebar from './SideBar';

interface Post {
  id: number;
  username: string;
  profilePic: string;
  content: string;
  likes: number;
  dislikes: number;
}

interface CommentData {
  id: number;
  username: string;
  content: string;
}

interface CommentPageProps {
  postId: number;
}


const CommentPage: React.FC<CommentPageProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [commentUsername, setCommentUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const postData = await response.json();
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
        setLoading(false);
      }
    };
    
    fetchPostData();
  }, [postId]);

  const handleCommentSubmit = () => {
    if (newComment && commentUsername) {
      const comment: CommentData = {
        id: comments.length + 1,
        username: commentUsername,
        content: newComment,
      };
      setComments([...comments, comment]);
      setNewComment('');
      setCommentUsername('');
    }
  };

  const handleLike = () => {
    if (post) {
      setPost({ ...post, likes: post.likes + 1 });
    }
  };

  const handleDislike = () => {
    if (post) {
      setPost({ ...post, dislikes: post.dislikes + 1 });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className='flex flex-col w-full'>
      <NavBar/>
      <div className='flex flex row w-full'>
        <Sidebar/>
      <div className="max-w-2xl mx-auto p-4">
      <div className="post bg-white p-6 rounded-lg shadow-md">
        <div className="post-header flex items-center mb-4">
          <img src={post.profilePic} alt={`${post.username}'s profile`} className="w-12 h-12 rounded-full mr-4" />
          <h3 className="text-lg font-semibold">{post.username}</h3>
        </div>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <div className="post-actions flex space-x-4">
          <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Like ({post.likes})
          </button>
          <button onClick={handleDislike} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
            Dislike ({post.dislikes})
          </button>
        </div>
      </div>
      <div className="comment-form bg-white p-6 rounded-lg shadow-md mt-6">
        <h4 className="text-lg font-semibold mb-4">Leave a comment</h4>
        <input
          type="text"
          placeholder="Your username"
          value={commentUsername}
          onChange={(e) => setCommentUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button onClick={handleCommentSubmit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </div>
      <div className="comments bg-white p-6 rounded-lg shadow-md mt-6">
        <h4 className="text-lg font-semibold mb-4">Comments</h4>
        {comments.map((comment) => (
          <div key={comment.id} className="comment mb-4">
            <h5 className="font-semibold">{comment.username}</h5>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default CommentPage;
