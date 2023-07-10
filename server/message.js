import { io } from "socket.io-client";

const socket = io("ws://localhost:5000");

var key = process.argv[2]
console.log(key)
socket.on(key, (arg) => {
  console.log(arg)
})
process.stdin.resume();
process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input === 'exit') {
    process.exit();
  } else {
    socket.emit("message", key, process.argv[3], input)
  }
})
const timeNow = new Date()
console.log(timeNow.getTime())