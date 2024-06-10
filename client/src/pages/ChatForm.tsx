import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import profilePic from "../assets/profile.png";
import NavBar from "./NavBar";

interface Message {
  text: string;
  file?: File;
  username: string;
  profilePic: string;
}

const ChatForm: React.FC = () => {
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleMessageChange = (
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleSendMessage = (
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    username: string
  ) => {
    if (message.trim() !== "" || file) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, file, username, profilePic },
      ]);
      setMessage("");
      setFile(undefined);
      setTimeout(() => {
        adjustTextareaHeight(
          document.getElementById(`message${username}`) as HTMLTextAreaElement
        );
      }, 0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-white max-w-4/5"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col mb-2 ${
              msg.username === "User1" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.username === "User1" ? (
              <div className="flex flex-1 justify-end">
                <div className="flex flex-row">
                  <span className="text-sm">{msg.username}</span>
                  <img
                    src={msg.profilePic}
                    alt="Profile"
                    className="w-6 h-6 rounded-full ml-2"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center">
                <img
                  src={msg.profilePic}
                  alt="Profile"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm">{msg.username}</span>
              </div>
            )}
            <div
              className={`${msg.username === "User1" ? "ml-auto" : "mr-auto"}`}
            >
              <div
                className={`max-w-screen-sm rounded-xl p-2 shadow-md break-words mt-1 ${
                  msg.username === "User1"
                    ? "bg-emerald-800 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <div className="flex flex-col">
                  <div style={{ maxWidth: "100%", overflowWrap: "break-word" }}>
                    {msg.text}
                  </div>
                  {msg.file && (
                    <div className="mt-2 p-2 bg-gray-100 text-gray-800 rounded">
                      {msg.file.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between space-x-20 mr-10">
        <div className="flex flex-col space-y-2">
          <textarea
            id="messageUser1"
            rows={1}
            placeholder="Type your message..."
            value={message1}
            onChange={(e) => handleMessageChange(setMessage1, e)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none resize-none"
            style={{ minHeight: "38px", maxHeight: "80px" }}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-row space-x-2">
            <button
              className="text-green-800 px-4 py-2 rounded-lg"
              onClick={handleFileInputClick}
            >
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button
              className="text-green-800 px-4 py-2 rounded-lg"
              onClick={() => handleSendMessage(message1, setMessage1, "User1")}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <textarea
            id="messageUser2"
            rows={1}
            placeholder="Type your message..."
            value={message2}
            onChange={(e) => handleMessageChange(setMessage2, e)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none resize-none"
            style={{ minHeight: "38px", maxHeight: "80px" }}
          />
          <div className="flex flex-row space-x-2">
            <button
              className="text-green-800 px-4 py-2 rounded-lg"
              onClick={handleFileInputClick}
            >
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button
              className="text-green-800 px-4 py-2 rounded-lg"
              onClick={() => handleSendMessage(message2, setMessage2, "User2")}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <button className="bg-emerald-800 w-20 h-20 rounded-lg text-white">
            Next
          </button>
          <button className="bg-red-800 w-20 h-20 rounded-lg text-white">
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
