const dgram = require("node:dgram");
const server = dgram.createSocket("udp4");
const ip = "192.168.242.215";

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

setInterval(() => {
  server.send(`hello ${new Date().getTime()}`, 5666, ip);
}, 50);

server.bind(5666, (msg) => {
  console.log(msg);
});
