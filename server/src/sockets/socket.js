const { SOCKET_PORT } = require('../../config');

const io = require('socket.io')(SOCKET_PORT, {
  cors: {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST'],
  }
});

module.exports = io;
