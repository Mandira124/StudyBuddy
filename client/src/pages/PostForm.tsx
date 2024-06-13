import React, { ChangeEvent, useRef } from "react";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
 
  
  const goToCommunityPost=()=>{
    navigate('/CommunityPost');
  }
  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="flex flex-row">
      <div className="w-1/6 transparent">
          <div className="fixed w-full">
            <Sidebar />
          </div>
        </div>
        <div className="flex flex-col ml-10 w-9/12 ">
          <div className="flex flex-row w-full justify-between mt-10 ml-6">
            <h1 className="text-xl ">Create Post</h1>
            <button className="justify-self-end">
              <i className="fas fa-times  mr-auto text-3xl " onClick={goToCommunityPost}></i>
            </button>
          </div>
          <div className="flex flex-row justify-content space-x-3 p-6 w-1/2">
            <h1 className="text-lg ">Subject:</h1>
            <input
              type="text"
              placeholder="Enter the subject related to your query"
              className="border-2 mt-[-6px] border-black w-full  p-2 rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-emerald-800 "
            ></input>
          </div>
          <div className="flex flex-col ">
              
              <textarea
                id="mind"
                placeholder="What's on your mind?"
                className="border-2 m-5 border-black w-full h-36 p-2 rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-emerald-800"
              ></textarea>
            </div>
            <div className="flex flex-row justify-end space-x-4">
                <input type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                />
                <button className="text-green-800 px-4 py-2 rounded-lg w-20" onClick={handleFileInputClick}>
                    <FontAwesomeIcon icon={faPaperclip} />
                </button>
                <button className=" mt-auto p-3 text-white bg-emerald-800 hover:bg-emerald-800 hover:text-white transition-transform transform hover:scale-110 rounded-full text-base w-20" onClick={goToCommunityPost}>Post</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
