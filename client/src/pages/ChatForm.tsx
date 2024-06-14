import React, { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";

// Simulate database call
const fetchMessagesFromDatabase = () => {
  return [
    { username: "Alice", message: "Hello there!" },
    { username: "Bob", message: "Hi, how are you?" },
  
  ];
};

const ChatForm: React.FC = () => {
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate fetching messages from a database on mount
    const initialMessages = fetchMessagesFromDatabase();
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages are added
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = { username: "Current User", message: inputValue };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-emerald-200">
      <NavBar />
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col bg-white m-10 w-10/12 h-5/6">
          <div
            ref={messagesContainerRef}
            className="p-4 overflow-y-auto flex flex-col space-y-2 flex-grow"
            style={{ maxHeight: "calc(100% - 50px)" }}
          >
            {messages.map((msg, index) => (
              <div key={index} className="max-w-md">
                <div className="text-gray-600 text-sm">{msg.username}</div>
                <div
                  className="message max-w-md bg-emerald-800 text-white rounded-lg p-2 break-words"
                  style={{ width: "fit-content" }}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full bg-white p-2">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              className="flex-grow border border-gray-300 p-2 mr-2 resize-none overflow-y-auto"
              placeholder="Type a message..."
              rows={1}
              style={{ maxHeight: "8rem" }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-800 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
