import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import Logo from "../../assets/logo.png";
import peer from "../../service/peer.tsx";
import { CiCloudOn } from "react-icons/ci";
import { GoLightBulb } from "react-icons/go";
import { FaVideo } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useSocket } from "../../context/SocketProvider.js";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen  ">
      <div className=" flex flex-row items-center justify-between  w-11/12 h-full mt-10 mb-10 bg-gray-100 rounded-lg shadow-2xl ">
        {/* Live Video */}
        <div className="flex flex-col justify-between items-center w-full h-full">
          {/* Top bar */}
          <div className="flex flex-row items-center justify-between w-full p-5 ">
            <div className="flex flex-row justify-between items-center">
              <img src={Logo} alt="logo" width={60} />
              <div className="font-semibold text-xl">studybuddy</div>
            </div>
            <div>
              <CiCloudOn size={60} />
            </div>
            <div>
              <GoLightBulb size={50} />
            </div>
          </div>

          {/* Live  */}
          <div className="flex flex-row space-x-5">
            {/* Local Video  */}
            <div className="bg-red-600">
              <ReactPlayer
                playing
                muted
                height="100%"
                width="100%"
                url={myStream}
              />
            </div>

            <div className="bg-red-600">
              <ReactPlayer
                playing
                muted
                height="100%"
                width="100%"
                url={remoteStream}
              />
            </div>
          </div>

          {/* temp bar */}
          <div className="flex flex-row space-x-4 mt-2">
            <div className="">
              <button className="bg-blue-500 p-1 w-36" onClick={sendStreams}>
                Send Stream
              </button>
            </div>
            <div className="">
              <button
                className="bg-green-500 p-1  w-36"
                onClick={handleCallUser}
              >
                Call
              </button>
            </div>
          </div>

          {/* Bottomm Bar  */}
          <div className="flex w-full p-2 flex-row justify-between items-center pb-2 ">
            <div>
              <IoSettingsOutline className="p-3" size={55} color="dark-green" />
            </div>
            <div className="flex flex-row space-x-2  items-center ">
              <FaMicrophone className="p-3" size={55} color="darkgreen" />

              <div className="">
                <MdCallEnd
                  size={45}
                  className="bg-red-600 p-2 rounded-full"
                  color="white"
                />
              </div>

              <FaVideo className="p-3" size={55} color="darkgreen" />
            </div>
            <div className="text-gray-400 text-xs"></div>
          </div>
        </div>

        {/* Chat */}
        <div className="bg-gray-100 h-full flex flex-col justify-between  border-l">
          {/* Chat Part */}
          <div className="bg-white h-full p-5">Chat box</div>

          {/* Bottom Part of chat */}
          <div className="flex flex-col justify-between ">
            <div className="flex flex-row">
              <input
                className="p-2"
                type="text"
                placeholder="Type your Message"
              />{" "}
              <button className="">
                <IoSend className="p-3 bg-white" size={55} color="darkgreen" />
              </button>
            </div>

            <div className="flex flex-row items-center w-full bg-white">
              <IoMdPhotos
                className="p-2 bg-white"
                size={45}
                color="darkgreen"
              />

              <GrAttachment
                className="p-2 bg-white"
                size={45}
                color="darkgreen"
              />

              <MdEmojiEmotions
                className="p-2 bg-white"
                size={45}
                color="darkgreen"
              />
            </div>

            <div className="flex flex-row justify-center items-center text-center text-xs p-2 text-gray-500 border-t">
              copyright @2024
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <h1>Room Page</h1>
    //   <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
    //   {myStream && <button onClick={sendStreams}>Send Stream</button>}
    //   {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
    //   {myStream && (
    //     <>
    //       <h1>My Stream</h1>
    //       <ReactPlayer
    //         playing
    //         muted
    //         height="100px"
    //         width="200px"
    //         url={myStream}
    //       />
    //     </>
    //   )}
    //   {remoteStream && (
    //     <>
    //       <h1>Remote Stream</h1>

    //     </>
    //   )}
    // </div>
  );
};

export default RoomPage;
