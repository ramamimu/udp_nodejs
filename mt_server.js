// ----- UDP SERVER MULTICAST

const udp = require("dgram");
const Robot = require("./class/robot.js");
let Buffer = require("buffer").Buffer;
// const PORT_UDP = "1026";
const PORT_UDP = "3333";
const PORT_SOCKET = "9192";
const GROUP = "224.16.32.69";
const HOST = "0.0.0.0";
const mtcast = udp.createSocket("udp4");
const ROBOT = [
  new Robot(
    1,
    100,
    180,
    11,
    1,
    400,
    900,
    15,
    5,
    111,
    1111,
    111,
    1111,
    [100, 240, 123, 223, 900],
    [10, 24, 223, 900, 223],
    50,
    14,
    [
      [100, 1],
      [120, 1],
      [120, 1],
      [110, 1],
      [115, 1],
      [108, 1],
      [46, 6],
      [90, 6],
      [64, 6],
      [78, 7],
      [40, 5],
      [54, 2],
      [87, 1],
      [63, 1],
    ],
    35,
    0,
    240,
    100,
    120,
    350,
    673,
    200,
    200,
    14,
    [
      [100, 140],
      [500, 200],
      [300, 100],
      [-110, 1000],
      [-115, 300],
      [200, 102],
      [46, 233],
      [-90, 210],
      [100, -500],
      [200, -100],
      [-40, 456],
      [540, 355],
      [100, 112],
      [110, 211],
    ],
  ),
  new Robot(
    2,
    10,
    10,
    101,
    1,
    22,
    222,
    3,
    5,
    222,
    2221,
    222,
    2221,
    [90, 240, 203, 950, 203],
    [300, 440, 223, 253, 910],
    60,
    14,
    [
      [100, 1],
      [120, 1],
      [120, 1],
      [110, 1],
      [115, 1],
      [108, 1],
      [46, 6],
      [90, 6],
      [64, 6],
      [78, 7],
      [40, 5],
      [54, 2],
      [87, 1],
      [63, 1],
    ],
    34,
    1000,
    500,
    100,
    120,
    350,
    673,
    300,
    300,
    14,
    [
      [100, 140],
      [500, 200],
      [300, 100],
      [-110, 1000],
      [-115, 300],
      [200, 102],
      [46, 233],
      [-90, 210],
      [100, -500],
      [200, -100],
      [-40, 456],
      [540, 355],
      [100, 112],
      [110, 211],
    ],
  ),
  new Robot(
    3,
    333,
    333,
    31,
    1,
    500,
    233,
    4,
    7,
    333,
    3331,
    333,
    3331,
    [20, 120, 133, 320, 10],
    [300, 450, 212, 275, 190],
    70,
    14,
    [
      [100, 1],
      [120, 1],
      [120, 1],
      [110, 1],
      [115, 1],
      [108, 1],
      [46, 6],
      [90, 6],
      [64, 6],
      [78, 7],
      [40, 5],
      [54, 2],
      [87, 1],
      [63, 1],
    ],
    33.4,
    780,
    1100,
    100,
    120,
    350,
    673,
    400,
    400,
    14,
    [
      [100, 140],
      [500, 200],
      [300, 100],
      [-110, 1000],
      [-115, 300],
      [200, 102],
      [46, 233],
      [-90, 210],
      [100, -500],
      [200, -100],
      [-40, 456],
      [540, 355],
      [100, 112],
      [110, 211],
    ],
  ),
  new Robot(
    4,
    444,
    444,
    41,
    1,
    701,
    744,
    5,
    8,
    444,
    4441,
    444,
    4441,
    [202, 10, 313, 70, 80],
    [230, 120, 872, 295, 60],
    80,
    14,
    [
      [100, 140],
      [100, 141],
      [100, 142],
      [100, 143],
      [100, 0],
      [100, 1],
      [100, 2],
      [100, 3],
      [100, 4],
      [100, 5],
      [100, 90],
      [100, 91],
      [100, 92],
      [100, 93],
    ],
    31.9,
    800,
    1089,
    100,
    120,
    350,
    673,
    500,
    500,
    14,
    [
      [100, 140],
      [500, 200],
      [300, 100],
      [-110, 1000],
      [-115, 300],
      [200, 102],
      [46, 233],
      [-90, 210],
      [100, -500],
      [200, -100],
      [-40, 456],
      [540, 355],
      [100, 112],
      [110, 211],
    ],
  ),
  new Robot(
    5,
    555,
    555,
    51,
    1,
    500,
    555,
    6,
    9,
    555,
    5551,
    555,
    5551,
    [52, 754, 123, 856, 213],
    [239, 64, 754, 442, 53],
    90,
    14,
    [
      [100, 140],
      [120, 142],
      [120, 143],
      [110, 0],
      [115, 1],
      [108, 2],
      [46, 3],
      [90, 4],
      [64, 5],
      [78, 6],
      [40, 7],
      [54, 3],
      [87, 1],
      [63, 1],
    ],
    23,
    500,
    900,
    100,
    120,
    350,
    673,
    600,
    600,
    14,
    [
      [100, 140],
      [500, 200],
      [300, 100],
      [-110, 1000],
      [-115, 300],
      [200, 102],
      [46, 233],
      [-90, 210],
      [100, -500],
      [200, -100],
      [-40, 456],
      [540, 355],
      [100, 112],
      [110, 211],
    ],
  ),
];

