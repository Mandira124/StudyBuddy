import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider.jsx";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]4
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
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
    <div className="bg-black h-screen">
    <div className="videosection flex flex-row justify-between items-center">
      <div className="bg-red-400 w-auto h-auto">
        <video autoPlay controls={true} ref={userVideo}></video>
      </div>
      <div className="bg-red-400 w-auto h-auto">
        <video autoPlay controls={true} ref={partnerVideo}></video>
      </div>
    </div>

    <div className="flex flex-row bottomsection">
      <div>
        <select name="subject" id="subject" className=" bg-white text-black p-2">
          <option value="physics">Physics</option>
        </select>
      </div>
      <button
        className="ml-10 bg-green-500 p-10 border rounded-sm text-black"
        onClick={switchToCreateRoom}
      >
        Create Room
      </button>
      <div className="ml-10 bg-red-400 p-10 border rounded-sm text-black">
        Stop
      </div>
      <div className="ml-10 border text-black w-full bg-white flex flex-col justify-between p-3">
        <div className="messagedisplay text-center border-l border-t border-r border-black h-full"></div>
        <div className="messageinput text-center border border-black flex flex-row items-center justify-between">
          <input type="text" className="w-full bg-red-100" />
          <div className="border-l border-black p-1">Send</div>
        </div>
      </div>
    </div>
  </div>



    // <div>
    //   <h1>Lobby</h1>
    //   <form onSubmit={handleSubmitForm}>
    //     <label htmlFor="email">Email ID</label>
    //     <input
    //       type="email"
    //       id="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <br />
    //     <label htmlFor="room">Room Number</label>
    //     <input
    //       type="text"
    //       id="room"
    //       value={room}
    //       onChange={(e) => setRoom(e.target.value)}
    //     />
    //     <br />
    //     <button>Join</button>
    //   </form>
    // </div>
  );
};

export default LobbyScreen;