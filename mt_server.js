// ----- UDP SERVER MULTICAST
const udp = require("dgram");

let Buffer = require("buffer").Buffer;
const PORT_UDP = "1111";
const GROUP = "224.16.32.80";
const HOST = "0.0.0.0";
const mtcast = udp.createSocket("udp4");

mtcast.on("listening", function () {
  mtcast.setBroadcast(true);
  mtcast.setMulticastTTL(64);
  mtcast.addMembership(GROUP, HOST);
});

let temp = 0;

setInterval(() => {
  temp++;
}, 20);

mtcast.bind(PORT_UDP, HOST, () => {});

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

  let data = {};
  data.header = [
    String.fromCharCode(message[0]),
    String.fromCharCode(message[1]),
    String.fromCharCode(message[2]),
  ];
  let counter = 3;
  // data.pos_x = message.readInt16LE(3); //pos x
  data.pos_x = message.readInt16LE(counter); //pos x
  counter += 2;
  // data.pos_y = message.readInt16LE(5); //pos y
  data.pos_y = message.readInt16LE(counter); //pos y
  counter += 2;
  // data.theta = message.readInt16LE(7); //theta
  data.theta = message.readInt16LE(counter); //theta
  counter += 1;
  // data.status_bola = message.readUint8(9); //bola x pada lapangan
  data.status_bola = message.readUint8(counter); //bola x pada lapangan
  counter += 1;
  // data.bola_x = message.readInt16LE(10); //bola y pada lapangan
  data.bola_x = message.readInt16LE(counter); //bola y pada lapangan
  counter += 2;
  // data.bola_y = message.readInt16LE(12); //bola y pada lapangan
  data.bola_y = message.readInt16LE(counter); //bola y pada lapangan
  counter += 2;
  // data.mcl_x = message.readInt16LE(14); //mcl x
  data.mcl_x = message.readInt16LE(counter); //mcl x
  counter += 2;
  // data.mcl_y = message.readInt16LE(16); //mcl y
  data.mcl_y = message.readInt16LE(counter); //mcl y
  counter += 2;
  // data.mcl_theta = message.readInt16LE(18); //mcl theta
  data.mcl_theta = message.readInt16LE(counter); //mcl theta
  counter += 2;
  // data.robot_condition = message.readInt16LE(20); //robot condition
  data.robot_condition = message.readInt16LE(counter); //robot condition
  counter += 2;
  // data.status_algoritma = message.readUint16LE(22); //status algoritma
  data.status_algoritma = message.readUint16LE(counter); //status algoritma
  counter += 2;
  // data.status_sub_algoritma = message.readUint16LE(24); //status sub algoritma
  data.status_sub_algoritma = message.readUint16LE(counter); //status sub algoritma
  counter += 2;
  // data.status_sub_sub_algoritma = message.readUint16LE(26); //status sub sub algoritma
  data.status_sub_sub_algoritma = message.readUint16LE(counter); //status sub sub algoritma
  counter += 2;
  // data.status_sub_sub_sub_algoritma = message.readUint16LE(28); //status sub sub sub algoritma
  data.status_sub_sub_sub_algoritma = message.readUint16LE(counter); //status sub sub sub algoritma
  counter += 2;
  // data.target_umpan = message.readUint8(30); //target umpan
  data.target_umpan = message.readUint8(counter); //target umpan
  counter += 1;
  // data.epoch = message.readUint32LE(31); //epoch
  data.epoch = message.readUint32LE(counter); //epoch
  counter += 4;
  // data.stm_epoch = message.readUint32LE(35); //stm epoch
  data.stm_epoch = message.readUint32LE(counter); //stm epoch

  counter = 39;
  data.obs = [];
  for (let i = 0; i < 144; i++) {
    data.obs[i] = message.readUint16LE(counter);
    counter += 2;
  }

  // console.log(data);
});

// logic robot to bs
function writeDataBufferRobotToBs() {
  // 288 data array of obstacle
  let data = Buffer.allocUnsafe(39 + 288);
  let counter = 0;
  let byte_counter;

  byte_counter = data.write("i", 0);
  // console.log("bt counter i => ", byte_counter);
  byte_counter = data.write("t", 1);
  // console.log("bt counter t => ", byte_counter);
  const njajal = "p";
  byte_counter = data.write(njajal, 2);
  // console.log("bt counter s => ", byte_counter);
  byte_counter = data.writeInt16LE(100, 3); //pos x
  // console.log("bt counter pos x => ", byte_counter);
  const coba = 333;
  byte_counter = data.writeInt16LE(coba, byte_counter); //pos y
  // console.log("bt counter pos y => ", byte_counter);
  byte_counter = data.writeInt16LE(90, byte_counter); //theta
  // console.log("bt counter theta => ", byte_counter);
  byte_counter = data.writeUint8(2, byte_counter); //status bola
  // console.log("bt counter status bola => ", byte_counter);
  byte_counter = data.writeInt16LE(110, byte_counter); //bola x pada lapangan
  // console.log("bt counter bola x pada lapangan => ", byte_counter);
  byte_counter = data.writeInt16LE(120, byte_counter); //bola y pada lapangan
  // console.log("bt counter bola y pada lapangan => ", byte_counter);
  byte_counter = data.writeInt16LE(160, byte_counter); //mcl x
  // console.log("bt counter mcl x => ", byte_counter);
  byte_counter = data.writeInt16LE(170, byte_counter); //mcl y
  // console.log("bt counter mcl y => ", byte_counter);
  byte_counter = data.writeInt16LE(180, byte_counter); //mcl theta
  // console.log("bt counter mcl theta => ", byte_counter);
  byte_counter = data.writeInt16LE(200, byte_counter); //robot condition
  // console.log("bt counter robot condition => ", byte_counter);
  byte_counter = data.writeUint16LE(210, byte_counter); //status algoritma
  // console.log("bt counter status algoritma => ", byte_counter);
  byte_counter = data.writeUint16LE(211, byte_counter); //status sub algoritma
  // console.log("bt counter status sub algoritma => ", byte_counter);
  byte_counter = data.writeUint16LE(212, byte_counter); //status sub sub algoritma
  // console.log("bt counter status sub sub algoritma => ", byte_counter);
  byte_counter = data.writeUint16LE(213, byte_counter); //status sub sub sub algoritma
  // console.log("bt counter status sub sub sub algoritma => ", byte_counter);
  byte_counter = data.writeUint8(2, byte_counter); //target umpan
  // console.log("bt counter target umpan => ", byte_counter);
  byte_counter = data.writeUint32LE(1212, byte_counter); //epoch
  // console.log("bt counter epoch => ", byte_counter);
  byte_counter = data.writeUint32LE(2121 + temp, byte_counter); //stm epoch
  // console.log("bt counter stm epoch => ", byte_counter);

  for (let i = 0; i < 144; i++) {
    byte_counter = data.writeUint16LE(i + 5 + temp, byte_counter);
    // console.log(
    //   "bt counter obs arr => ",
    //   i + 5,
    //   " =>> ",
    //   byte_counter,
    //   " || ",
    //   i,
    //   " res = ",
    //   data.readUint16LE(byte_counter - 2)
    // );
  }

  return data;
}

setInterval(() => {
  let data = writeDataBufferRobotToBs();
  mtcast.send(data, 0, data.length, PORT_UDP, GROUP, function (err) {
    if (err) console.log(err);
    console.log(
      "\n" + new Date().getTime() + "\nA: Message pcToBs to UDP group sent"
    );
  });
}, 25);
