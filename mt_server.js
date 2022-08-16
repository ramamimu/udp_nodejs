//Multicast Server sending messages
var news = [
  "Borussia Dortmund wins German championship",
  "Tornado warning for the Bay Area",
  "More rain for the weekend",
  "Android tablets take over the world",
  "iPad2 sold out",
  "Nation's rappers down to last two samples",
];

var PORT = 1111;
var MCAST_ADDR = "192.168.0.26"; //not your IP and should be a Class D address, see http://www.iana.org/assignments/multicast-addresses/multicast-addresses.xhtml
var dgram = require("dgram");
let Buffer = require("buffer");
var server = dgram.createSocket("udp4");
server.bind(PORT, function () {
  server.setBroadcast(true);
  server.setMulticastTTL(128);
  server.addMembership(MCAST_ADDR);
});

setInterval(broadcastNew, 3000);

function broadcastNew() {
  //   var message = new Buffer(news[Math.floor(Math.random() * news.length)]);
  //   server.send(message, 0, message.length, PORT, MCAST_ADDR);
  // console.log("Sent " + message + " to the wire...");
  console.log("Sent to the wire...");
}
