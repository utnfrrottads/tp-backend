const io = require('socket.io')(process.env.SOCKET_PORT, {
  cors: {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST'],
  }
});

module.exports = io;
