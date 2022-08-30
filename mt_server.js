// ----- UDP SERVER MULTICAST
const udp = require("dgram");

let Buffer = require("buffer").Buffer;
const PORT_UDP = "5656";
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

// logic robot to bs
function writeDataBufferRobotToBs() {
  let data = Buffer.allocUnsafe(34);

  data.write("i", 0);
  data.write("t", 1);
  const njajal = "s";
  data.write(njajal, 2);
  let byte_counter = 3;
  byte_counter = data.writeUint8(3, byte_counter); // bs 0, r1 1 dst...

  byte_counter = data.writeBigInt64LE(
    BigInt(Math.floor(new Date().getTime() / 1000)),
    byte_counter
  ); // epoch sender n getter
  byte_counter = data.writeInt16LE(123, byte_counter); //pos x
  byte_counter = data.writeInt16LE(1232, byte_counter); //pos y
  byte_counter = data.writeInt16LE(1232, byte_counter); //theta
  byte_counter = data.writeUint8(3, byte_counter); //status bola
  byte_counter = data.writeInt16LE(123, byte_counter); //bola x pada lapangan
  byte_counter = data.writeInt16LE(3142, byte_counter); //bola y pada lapangan
  byte_counter = data.writeInt16LE(1234, byte_counter); //robot condition
  byte_counter = data.writeUint8(3, byte_counter); //target umpan
  byte_counter = data.writeUint16LE(312, byte_counter); //status algoritma
  byte_counter = data.writeUint16LE(129, byte_counter); //status sub algoritma
  byte_counter = data.writeUint16LE(181, byte_counter); //status sub** algoritma
  byte_counter = data.writeUint16LE(212, byte_counter); //status sub*** algoritma
  console.log("byte counter => ", byte_counter);

  return data;
}

setInterval(() => {
  let data = writeDataBufferRobotToBs();
  // let data = "something weird";
  // console.log("the length data ", data.byte_counter);
  mtcast.send(data, 0, data.length, PORT_UDP, GROUP, function (err) {
    if (err) console.log(err);
    console.log(
      "\n" + new Date().getTime() + "\nA: Message pcToBs to UDP group sent"
    );
  });
}, 100);
