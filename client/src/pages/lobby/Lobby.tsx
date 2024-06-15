import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider.js";
import { FaUser } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import lobby from "../../assets/lobby.png";
import "./lobby.css";
import axios from "axios";

const LobbyScreen = () => {
  const [name, setname] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(
        `Form Data is: | ---Original Room = ${room} |--- name: ${name} | ---`
      );

      const RandomNumber = Math.floor(Math.random() * 10000) + 1;
      // Append random number to the room name
      const roomWithRandomNumber = `${room}${RandomNumber}`;

      // console.log("Sending data to the server:", { roomWithRandomNumber });

      // Send the room name to the server
      axios({
        url: "http://192.168.137.250:8001/strings",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { roomWithRandomNumber },
      })
        .then((res) => {
          console.log("Form Data sent and data as response is: ", res.data);

          // Fetch existing rooms from the server
          axios({
            url: "http://192.168.137.250:8001/strings",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              console.log("Get Server response:", res.data);
              const existingRooms = res.data;

              // Check if any room contains the substring of the desired room name
              const matchingRoom = existingRooms.find((existingRoom) =>
                existingRoom.includes(room)
              );
              console.log(
                "Room to Connect after array reading is : ",
                matchingRoom
              );

              const roomToJoin = matchingRoom
                ? matchingRoom
                : roomWithRandomNumber;

              // Emit the event to join the room
              socket.emit("room:join", { name, room: roomToJoin });
              console.log("Emitted room:join | ----> Final Name and Room", {
                name,
                room: roomToJoin,
              });
            })
            .catch((err) => {
              console.error("Error fetching rooms from the server:", err);
            });
        })
        .catch((err) => {
          console.error("Error sending room name to the server:", err);
        });
    },
    [name, socket, room]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { name, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  const gotohome = () => {
    navigate(`/home2`);
  };

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
          <div className="cursor-pointer	" onClick={gotohome}>
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
                Active User : {}
                <p>{}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section  */}
        <div className="flex flex-row justify-between items-center  p-5 space-x-8">
          <div className="flex flex-col justify-between items-center  p-3 ">
            {/* lobby title */}
            <div className="font-semibold text-2xl text-emerald-800 mb-5">
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
                    />
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
                  <button className="bg-emerald-800 text-white font-semibold p-1 w-1/3">
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Image  */}
          <div className="mb-36">
            <img src={lobby} alt="logo" width={600} />
          </div>
        </div>

        <div className="text-xs text-gray-400 p-5 ">copyright@2024</div>
      </div>
    </div>
  );
};

export default LobbyScreen;
