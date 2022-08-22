// ----- UDP SERVER MULTICAST
const udp = require("dgram");

let Buffer = require("buffer").Buffer;
const PORT_UDP = "5666";
const GROUP = "224.16.32.80";
const HOST = "0.0.0.0";
const mtcast = udp.createSocket("udp4");

mtcast.on("listening", function () {
  console.log("listen...");
  mtcast.setBroadcast(true);
  mtcast.setMulticastTTL(64);
  mtcast.addMembership(GROUP, HOST);
});

mtcast.bind(PORT_UDP, HOST, () => {
  console.log(`udp ${HOST} ${PORT_UDP} connected`);
});

mtcast.on("message", function (message, remote) {
  console.log(
    new Date().getTime() +
      " \nB: data From UDP group pc2Bs: " +
      remote.address +
      ":" +
      remote.port +
      " - " +
      message
  );
});
