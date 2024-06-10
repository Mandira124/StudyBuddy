import React, { useState } from "react";
import NavBar from "./NavBar";

const ChatForm: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, inputValue]);
      setInputValue("");
    }
  };

  return (

    <><NavBar />

      <div className="flex flex-col justify-center items-center h-screen">

        <div className="bg-gray-100 h-screen w-11/12 mt-10 mb-10 flex flex-col rounded-lg shadow-2xl mb-24">
          <div className="bg-gray-300 h-full ">
            {messages.map((message, index) => (
              <div key={index} className="message p-2 bg-blue-100 rounded-lg mb-2">
                {message}
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full bg-red-200" >
            <div className="w-full ">
              <input
                type="text"
                value={inputValue}
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
      </div>
    </>



  );
};

export default ChatForm;
