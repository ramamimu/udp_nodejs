// ----- UDP SERVER MULTICAST
const udp = require("dgram");

let Buffer = require("buffer").Buffer;
const PORT_UDP = "1026";
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
  console.log(`msg: ${message}`);
  let rx_data = {};
  // if (String.fromCharCode(message[3]) == "0") {
  let byte_counter = 0;
  rx_data.headers = [
    String.fromCharCode(message[0]),
    String.fromCharCode(message[1]),
    String.fromCharCode(message[2]),
  ];
  byte_counter = 3;
  rx_data.header = String.fromCharCode(message[byte_counter]);
  byte_counter += 1;
  // header manual dan calibration
  rx_data.header_manual_n_calibration = message.readInt8(byte_counter);
  byte_counter += 1;
  // command 1
  rx_data.command = message.readInt8(byte_counter);
  byte_counter += 1;
  // style 1
  rx_data.style = message.readInt8(byte_counter);
  byte_counter += 1;
  // bola_x_pada_lapangan 2
  rx_data.bola_x_pada_lapangan = message.readInt16LE(byte_counter);
  byte_counter += 2;
  // bola_y_pada_lapangan 2
  rx_data.bola_y_pada_lapangan = message.readInt16LE(byte_counter);
  console.log("receive = ", rx_data, byte_counter);
  // }
});
