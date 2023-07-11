import "dotenv/config";
import express from "express";
import Server from "socket.io";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
// import User from "./model/Users.js";
import router from "./routes/router.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(router);

function visitors() {
  const client = io.sockets.clients().connected;
  const socket = Object.values(client);
  const users = socket.map((s) => s.user);
  return users;
}

function emitVisitors() {
  const users = visitors().filter(data => data !== undefined)
  console.log(users)
  if (users.length != 0) {
    io.emit("visitors", users);
  }
}

io.on("connection", (socket) => {
  socket.on("new_visitor", (arg) => {
    if (arg !== undefined) {
      console.log("halo")
      socket.user = arg;
      emitVisitors();
    }
  });

  socket.on("message", (arg1, arg2, arg3) => {
    console.log({ arg1, arg2, arg3 });
    socket.broadcast.emit(arg2, arg3);
  });

  socket.on("disconnect", () => {
    emitVisitors()
    console.log("someone just disconnect");
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "chat_users",
  })
  .then(() => {
    console.log("berhasil terkoneksi ke database");
    // await User.create({
    //   name: "bryan",
    //   email: "bryan@gmail.com",
    //   password: "asdasd",
    //   refreshToken: "asdasdasd",
    //   friends: [],
    // });
    server.listen(8000, () => {
      console.log("running at port 8000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
