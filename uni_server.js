const dgram = require("node:dgram");
const server = dgram.createSocket("udp4");
const ip = "localhost";
// const ip = "172.16.0.109";
const port = 6063;
const port_tx = 5667;

const Robot = require("./class/robot.js");
let Buffer = require("buffer").Buffer;
const ROBOT = [
  new Robot(1, 110, 180, 11, 1, 11, 191),
  new Robot(2, 220, 100, 101, 0, 22, 222),
  new Robot(3, 333, 333, 31, 1, 900, 333),
  new Robot(4, 444, 444, 41, 1, 701, 744),
  new Robot(5, 555, 555, 51, 1, 5001, 555),
];

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

function writeDataBufferRobotToBs(index_robot) {
  let data = Buffer.allocUnsafe(46);
  const Robot = ROBOT[index_robot];

  data.write("i", 0);
  data.write("t", 1);
  data.write("s", 2);
  data.write(`${index_robot + 1}`, 3); // bs 0, r1 1 dst...
  let byte_counter = 4;

  byte_counter = data.writeBigInt64LE(
    BigInt(Math.floor(new Date().getTime() / 1000)),
    byte_counter
  ); // epoch sender n getter
  byte_counter = data.writeInt16LE(Robot.pos_x, byte_counter); //pos x
  byte_counter = data.writeInt16LE(Robot.pos_y, byte_counter); //pos y
  byte_counter = data.writeInt16LE(Robot.theta, byte_counter); //theta
  byte_counter = data.writeUint8(Robot.status_bola, byte_counter); //status bola
  byte_counter = data.writeInt16LE(Robot.bola_x, byte_counter); //bola x pada lapangan
  byte_counter = data.writeInt16LE(Robot.bola_y, byte_counter); //bola y pada lapangan

  // console.log("byte counter => ", byte_counter);

  return data;
}

setInterval(() => {
  let data = writeDataBufferRobotToBs(2);
  server.send(data, port_tx, ip);
}, 50);

server.bind(port, (msg) => {
  console.log("listen port", port);
});
