const { Usuario } = require('../models/index');
const { createJwtToken } = require('../helpers/auth');
const { encryptPassword, matchPassword } = require('../helpers/encryptPassword');

module.exports = {
  signUp: async function({ signUpInput }) {
    const { nombreUsuario, clave, nombreApellido, email, habilidades } = signUpInput;
    const claveEncriptada = await encryptPassword(clave)
    const user = new Usuario({
      nombreUsuario,
      nombreApellido,
      email,
      habilidades,
      claveEncriptada
    })
    const savedUser = await user.save();
    const token = createJwtToken(usuario);
    return {
      ...savedUser._doc,
      id: savedUser._id.toString(),
      token
    }
  },

  signIn: async function({ signInInput }) {
    const { nombreUsuario, password } = signInInput;
    const user = await Usuario.findOne({ nombreUsuario })

    if(!user){
      throw new Error('Credenciales incorrectas');
    } else {
      const validPass = await matchPassword(password, user.clave || '');
      if (!validPass){
        throw new Error('Credenciales incorrectas');
      } else {
        const token = createJwtToken(user);
        return {
          ...user._doc,
          id: user._id.toString(),
          token
        }
      }
    }
  }
}
