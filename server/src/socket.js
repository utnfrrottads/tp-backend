const jwt = require('jsonwebtoken');
const { SOCKET_PORT, TOKEN_SECRET } = require('../config');
const { Usuario, Mensaje, Contrato, Servicio } = require('./models/index');

const io = require('socket.io')(SOCKET_PORT, {
  cors: {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  onJoin(socket);
  onSendMessage(socket);
});

function onJoin(socket) {
  socket.on('join', async (token, idContrato) => {
    const payload = jwt.verify(token, TOKEN_SECRET);
    const usuario = await Usuario.findById(payload._id);
    if (usuario) {
      const contrato = await Contrato.findById(idContrato);
      contrato.servicio = await Servicio.findById(contrato.idServicio);
      if (contrato && !contrato.fechaCancelacion && (usuario._id == contrato.servicio.idUsuario || usuario._id == contrato.idUsuario)) {
        socket.usuario = usuario;
        socket.contrato = contrato;
        socket.join(socket.contrato._id.toString());
      }
    }
  });
}

function onSendMessage(socket) {
  socket.on('sendMessage', async (msj) => {
    if (socket.usuario && socket.contrato) {
      const contrato = await Contrato.findById(socket.contrato._id);
      if (!contrato.fechaCancelacion) {
        let mensaje = null;
        if (socket.usuario._id == socket.contrato.servicio.idUsuario) {
          mensaje = new Mensaje({
            mensaje: msj,
            mensajeEnviadoPorOferente: true,
            fechaHoraEnvio: new Date(),
            idContrato: socket.contrato._id.toString(),
          });
        } else if (socket.usuario._id == socket.contrato.idUsuario) {
          mensaje = new Mensaje({
            mensaje: msj,
            mensajeEnviadoPorOferente: false,
            fechaHoraEnvio: new Date(),
            idContrato: socket.contrato._id.toString(),
          });
        }
        if (mensaje) {
          mensaje.save();

          io.in(socket.contrato._id.toString()).emit('receiveMessage', {
            mensaje: mensaje.mensaje,
            mensajeEnviadoPorOferente: mensaje.mensajeEnviadoPorOferente,
            fechaHoraEnvio: mensaje.fechaHoraEnvio,
            contrato: {
              servicio: {
                usuario: {
                  _id: socket.contrato.servicio.idUsuario,
                }
              },
              usuario: {
                _id: socket.contrato.idUsuario,
              }
            }
          });
        }
      } else {
        socket.disconnect();
      }
    }
  });
}