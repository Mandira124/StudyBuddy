import React, { useState, useEffect, useRef } from "react";
import profilePic from "../assets/profile.png";
import NavBar from "./NavBar";
import ChatInput from "./chatinput";
import { io } from "socket.io-client";

const ChatForm = () => {
  const [message1, setMessage1] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // It is an engine-io client and it sends a polling request to the server
  // The server responds with open type and some other info
  // Open and Connect events are emmited at client level
  // Then the connnection is upgraded to ws
  const socket = io("127.0.0.1:1973", { autoConnect: false });
  socket.connect();

  const handleMessageChange1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage1(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleSendMessage1 = () => {
    setMessages((prevMessages) => [...prevMessages, input]);
    console.log("messages ", messages);
    console.log("called");
    const dataToSend = {
      sender_username: "sabin",
      receiver_username: "sabinonweb",
      room_id: "DSA",
      message: input,
    };
    socket.emit("message", dataToSend);
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
        <ChatInput
          message={input}
          setMessage={setMessage1}
          handleSendMessage={handleSendMessage1}
          handleMessageChange={(e) => setInput(e.target.value)}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          handleFileInputClick={handleFileInputClick}
        />
        <div className="flex flex-row space-x-4">
          <button className="bg-emerald-800 w-20 h-20 rounded-lg mr-2 text-white">
            Next
          </button>
          <button className="bg-red-800 w-20 h-20 rounded-lg text-white mr-10">
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
