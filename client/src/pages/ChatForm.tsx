import React, { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";
import ChatInput from "./chatinput";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const ChatForm: React.FC = () => {
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(io());
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  useEffect(() => {
    const socket = io("127.0.0.1:1973/");
    setSocket(socket);
    socket.emit("join", id);
    socket.on("messages", (messages) => {
      setMessages(messages.messages);
      console.log("hekro", messages.messages);
    });

    socket.on("room-message", (messages) => {
      console.log("read");
      console.log(messages);
      setMessages((prevMessages) => [...prevMessages, messages]);
      console.log("stment ", messages);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  // useEffect(() => {
  //   console.log("useffect");
  //   const handleMessage = (msg_session) => {
  //     console.log("re render");
  //     console.log("\n\nagainnnnn\n\n");
  //     console.log("msggggggg ", msg_session);
  //     setMessages((prevMessages) => [...prevMessages, msg_session.message]);
  //     console.log("hello", msg_session);
  //   };
  //
  //   socket.on("messageemit", handleMessage);
  //   return () => {
  //     socket.off("messageemit", handleMessage);
  //   };
  // }, []);
  //
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
      console.log("called send message");
      const dataToSend = {
        sender_username: "sabin",
        receiver_username: "sabinonweb",
        room_id: id,
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
                {message.message}
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
      </div>
    </>
  );
};

export default ChatForm;
