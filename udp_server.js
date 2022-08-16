// server
var udp = require("dgram");
let Buffer = require("buffer").Buffer;

// --------------------creating a udp server --------------------

let temp = 0;

setInterval(() => {
  temp++;
}, 50);

const pushData = () => {
  // let data = Buffer.allocUnsafe(12);
  // data.writeInt8(105, 0);
  // data.writeInt16LE(1231, 1);
  //
  const buff = Buffer.allocUnsafe(2);
  let data = 6969 + temp;
  buff.write(data.toString(), 0, 4, "utf8");

  return buff;
};

const PORT = "1111";
const GROUP = "224.16.32.80";
const HOST = "0.0.0.0";

var mtcast = udp.createSocket("udp4");

// emits when any error occurs
mtcast.on("listening", function () {
  var address = mtcast.address();
  console.log(
    "UDP Client listening on " + address.address + ":" + address.port
  );
  mtcast.setBroadcast(true);
  mtcast.setMulticastTTL(64);
  mtcast.addMembership(GROUP, HOST);
});

mtcast.on("message", function (message, remote) {
  console.log("A: Epic Command Received. Preparing Relay.");
  console.log(
    "B: From: " + remote.address + ":" + remote.port + " - " + message
  );
});

var news = [
  "Borussia Dortmund wins German championship",
  "Tornado warning for the Bay Area",
  "More rain for the weekend",
  "Android tablets take over the world",
  "iPad2 sold out",
  "Nation's rappers down to last two samples",
];

var message = Buffer(news[Math.floor(Math.random() * news.length)]);
mtcast.bind(PORT, HOST, () => {
  setInterval(() => {
    mtcast.send(pushData(), 0, pushData().length, PORT, GROUP, function (err) {
      if (err) console.log(err);
      console.log("Message sent");
    });
  }, 100);
});
