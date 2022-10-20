const dgram = require("node:dgram");
const server = dgram.createSocket("udp4");
const ip = "172.16.0.27";
const port = 6061;
const port_rx = 5667;

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

// setInterval(() => {
//   server.send(`hello ${new Date().getTime()}`, port_rx, ip);
// }, 50);

server.bind(port_rx, (msg) => {
  console.log(msg);
});
