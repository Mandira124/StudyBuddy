<<<<<<< HEAD
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import chemistry from "../assets/chemistry.png";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const ChatLobby = () => {
  const navigate = useNavigate();

  // const socket = io("127.0.0.1:1973", { autoConnect: false });
  // socket.connect();
  const items = [
    { name: "DSA", bgPic: "dsa.jpg" },
    { name: "OOP", bgPic: "oop.jpg" },
    { name: "Digital Logic", bgPic: "digital_logic.jpg" },
    { name: "Drawing", bgPic: "drawing.jpg" },
    { name: "Electronics", bgPic: "electronics.jpg" },
    { name: "Statistics and Probability", bgPic: "statistics.jpg" },
    { name: "Differential Mathematics", bgPic: "mathematics.jpg" },
    { name: "Advanced Calculus", bgPic: "calculus.jpg" },
    { name: "Environmental Engineering", bgPic: "environmental.jpg" },
    { name: "Mechanics", bgPic: "mechanics.jpg" },
    { name: "Elementary Engineering", bgPic: "elementary.jpg" },
    { name: "Physics", bgPic: "elementary.jpg" },
    { name: "Chemistry", bgPic: chemistry },
  ];

  const handleBoxClick = async (subjectName: string) => {
    navigate(`/room/${subjectName}`);
    // console.log("clicked");
    // socket.emit("join", subjectName);
    // console.log("joined");
    // socket.on("messages", (messages) => {
    //   console.log("join event brother here i am fuckerrrrr chatlobyyhhhyyy");
    //   console.log(
    //     "messagesssss sabininnsinicnaiosdncajnsdjckna obyyyyyyy: ",
    //     messages,
    //   );
    // });
    // const dataToSend = {
    //   sender_username: "sabin",
    //   receiver_username: "sabinonweb",
    //   room_id: subjectName,
    //   message: "sabinonwenwbebnwbfb",
    // };
    // socket.emit("message", dataToSend);
    // return () => {};
  };
  //
  // useEffect(() => {
  //   socket.emit("join", "DSA");
  // }, [socket]);
  //
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="grid grid-cols-5 gap-4 p-10 mt-6 ml-10">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative flex  justify-center bg-emerald-200 bg-cover bg-center bg-no-repeat h-40 w-40 m-2 rounded-lg shadow-lg p-6 mb-10 transition-transform transform hover:scale-110 cursor-pointer`}
            style={{ backgroundImage: `url(${item.bgPic})` }}
            onClick={() => handleBoxClick(item.name)}
          >
            <span className="text-lg font-semibold">{item.name}</span>
=======
import React from 'react';
import NavBar from './NavBar';
import bg1 from '../assets/2.png';
import bg2 from '../assets/3.png';
import bg3 from '../assets/4.png';
import bg4 from '../assets/5.png';
import bg6 from '../assets/6.png';
import bg7 from '../assets/7.png';
import bg8 from '../assets/8.png';
import bg9 from '../assets/9.png';
import bg10 from '../assets/10.png';
import bg11 from '../assets/11.png';
import bg12 from '../assets/12.png';
import bg13 from '../assets/13.png';
import bg14 from '../assets/14.png';
import bg15 from '../assets/15.png';
import bg16 from '../assets/1.png';

const ChatLobby = () => {
  const items = [
    { name: 'DSA', bg: bg1 },
    { name: 'OOP', bg: bg2 },
    { name: 'Digital Logic', bg: bg3 },
    { name: 'Drawing', bg: bg4 },
    { name: 'Electronics', bg: bg6 },
    { name: 'Statistics', bg: bg7 },
    { name: 'Discrete', bg: bg8 },
    { name: 'Calculus', bg: bg9 },
    { name: 'Environment', bg: bg10 },
    { name: 'Mechanics', bg: bg11 },
    { name: 'Elementary', bg: bg12 },
    { name: 'Physics', bg: bg13 },
    { name: 'Chemistry', bg: bg14 },
    { name: 'Mathematics', bg: bg15 },
    { name: 'Probability', bg: bg16 },
  ];

  const handleBoxClick = async (subjectName) => {
    try {
      const response = await fetch('https://your-backend-endpoint.com/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: subjectName }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from backend:', data);
      } else {
        console.error('Failed to send subject name to backend');
      }
    } catch (error) {
      console.error('Error sending subject name to backend:', error);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <NavBar />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-10 mt-6'>
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center bg-cover bg-center bg-no-repeat h-40 w-40 m-2 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-110 cursor-pointer`}
            style={{ backgroundImage: `url(${item.bg})` }}
            onClick={() => handleBoxClick(item.name)}
          >
            <span className='text-lg font-semibold text-white'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLobby;
