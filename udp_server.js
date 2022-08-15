// server
var udp = require("dgram");
let Buffer = require("buffer");

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket("udp4");

// emits when any error occurs
server.on("error", function (error) {
  console.log("Error: " + error);
  server.close();
});

let count = 0;
// emits on new datagram msg
server.on("message", function (msg, info) {
  console.log("Data received from client : " + msg);
  // let buf = Buffer.from(msg, "utf8");
  // int16_t clientKirimInt=1201;
  // float clientKirimFloat=36.11;
  // uint8_t clientKirimByte=128;
  // let clientKirimInt = msg.readUInt16BE;
  // let clientKirimFloat = msg.readFloatBE;
  // let clientKirimByte = msg.readUInt8;
  // console.log("=>>> per bit " + clientKirimInt);
  // console.log("=>>> per bit " + clientKirimFloat);
  // console.log("=>>> per bit " + clientKirimByte);
  msg.forEach((item, index) => {
    console.log(item.toString());
    console.log("=> ", index);
  });
  // console.log(typeof msg);
  // console.log(
  //   "Received %d bytes from %s:%d\n",
  //   msg.length,
  //   info.address,
  //   info.port
  // );

  // var data = Buffer.from("Hi I m the udp_client from js");
  // var data = `Hi I m the udp_client from js ${count++}`;
  //sending msg
  // server.send(data, info.port, "192.168.1.12", function (error) {
  //   if (error) {
  //     client.close();
  //   } else {
  //     console.log("Data sent !!!");
  //   }
  // });
});

//emits when socket is ready and listening for datagram msgs
server.on("listening", function () {
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log("Server is listening at port " + port);
  console.log("Server ip :" + ipaddr);
  console.log("Server is IP4/IP6 : " + family);
});

server.on("close", function () {
  console.log("Socket is closed !");
});

server.bind({
  port: 8081,
  address: "127.0.0.1",
});

// setTimeout(function () {
//   server.close();
// }, 8000);
