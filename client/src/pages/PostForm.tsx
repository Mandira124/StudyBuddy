
import React, { ChangeEvent, useRef, useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    postid: "",
    user_id: "",
    username: "",
    upvotes: 0,
    downvotes: 0,
    comment: [],
    subject: "",
    post_content: "",
    profile_pic: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const goToCommunityPost = () => {
    navigate("/landing");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:1991/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData);

      goToCommunityPost();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <NavBar />

      <div className="flex flex-row flex-1">
        <Sidebar />

        <div className="flex flex-col ml-10 w-9/12">
          <div className="flex flex-row w-full justify-between mt-10 ml-6">
            <h1 className="text-xl">Create Post</h1>
            <button className="justify-self-end" onClick={goToCommunityPost}>
              <FontAwesomeIcon icon={faTimes} className="text-3xl" />
            </button>
          </div>

          <form className="flex flex-col justify-end space-x-4" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-content space-x-3 p-6 w-1/2">
              <h1 className="text-lg">Subject:</h1>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter the subject related to your query"
                className="border-2 mt-[-6px] border-black w-full p-2 rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            <div className="flex flex-col">
              <textarea
                name="post_content"
                value={formData.post_content}
                onChange={handleChange}
                placeholder="What's on your mind?"
                className="border-2 m-5 border-black w-full h-36 p-2 rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            <div className="flex flex-row justify-end pr-10">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
              />
              <button
                type="button"
                className="text-green-800 text-2xl px-4 py-2 rounded-lg w-20"
                onClick={handleFileInputClick}
              >
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <button
                className="mt-auto p-3 text-white bg-emerald-800 hover:bg-emerald-800 hover:text-white transition-transform transform hover:scale-110 rounded-full text-base w-20"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
