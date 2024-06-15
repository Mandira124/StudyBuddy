import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
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
                </div>
              </div>
            ))}
          </div>
        </div >

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
      </div >
    </>
  );
};

export default ChatForm;