mtcast.on("listening", function () {
  mtcast.setBroadcast(true);
  mtcast.setMulticastTTL(1);
  mtcast.addMembership(GROUP, HOST);
});

let temp = 0;

// setInterval(() => {
//   for (let i = 0; i < 5; i++) {
//     const Robot = ROBOT[i];
//     Robot.pos_y = (Robot.pos_y + 1) % 1500;
//   }
//   temp++;
// }, 20);

mtcast.bind(PORT_SOCKET, HOST, () => { });

// logic robot to bs
function writeDataBufferRobotToBs(index_robot) {
  // let data = Buffer.allocUnsafe(102);
  // let data = Buffer.allocUnsafe(145);
  let data = Buffer.allocUnsafe(161);
  // let data = Buffer.allocUnsafe(72);
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
  byte_counter = data.writeInt16LE(Robot.robot_condition, byte_counter); //robot condition
  byte_counter = data.writeUint8(Robot.target_umpan, byte_counter); //target umpan
  byte_counter = data.writeUint8(Robot.index_point, byte_counter); //index point
  byte_counter = data.writeUint8(Robot.obs_length, byte_counter); //obs length

  for (let i = 0; i < 14; i++) {
    byte_counter = data.writeInt16LE(Robot.obs[i][0], byte_counter);
    byte_counter = data.writeInt16LE(Robot.obs[i][1], byte_counter);
  }

  byte_counter = data.writeFloatLE(Robot.battery_health, byte_counter);

  byte_counter = data.writeInt16LE(Robot.goalkeeper_field_x, byte_counter);
  byte_counter = data.writeInt16LE(Robot.goalkeeper_field_y, byte_counter);

  byte_counter = data.writeInt16LE(Robot.ball_next_x, byte_counter);
  byte_counter = data.writeInt16LE(Robot.ball_next_y, byte_counter);

  byte_counter = data.writeInt16LE(Robot.robot_next_x, byte_counter);
  byte_counter = data.writeInt16LE(Robot.robot_next_y, byte_counter);

  byte_counter = data.writeInt16LE(Robot.pass_target_x, byte_counter);
  byte_counter = data.writeInt16LE(Robot.pass_target_y, byte_counter);

  byte_counter = data.writeUint8(Robot.pos_obs_length, byte_counter); //obs length

  for (let i = 0; i < 14; i++) {
    byte_counter = data.writeInt16LE(Robot.pos_obs[i][0], byte_counter);
    byte_counter = data.writeInt16LE(Robot.pos_obs[i][1], byte_counter);
  }

  // byte_counter = data.writeInt16LE(10, byte_counter);
  // byte_counter = data.writeInt16LE(10, byte_counter);
  // byte_counter = data.writeInt16LE(10, byte_counter);

  // byte_counter = data.writeInt16LE(10, byte_counter);
  // byte_counter = data.writeInt16LE(10, byte_counter);

  // console.log(byte_counter, Robot);
  return data;
}

setInterval(() => {
  const robot_len = ROBOT.length;
  for (let i = 0; i < ROBOT.length; i++) {
    // if (i == 0) continue;
    // if (i == 1) continue;
    // if (i == 2) continue;
    // if (i == 3) continue;
    // if (i == 4) continue;
    console.log(i);
    let data = writeDataBufferRobotToBs(i);
    mtcast.send(data, 0, data.length, PORT_UDP, GROUP, function (err) {
      if (err) console.log(err);
      console.log("\n" + new Date().getTime() + "\nA: Message pcToBs to UDP group sent");
    });
  }
}, 500);
