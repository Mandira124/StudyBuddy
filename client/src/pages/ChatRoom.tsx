
import "../styles/Label.css";
import NavBar from "./NavBar";
import Room from "../assets/chat.svg";
import "../styles/App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const [room, setRoom] = useState("");
  const [userInput, setUserInput] = useState("");
  let navigate = useNavigate();

  const handleRoomInput = (e) => {
    setRoom(e.target.value);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleJoinClick = (e) => {
    e.preventDefault();
    navigate(`/room/${room}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="flex flex-row justify-between items-center p-3 w-full flex-1">
        {/* lobby title */}
        <div className="flex flex-col flex-1 items-center justify-center h-full">
          <div className="font-semibold text-2xl text-emerald-800 mb-5">
            Setup Your Lobby
          </div>
          {/* form  */}
          <div>
            <form onSubmit={handleJoinClick}>
              <div className="flex flex-col">
                <div className="input-group mb-4">
                  <input
                    required
                    type="text"
                    id="username"
                    value={userInput}
                    onChange={handleUserInput}
                    className="border-b focus:outline-none focus:border-green-800 focus:border-b-2 transition-colors peer text-xl w-full"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-0 top-1 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-800 transition-all text-xl"
                  >
                    Username
                  </label>
                </div>

                <div className="input-group mb-4">
                  <input
                    required
                    type="text"
                    id="room"
                    value={room}
                    onChange={handleRoomInput}
                    className="border-b focus:outline-none focus:border-green-800 focus:border-b-2 transition-colors peer text-xl w-full"
                  />
                  <label
                    htmlFor="room"
                    className="absolute left-0 top-1 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-800 transition-all text-xl"
                  >
                    Room
                  </label>
                </div>

                <button
                  type="submit"
                  className="flex justify-center text-2xl font-semibold items-center border border-emerald-800 bg-emerald-800 self-center h-14 rounded-lg w-full text-white"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="container h-full">
          <img src={Room} className="login" alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
