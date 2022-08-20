const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origins: ["http://localhost:5173"],
  },
});

// ----- UDP SERVER MULTICAST
const udp = require("dgram");

let Buffer = require("buffer").Buffer;
const PORT_UDP = "1111";
const GROUP = "224.16.32.80";
const HOST = "0.0.0.0";
const mtcast = udp.createSocket("udp4");

mtcast.on("listening", function () {
  // var address = mtcast.address();
  // console.log(
  //   "UDP Client listening on " + address.address + ":" + address.port
  // );
  mtcast.setBroadcast(true);
  mtcast.setMulticastTTL(64);
  mtcast.addMembership(GROUP, HOST);
});

// var news = [
//   "Borussia Dortmund wins German championship",
//   "Tornado warning for the Bay Area",
//   "More rain for the weekend",
//   "Android tablets take over the world",
//   "iPad2 sold out",
//   "Nation's rappers down to last two samples",
// ];

let temp = 0;

setInterval(() => {
  temp++;
}, 1000);

// const pushData = () => {
// let data = Buffer.allocUnsafe(12);
// data.writeInt8(105, 0);
// data.writeInt16LE(1231, 1);
//   const buff = Buffer.allocUnsafe(4);
//   let data = 6969 + temp > 9999 ? 1111 : 6969 + temp;
//   buff.write(data.toString(), 0, 4, "utf8");

//   return buff;
// };

mtcast.bind(PORT_UDP, HOST, () => {
  // setInterval(() => {
  //   var message = Buffer(news[Math.floor(Math.random() * news.length)]);
  //   mtcast.send(
  //     pushData(),
  //     0,
  //     pushData().length,
  //     PORT_UDP,
  //     GROUP,
  //     function (err) {
  //       // mtcast.send(message, 0, message.length, PORT_UDP, GROUP, function (err) {
  //       if (err) console.log(err);
  //       // console.log(new Date().getTime() + "\nA: Message sent");
  //     }
  //   );
  // }, 100);
});

// function readDataBufferRobotToBs() {
//   let data = Buffer.allocUnsafe(39);
//   let counter = 0;

//   data.w("i", counter);
//   counter += 1;
//   data.write("t", counter);
//   counter += 1;
//   data.write("s", counter);
//   counter += 1;
//   data.writeInt16LE(100, counter); //pos x
//   counter += 2;
//   data.writeInt16LE(110, counter); //pos y
//   counter += 2;
//   data.writeInt16LE(90, counter); //theta
//   counter += 2;
//   data.writeUint8(2, counter); //status bola
//   counter += 1;
//   data.writeInt16LE(110, counter); //bola x pada lapangan
//   counter += 2;
//   data.writeInt16LE(120, counter); //bola y pada lapangan
//   counter += 2;
//   data.writeInt16LE(160, counter); //mcl x
//   counter += 2;
//   data.writeInt16LE(170, counter); //mcl y
//   counter += 2;
//   data.writeInt16LE(180, counter); //mcl theta
//   counter += 2;
//   data.writeInt16LE(200, counter); //robot condition
//   counter += 2;
//   data.writeUint16LE(210, counter); //status algoritma
//   counter += 2;
//   data.writeUint16LE(211, counter); //status sub algoritma
//   counter += 2;
//   data.writeUint16LE(212, counter); //status sub sub algoritma
//   counter += 2;
//   data.writeUint16LE(213, counter); //status sub sub sub algoritma
//   counter += 2;
//   data.writeUint8(2, counter); //target umpan
//   counter += 1;
//   data.writeUint32LE(1212, counter); //epoch
//   counter += 4;
//   data.writeUint32LE(2121, counter); //stm epoch
//   counter += 4;

//   return data;
// }

mtcast.on("message", function (message, remote) {
  console.log(
    new Date().getTime() +
      " \nB: data From UDP group pc2Bs: " +
      remote.address +
      ":" +
      remote.port
  );
  // + " - " +
  // message

  let data = {};
  data.header = [
    String.fromCharCode(message[0]),
    String.fromCharCode(message[1]),
    String.fromCharCode(message[2]),
  ];

  data.pos_x = message.readInt16LE(3); //pos x
  data.pos_y = message.readInt16LE(5); //pos y
  data.theta = message.readInt16LE(7); //theta
  data.status_bola = message.readUint8(9); //status bola
  data.bola_x = message.readInt16LE(10); // bola x pada lapangan
  data.bola_y = message.readInt16LE(12); //bola y pada lapangan
  data.mcl_x = message.readInt16LE(14); //mcl x
  data.mcl_y = message.readInt16LE(16); //mcl y
  data.mcl_theta = message.readInt16LE(18); //mcl theta
  data.robot_condition = message.readInt16LE(20); //robot condition
  data.status_algoritma = message.readUint16LE(22); //status algoritma
  data.status_sub_algoritma = message.readUint16LE(24); //status sub algoritma
  data.status_sub_sub_algoritma = message.readUint16LE(26); //status sub sub algoritma
  data.status_sub_sub_sub_algoritma = message.readUint16LE(28); //status sub sub sub algoritma
  data.target_umpan = message.readUint8(30); //target umpan
  data.epoch = message.readUint32LE(31); //epoch
  data.stm_epoch = message.readUint32LE(35); //stm epoch

  // let counter = 39;
  // data.obs = [];
  // for (let i = 0; i < 144; i++) {
  //   data.obs[i] = message.readUint16LE(counter);
  //   counter += 2;
  // }

  console.log(data);

  console.log("===== TEST");
  // console.log(message.readUint16LE(55));
  console.log("===== BATAS TEST");

  io.emit("sub message", data);
});

