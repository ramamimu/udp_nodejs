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
  let rx_data = {};

  let byte_counter = 0;
  rx_data.headers = [
    String.fromCharCode(message[0]),
    String.fromCharCode(message[1]),
    String.fromCharCode(message[2]),
  ];
  byte_counter = 4;
  // buffer_data.write("0", 3);
  // buffer_data.write(String.fromCharCode(BS2PC_DATA.header), 4);
  rx_data.header = String.fromCharCode(message[byte_counter]);
  byte_counter += 1;
  // int8 command 1-2
  rx_data.command = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 style 2-3
  rx_data.style = message.readInt8(byte_counter);
  byte_counter += 1;
  // int16 bola_x_pada_lapangan 9-11
  rx_data.bola_x_pada_lapangan = message.readInt16LE(byte_counter);
  byte_counter += 2;
  // int16 bola_y_pada_lapangan 9-11
  rx_data.bola_y_pada_lapangan = message.readInt16LE(byte_counter);
  byte_counter += 2;
  // int8 auto_kalibrasi 24-25
  rx_data.auto_kalibrasi = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 geometry_msgs/Pose2D offset_x 28-29
  rx_data.odometry_offset_robot = {};
  rx_data.odometry_offset_robot.x = message.readInt16LE(byte_counter);
  byte_counter += 2;
  // Int16LE geometry_msgs/Pose2D offset_y 29-30
  rx_data.odometry_offset_robot.y = message.readInt16LE(byte_counter);
  byte_counter += 2;
  // Int16LE geometry_msgs/Pose2D offset_theta 30-31
  rx_data.odometry_offset_robot.theta = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.target_manual = {};
  // int8 geometry_msgs/Pose2D target_manual x 35-36
  rx_data.target_manual.x = message.readInt16LE(byte_counter);
  byte_counter += 2;
  // Int16LE geometry_msgs/Pose2D target_manual y 37-38
  rx_data.target_manual.y = message.readInt16LE(byte_counter);
  byte_counter += 2;
  // Int16LE geometry_msgs/Pose2D target_manual theta 38-39
  rx_data.target_manual.theta = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.data_n_robot_mux_1 = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.data_n_robot_mux_2 = message.readInt16LE(byte_counter);
  byte_counter += 2;

  rx_data.trim_kecepatan_robot1 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_kecepatan_robot2 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_kecepatan_robot3 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_kecepatan_robot4 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_kecepatan_robot5 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_kecepatan_sudut_robot1 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_kecepatan_sudut_robot2 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_kecepatan_sudut_robot3 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_kecepatan_sudut_robot4 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_kecepatan_sudut_robot5 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_penendang_robot1 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_penendang_robot2 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_penendang_robot3 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_penendang_robot4 = message.readUInt8(byte_counter);
  byte_counter += 1;

  rx_data.trim_penendang_robot5 = message.readUInt8(byte_counter);
  byte_counter += 1;

  console.log("receive = ", rx_data, byte_counter);
});
