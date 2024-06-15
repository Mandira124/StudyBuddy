const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(8000, {
  cors: true,
});

app.use(cors());
app.use(express.json()); // For parsing application/json

// Array to store strings
const rooms = [];

// Endpoint to post a room name
app.post("/strings", (req, res) => {
  const { roomWithRandomNumber } = req.body;
  console.log("Received room name with random number:", roomWithRandomNumber);
  if (roomWithRandomNumber) {
    rooms.push(roomWithRandomNumber);
    res.status(201).send(rooms);
  } else {
    res.status(400).send({ message: "Invalid input" });
  }
});

// Endpoint to get stored strings
app.get("/strings", (req, res) => {
  res.status(200).send(rooms);
});

// Endpoint to delete a room by its ID
app.delete("/strings/:RoomID", (req, res) => {
  const { roomID } = req.params;
  const index = rooms.findIndex((room) => room === roomID);
  if (index !== -1) {
    rooms.splice(index, 1);
    res.status(200).send({ message: "Room deleted successfully!" });
  } else {
    res.status(404).send({ message: "Room not found!" });
  }
});

const nameToSocketIdMap = new Map();
const socketidToNameMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);

  //Here comes after final room is sent form frontend
  socket.on("room:join", (data) => {
    const { name, room } = data;
    nameToSocketIdMap.set(name, socket.id); // name: key ; socket.id: value store in key
    socketidToNameMap.set(socket.id, name);
    io.to(room).emit("user:joined", { name, room, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);

    socket.on("message", (msgData) => {
      io.to(room).emit("message", msgData);
    });
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

const PORT = 8001;
server.listen(PORT, "192.168.137.250", () => {
  console.log(`Server is running on port ${PORT}`);
});
