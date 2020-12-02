import * as socket from "socket.io-client";

const io = socket.connect("http://localhost:5000");

export { io };

io.on("connect", () => {
  console.log("connected");
});
