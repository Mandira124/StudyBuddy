import React, { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";
<<<<<<< HEAD
import ChatInput from "./chatinput";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCloudArrowUp,
  faFileLines,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const ChatForm: React.FC = () => {
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(io());
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  let navigate = useNavigate();
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
=======

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
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708

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

<<<<<<< HEAD
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
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

  const handleArrowBack = () => {
    navigate("/room");
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div
          id="top-bar"
          className="flex flex-row justify-between flex-1 items-center shadow-xl"
        >
          <div>
            <button className="p-3 cursor-pointer" onClick={handleArrowBack}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-green-900 font-bold text-2xl"
              />
            </button>
          </div>

          <div className="pr-7">
            <h1 className="text-2xl font-semibold">{id}</h1>
          </div>
          <div></div>
        </div>
        <div className="flex-[8] overflow-y-auto bg-gray-100 bg-[url('../assets/s.svg')]">
          <div className="p-4">
            {messages.map((message) => (
              <div key={message.id} className="flex justify-end mb-2">
                <div className="bg-green-800 text-white p-2 rounded-lg max-w-[70%]">
                  {message.message}
=======
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
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
                </div>
              </div>
            ))}
          </div>
<<<<<<< HEAD
        </div>

        <div
          id="input-area"
          className="flex flex-1 justify-around items-center shadow-2xl "
        >
          <FontAwesomeIcon
            icon={faFileLines}
            className="text-green-900 text-2xl"
          />
          <div className="w-5/6">
            <textarea
              className="h-10 w-full rounded-lg focus:h-16 border-2 px-2 pt-1"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>

          <button onClick={handleSendMessage} className="cursor-pointer">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-green-900 text-2xl "
            />
          </button>
        </div>
      </div>
    </>
=======
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
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
  );
};

export default ChatForm;
