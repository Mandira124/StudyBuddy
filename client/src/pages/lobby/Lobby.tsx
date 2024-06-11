import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider.js";
import { FaUser } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import home1 from "../../assets/home1.png";
import "./lobby.css";

const LobbyScreen = () => {
  const [name, setname] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { name, room });
    },
    [name, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { name, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen  ">
      <div className=" flex flex-col items-center justify-between w-11/12 h-full mt-10 mb-10 bg-gray-100 rounded-lg shadow-2xl ">
        {/* Top Bar  */}
        <div className="flex flex-row justify-between w-full items-center p-5">
          <div>
            <div className="flex flex-row justify-center items-center">
              <img src={Logo} alt="logo" width={60} />
              <div className="font-semibold text-xl ml-1">studybuddy</div>
            </div>
          </div>

          <div>
            <div className="text-xs flex flex-row items-center space-x-2 ">
              <div>
                <FaUser size={20} color="red" />
              </div>
              <div>
                Total User Visted: <p>{}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section  */}
        <div className="flex flex-row justify-between items-center  p-5">
          <div className="flex flex-col justify-between items-center  p-3 ">
            {/* lobby title */}
            <div className="font-semibold text-2xl text-green-700 mb-5">
              Setup Your Lobby
            </div>
            {/* form  */}
            <div>
              <form onSubmit={handleSubmitForm}>
                <div className="flex flex-col">
                  <div className="input-group">
                    <input
                      required
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />{" "}
                    <label htmlFor="name">Name: </label>
                  </div>

                  <div className="input-group">
                    <input
                      required
                      type="text"
                      id="room"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />
                    <label htmlFor="room">Subject: </label>
                  </div>
                </div>

                {/* Button  */}
                <div className="w-full flex flex-row items-center justify-center">
                  <button className="bg-green-600 text-white font-semibold p-1 w-1/3">
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Image  */}
          <div>
            <img src={home1} alt="logo" width={500} />
          </div>
        </div>

        <div className="text-xs text-gray-400 p-5 ">copyright@2024</div>
      </div>
    </div>
  );
};

export default LobbyScreen;
