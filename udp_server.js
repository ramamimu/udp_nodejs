// server
var udp = require("dgram");
let Buffer = require("buffer");

// --------------------creating a udp server --------------------

const PORT = "1111";
const GROUP = "224.16.80.32";
// const HOST = "192.168.0.26";
const HOST = "0.0.0.0";

// creating a udp server
var mtcast = udp.createSocket("udp4");

// emits when any error occurs
mtcast.on("listening", function () {
  console.log("UDP mtcast listening ");
  mtcast.setBroadcast(true);
  mtcast.setMulticastTTL(128);
  mtcast.addMembership(GROUP, HOST);
});

mtcast.on("message", function (message, remote) {
  console.log("A: Epic Command Received. Preparing Relay.");
  console.log(
    "B: From: " + remote.address + ":" + remote.port + " - " + message
  );
});

mtcast.bind(PORT, HOST);
