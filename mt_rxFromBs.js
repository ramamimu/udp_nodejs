// ----- UDP SERVER MULTICAST
const { count } = require("console");
const udp = require("dgram");

let Buffer = require("buffer").Buffer;
const PORT_UDP = "1026";
const GROUP = "224.16.32.83";
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
  byte_counter += 2;

  rx_data.target_manual_x = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.target_manual_y = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.target_manual_theta = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.offset_robot_x = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.offset_robot_y = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.offset_robot_theta = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.mux1 = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.mux2 = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.mux_bs_control = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.control_v_linear = [];
  for (let i = 0; i < 5; i++) {
    rx_data.control_v_linear[i] = message.readInt8(byte_counter);
    byte_counter += 1;
  }

  rx_data.control_v_angular = [];
  for (let i = 0; i < 5; i++) {
    rx_data.control_v_angular[i] = message.readInt8(byte_counter);
    byte_counter += 1;
  }

  rx_data.control_power_kicker = [];
  for (let i = 0; i < 5; i++) {
    rx_data.control_power_kicker[i] = message.readInt8(byte_counter);
    byte_counter += 1;
  }

  rx_data.passing_counter = message.readInt8(byte_counter);
  byte_counter += 1;

  console.log("receive = ", rx_data, byte_counter);
  // }
});
