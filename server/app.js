require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const verifyJWT = require("./middlewares/verifyJWT");
const airtelMoneyRoutes = require("./routes/AirtelMoney");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware setup
app.use(
  cors({
    origin: "/*",
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

// Import and use the routes
app.use("/v1", airtelMoneyRoutes);

// Socket.IO setup (example)
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 8001;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
