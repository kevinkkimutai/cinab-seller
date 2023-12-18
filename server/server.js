const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ejs = require("ejs");

const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

// const verifyJWT = require("./middleware/verifyJWT");
require("dotenv").config();

const app = express();

// Middleware setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mightyflexs.vercel.app",
      "https://e-procurement.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(verifyJWT);

const port = process.env.PORT || 5000;

// Socket.IO setup
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "https://mightyflexs.vercel.app"],
    credentials: true,
  },
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
