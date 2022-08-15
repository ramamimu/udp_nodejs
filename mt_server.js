var news = [
  "Borussia Dortmund wins German championship",
  "Tornado warning for the Bay Area",
  "More rain for the weekend",
  "Android tablets take over the world",
  "iPad2 sold out",
  "Nation's rappers down to last two samples",
];

const udp = require("dgram");
const Buffer = require("buffer");

const group = "224.16.80.32";

var server = udp.createSocket("udp4");
server.bind();
server.setBroadcast(true);
server.setMulticastTTL(128);
server.addMembership(group);

setInterval(broadcastNew, 3000);

function broadcastNew() {
  var message = new Buffer(news[Math.floor(Math.random() * news.length)]);
  server.send(message, 0, message.length, 8088, group);
  console.log("Sent " + message + " to the wire...");
  //server.close();
}
