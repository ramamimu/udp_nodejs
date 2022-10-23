// ----- UDP SERVER MULTICAST

const udp = require("dgram");
const Robot = require("./class/robot.js");
let Buffer = require("buffer").Buffer;
// const PORT_UDP = "1026";
const PORT_UDP = "1026";
const PORT_SOCKET = "6666";
const GROUP = "224.16.32.80";
const HOST = "0.0.0.0";
const mtcast = udp.createSocket("udp4");
const ROBOT = [
  new Robot(1, 110, 180, 11, 1, 11, 191),
  new Robot(2, 220, 100, 101, 0, 22, 222),
  new Robot(3, 333, 333, 31, 1, 900, 333),
  new Robot(4, 444, 444, 41, 1, 701, 744),
  new Robot(5, 555, 555, 51, 1, 5001, 555),
];

mtcast.on("listening", function () {
  mtcast.setBroadcast(true);
  mtcast.setMulticastTTL(64);
  mtcast.addMembership(GROUP, HOST);
});

let temp = 0;

setInterval(() => {
  temp++;
}, 20);

mtcast.bind(PORT_SOCKET, HOST, () => {});

// logic robot to bs
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

  console.log("byte counter => ", byte_counter);

  return data;
}

setInterval(() => {
  const robot_len = ROBOT.length;
  for (let i = 0; i < ROBOT.length; i++) {
    if (i == 0) continue;
    if (i == 1) continue;
    // if (i == 2) continue;
    // if (i == 3) continue;
    // if (i == 4) continue;
    let data = writeDataBufferRobotToBs(i);
    // let data = "something weird";
    // console.log("the length data ", data.byte_counter);
    mtcast.send(data, 0, data.length, PORT_UDP, GROUP, function (err) {
      if (err) console.log(err);
      console.log(
        "\n" + new Date().getTime() + "\nA: Message pcToBs to UDP group sent"
      );
    });
  }
}, 100);
