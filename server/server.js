import "dotenv/config";
import express from "express";
import Server from "socket.io";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

// configuration
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  cors({
    credentials: true,
    origin: process.env.END_POINT,
  })
);

// router
app.use(router);

// getting all connected users and returning all connected users
function visitors() {
  const client = io.sockets.clients().connected;
  const socket = Object.values(client);
  const users = socket.map((s) => s.user);
  return users;
}

// emit live visitors or emit all users are connected
function emitVisitors() {
  const users = visitors().filter((data) => data !== undefined);
  console.log(users)
  if (users.length !== 0) {
    io.emit("visitors", users);
  }
}

io.on("connection", (socket) => {
  socket.on("new_visitor", (arg) => {
    if (arg !== undefined) {
      socket.user = arg;
      emitVisitors();
    }
  });

  // listening to message come
  socket.on("message", (dari, ke, pesan) => {
    socket.broadcast.emit(ke, pesan, dari);
  });

  // listening to disconnect user
  socket.on("disconnect", () => {
    emitVisitors();
  });
});

//connection to database
mongoose
  .connect(process.env.MONGO_URI, {dbName: "user_account"})
  .then(async () => {
    console.log("connected to database");
    server.listen(port, () => {
      console.log(`running at port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
