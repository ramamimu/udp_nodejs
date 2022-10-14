const dgram = require("node:dgram");
const server = dgram.createSocket("udp4");
const ip = "192.168.242.24";

server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on("listening", () => {
  const address = server.address();
  server.setBroadcast(true);
  console.log(`server listening ${address.address}:${address.port}`);
});

// server.connect(5666, "0.0.0.0", (err) => {
//   //   server.send(message, (err) => {
//   // server.close();
//   //   });
//   server.on("message", (msg) => {
//     console.log(msg);
//   });
// });

// setInterval(() => {
//   server.send(`hello ${new Date().getTime()}`, 5666);
// }, 50);

server.bind(5666, (msg) => {
  console.log(msg);
});
// Prints: server listening 0.0.0.0:41234
