var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {
	console.log(msg.toString('utf8', 0, msg.length-1 ));
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(41234);
server.setTTL(255);
server.setBroadcast(true);
//server.setMulticastLoopback(true);
// server listening 0.0.0.0:41234

var name = process.argv[2];
var client = dgram.createSocket("udp4");
client.bind("41234");
client.setBroadcast(true);


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
	// process.stdout.write('data: ' + chunk);
	var message = new Buffer(name + " : " + chunk);
	//client.setBroadcast(true);
	//      inet 192.168.4.101 netmask 0xfffffc00 broadcast 192.168.7.255
	client.send(message, 0, message.length, "41234", "224.0.0.1");
	return false;
});

process.stdin.on('end', function () {
//	process.stdout.write('end');
});
