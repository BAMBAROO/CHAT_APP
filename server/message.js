import io from "socket.io-client";

const socket = io("ws://localhost:8000");

var dari = process.argv[2]
console.log(dari)
socket.on(dari, (arg) => {
  console.log(arg)
})
process.stdin.resume();
process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input === 'exit') {
    process.exit();
  } else {
    socket.emit("message", dari, process.argv[3], input)
  }
})
const timeNow = new Date()
console.log(timeNow.getTime())