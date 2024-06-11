import React from "react";
import NavBar from "./NavBar";
import chemistry from "../assets/chemistry.png";

const ChatLobby = ({ socket }) => {
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
    socket.emit("join", subjectName);
  };

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLobby;
