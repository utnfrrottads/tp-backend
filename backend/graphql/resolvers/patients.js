const { UserInputError } = require('apollo-server-express');

const User = require('../../models/User');
const Nutritionist = require('../../models/Nutritionist');
const Patient = require('../../models/Patient');

module.exports = {
  Mutation: {
    async createPatient(_, { userId, nutritionistId }) {
      const user = await User.findById(userId);
      if(!user) {
        throw new UserInputError('User not found.')
      }

      const patient = await Patient.findOne({ username: user.username });
      if(patient) {
        throw new UserInputError('The patient already exists.')
      }

      const nutritionist = await Nutritionist.findById(nutritionistId)
      if(!nutritionist){
        throw new UserInputError('Nutritionist not found')
      }

      // si no hubo ningun error, se crea el nuevo paciente y se guarda en la bd
      const newPatient = new Patient({
        name: user.name,
        username: user.username,
        password: user.password,
        email: user.email,
        birthDate: user.birthDate,
        createdAt: new Date().toISOString(),
        nutritionistId: nutritionistId,
      })

      const res = await newPatient.save();
      return {
        ...res._doc,
        id: res._id,
        nutritionist
      }
    },
  }
}
