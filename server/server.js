/* const express = require("express");
const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
const app = express();
app.use(express.json());

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", async (headerList, receiverID, cb) => {
    //io.emit("receive", message);
    const messages = await cb(headerList, receiverID);
    console.log(messages);
  });
});
 */
