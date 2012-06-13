var dgram = require('dgram');
var name = process.argv[2];
var message = new Buffer(name);
var client = dgram.createSocket("udp4");
client.bind("41234");
client.setBroadcast(true);
//client.setBroadcast(true);
// 	inet 192.168.4.101 netmask 0xfffffc00 broadcast 192.168.7.255
client.send(message, 0, message.length, "41234", "224.0.0.1", function(err, bytes){
	console.log(arguments);
	console.log(err);
	console.log(bytes);
client.close();
});
