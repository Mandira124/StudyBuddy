import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";

interface CommentProps {
  comment: {
    id: number;
    content: string;
    username: string;
    profilePic: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="border-t-2 border-gray-300 pt-4 mt-4">
      <div className="flex items-center mb-2">
        <img src={comment.profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
        <span className="font-bold">{comment.username}</span>
      </div>
      <p className="mb-2">{comment.content}</p>
    </div>
  );
};

export default Comment;
