// Utility functions for socket.io

const getUsers = (server: SocketIO.Server) => {
	return Object.values(server.sockets.sockets)
};