// ---- LOGIC SOCKET

const PORT_SOCKET = 4000;

// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });

io.on("connection", (socket) => {
  // console.log("a user connected");
  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });
  // socket.on("my message", (msg) => {
  //   console.log(`${new Date().getTime()}\nC: message receive from UI\n${msg}`);
  //   mtcast.send(msg, 0, msg.length, PORT_UDP, GROUP, function (err) {
  //     if (err) console.log(err);
  //     console.log(
  //       "\n" + new Date().getTime() + "\nD: Message to UDP group sent"
  //     );
  //   });
  // });
});

// logic robot to bs
function writeDataBufferRobotToBs() {
  // 288 data array of obstacle
  let data = Buffer.allocUnsafe(39 + 288);
  let counter = 0;
  let byte_counter;

  byte_counter = data.write("i", 0);
  console.log("bt counter i => ", byte_counter);
  byte_counter = data.write("t", 1);
  console.log("bt counter t => ", byte_counter);
  const njajal = "p";
  byte_counter = data.write(njajal, 2);
  console.log("bt counter s => ", byte_counter);
  byte_counter = data.writeInt16LE(100, 3); //pos x
  console.log("bt counter pos x => ", byte_counter);
  const coba = 333;
  byte_counter = data.writeInt16LE(coba, byte_counter); //pos y
  console.log("bt counter pos y => ", byte_counter);
  byte_counter = data.writeInt16LE(90, byte_counter); //theta
  console.log("bt counter theta => ", byte_counter);
  byte_counter = data.writeUint8(2, byte_counter); //status bola
  console.log("bt counter status bola => ", byte_counter);
  byte_counter = data.writeInt16LE(110, byte_counter); //bola x pada lapangan
  console.log("bt counter bola x pada lapangan => ", byte_counter);
  byte_counter = data.writeInt16LE(120, byte_counter); //bola y pada lapangan
  console.log("bt counter bola y pada lapangan => ", byte_counter);
  byte_counter = data.writeInt16LE(160, byte_counter); //mcl x
  console.log("bt counter mcl x => ", byte_counter);
  byte_counter = data.writeInt16LE(170, byte_counter); //mcl y
  console.log("bt counter mcl y => ", byte_counter);
  byte_counter = data.writeInt16LE(180, byte_counter); //mcl theta
  console.log("bt counter mcl theta => ", byte_counter);
  byte_counter = data.writeInt16LE(200, byte_counter); //robot condition
  console.log("bt counter robot condition => ", byte_counter);
  byte_counter = data.writeUint16LE(210, byte_counter); //status algoritma
  console.log("bt counter status algoritma => ", byte_counter);
  byte_counter = data.writeUint16LE(211, byte_counter); //status sub algoritma
  console.log("bt counter status sub algoritma => ", byte_counter);
  byte_counter = data.writeUint16LE(212, byte_counter); //status sub sub algoritma
  console.log("bt counter status sub sub algoritma => ", byte_counter);
  byte_counter = data.writeUint16LE(213, byte_counter); //status sub sub sub algoritma
  console.log("bt counter status sub sub sub algoritma => ", byte_counter);
  byte_counter = data.writeUint8(2, byte_counter); //target umpan
  console.log("bt counter target umpan => ", byte_counter);
  byte_counter = data.writeUint32LE(1212, byte_counter); //epoch
  console.log("bt counter epoch => ", byte_counter);
  byte_counter = data.writeUint32LE(2121 + temp, byte_counter); //stm epoch
  console.log("bt counter stm epoch => ", byte_counter);

  // for (let i = 0; i < 144; i++) {
  //   byte_counter = data.writeUint16LE(i + 5, byte_counter);
  //   console.log(
  //     "bt counter obs arr => ",
  //     i + 5,
  //     " =>> ",
  //     byte_counter,
  //     " || ",
  //     i,
  //     " res = ",
  //     data.readUint16LE(byte_counter - 2)
  //   );
  // }
  // data.

  // let cobacoba = [];

  // for (let i = 0; i < 144; i++) {
  //   cobacoba.push(i);
  // }
  // const arrUint = new Uint16Array(cobacoba);

  // data.write(arrUint);

  // console.log(arrUint, " ======> ", arrUint.byteLength);

  // data.write(data.toString(), 0, counter, "utf8");
  // console.log("send: ", data.toString());
  data.write(data.toString(), 0, byte_counter, "utf8");

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

// logic bs to robot

server.listen(PORT_SOCKET, () => {
  console.log(`listening on *:${PORT_SOCKET}`);
});
