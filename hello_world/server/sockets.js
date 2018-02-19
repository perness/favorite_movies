const ws = require("ws");

exports.connect = (httpServer) => {
	const wsServer = new ws.Server({ server: httpServer });

	let totalConnections = [];

	wsServer.on("connection", (socket) => {
		totalConnections.push(socket);
		console.log("Socket connection established");
		console.log(`Total number of sockets connected ${totalConnections.length}`);

		socket.on("close", () => {
			console.log("Socket disconnected");
			console.log(`Total number of sockets connected ${totalConnections.length}`);
			totalConnections = totalConnections.filter(savedSocket => savedSocket !== socket);
		});

		socket.on("message", (movie) => {
			totalConnections.forEach(currentSocket => currentSocket.send(movie));
		});
	});
};
