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
  rx_data.header = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 command 1-2
  rx_data.command = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 style 2-3
  rx_data.style = message.readInt8(byte_counter);
  byte_counter += 1;
  // uint8 cnn_status 3-4
  rx_data.cnn_status = message.readUInt8(byte_counter);
  byte_counter += 1;
  // uint8 n_robot_aktif 4-5
  rx_data.n_robot_aktif = message.readUInt8(byte_counter);
  byte_counter += 1;
  // uint8 n_robot_dekat_bola 5-6
  rx_data.n_robot_dekat_bola = message.readUInt8(byte_counter);
  byte_counter += 1;
  // uint8 n_robot_dapat_bola 6-7
  rx_data.n_robot_dapat_bola = message.readUInt8(byte_counter);
  byte_counter += 1;
  // int16 bola_x_pada_lapangan 7-9
  rx_data.bola_x_pada_lapangan = message.readInt16LE(byte_counter);
  byte_counter += 2;
  // int16 bola_y_pada_lapangan 9-11
  rx_data.bola_y_pada_lapangan = message.readInt16LE(byte_counter);
  byte_counter += 2;
  // int8 obs_0 11-12
  rx_data.obs_0 = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 obs_1 12-13
  rx_data.obs_1 = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 obs_2 13-14
  rx_data.obs_2 = message.readInt8(byte_counter);
  byte_counter += 1;
  // uint8 n_robot_sendiri 14-15
  rx_data.n_robot_sendiri = message.readUint8(byte_counter);
  byte_counter += 1;
  // uint8 n_robot_teman 15-16
  rx_data.n_robot_teman = message.readUint8(byte_counter);
  byte_counter += 1;
  // uint8 n_robot_umpan 16-17
  rx_data.n_robot_umpan = message.readUint8(byte_counter);
  byte_counter += 1;
  // uint8 n_robot_terima 17-18
  rx_data.n_robot_terima = message.readUint8(byte_counter);
  byte_counter += 1;
  // uint8 status_mcl 18-19
  rx_data.status_mcl = message.readUint8(byte_counter);
  byte_counter += 1;
  // uint16 pos_x_target_umpan 19-21
  rx_data.pos_x_target_umpan = message.readUint16LE(byte_counter);
  byte_counter += 2;
  // uint16 pos_y_target_umpan 21-23
  rx_data.pos_y_target_umpan = message.readUint16LE(byte_counter);
  byte_counter += 2;
  // int8 status_umpan 23-24
  rx_data.status_umpan = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 auto_kalibrasi 24-25
  rx_data.auto_kalibrasi = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 odometry_robot1 pos_x 25-26
  rx_data.odometry_robot1 = {};
  rx_data.odometry_robot1.x = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 odometry_robot1 pos_y 26-27
  rx_data.odometry_robot1.y = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 odometry_robot1 theta 27-28
  rx_data.odometry_robot1.theta = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 geometry_msgs/Pose2D offset_x 28-29
  rx_data.odometry_offset_robot1 = {};
  rx_data.odometry_offset_robot1.x = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 geometry_msgs/Pose2D offset_y 29-30
  rx_data.odometry_offset_robot1.y = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 geometry_msgs/Pose2D offset_theta 30-31
  rx_data.odometry_offset_robot1.theta = message.readInt8(byte_counter);
  byte_counter += 1;
  // uint8 trim_kecepatan_robot1 31-32
  rx_data.trim_kecepatan_robot1 = message.readUInt8(byte_counter);
  byte_counter += 1;
  // uint8 trim_kecepatan_sudut_robot1 32-33
  rx_data.trim_kecepatan_sudut_robot1 = message.readUInt8(byte_counter);
  byte_counter += 1;
  // uint8 trim_penendang_robot1 33-34
  rx_data.trim_penendang_robot1 = message.readUInt8(byte_counter);
  byte_counter += 1;
  // uint8 n_robot_manual 34-35
  rx_data.n_robot_manual = message.readInt8(byte_counter);
  byte_counter += 1;
  rx_data.target_manual = {};
  // int8 geometry_msgs/Pose2D target_manual x 35-36
  rx_data.target_manual.x = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 geometry_msgs/Pose2D target_manual y 37-38
  rx_data.target_manual.y = message.readInt8(byte_counter);
  byte_counter += 1;
  // int8 geometry_msgs/Pose2D target_manual theta 38-39
  rx_data.target_manual.theta = message.readInt8(byte_counter);
  byte_counter += 1;

  console.log("receive = ", rx_data);
});
