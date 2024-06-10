import React, { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";
import ChatInput from "./chatinput";
import { io } from "socket.io-client";

const ChatForm: React.FC = () => {
  const [message1, setMessage1] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize socket connection
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
    setInput(""); // Clear input after sending
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      console.log("messages ", messages);
      console.log("called");
      const dataToSend = {
        sender_username: "sabin",
        receiver_username: "sabinonweb",
        room_id: "DSA",
        message: input,
      };
      socket.emit("message", dataToSend);
      setInput("");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-gray-100 h-screen w-11/12 mt-10 mb-10 flex flex-col rounded-lg shadow-2xl">
          <div
            ref={chatContainerRef}
            className="bg-gray-300 h-full overflow-y-auto p-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className="message p-2 bg-blue-100 rounded-lg mb-2"
              >
                {message}
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full bg-red-200 p-4">
            <div className="w-full">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="flex-grow border border-gray-300 p-2 mr-2 w-full"
                placeholder="Type a message..."
              />
            </div>
            <div>
              <button
                onClick={handleSendMessage}
                className="bg-green-800 text-white px-4 py-2"
              >
                Send
              </button>
            </div>
          </div>
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
    </>
  );
};

export default ChatForm;
