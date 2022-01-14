const io = require('./socket');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../config');
const { Usuario, Mensaje, Contrato, Servicio, Notificacion } = require('../models/index');

io.on('connection', (socket) => {
  onJoinChat(socket);
  onSendMessage(socket);
});

function onJoinChat(socket) {
  socket.on('joinChat', async (token, idContrato) => {
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
        let notificacion = null;

        if (socket.usuario._id == socket.contrato.servicio.idUsuario) {
          mensaje = new Mensaje({
            mensaje: msj,
            mensajeEnviadoPorOferente: true,
            fechaHoraEnvio: new Date(),
            idContrato: socket.contrato._id.toString(),
          });

          notificacion = new Notificacion({
            descripcion: 'El ususario ' + socket.usuario.nombreUsuario + ' le envió un mensaje por el servicio: ' + socket.contrato.servicio.titulo,
            link: '/contrato/mensajes/' + socket.contrato._id,
            fechaHora: new Date(),
            leida: false,
            icono: "mensaje",
            idUsuario: socket.contrato.idUsuario
          });
        } else if (socket.usuario._id == socket.contrato.idUsuario) {
          mensaje = new Mensaje({
            mensaje: msj,
            mensajeEnviadoPorOferente: false,
            fechaHoraEnvio: new Date(),
            idContrato: socket.contrato._id.toString(),
          });

          notificacion = new Notificacion({
            descripcion: 'El ususario ' + socket.usuario.nombreUsuario + ' le envió un mensaje por el servicio: ' + socket.contrato.servicio.titulo,
            link: '/contrato/mensajes/' + socket.contrato._id,
            fechaHora: new Date(),
            leida: false,
            icono: "mensaje",
            idUsuario: socket.contrato.servicio.idUsuario
          });
        }
        if (mensaje && notificacion) {
          await mensaje.save();
          notificacion.save();

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
