const { UserInputError } = require('apollo-server-express');

const User = require('../../models/User');
const Nutritionist = require('../../models/Nutritionist');
const Patient = require('../../models/Patient');

module.exports = {
  Mutation: {
    async createNutritionist(_, { userId }) {
      const user = await User.findById(userId);
      if(!user) {
        throw new UserInputError('User not found.')
      }

      const patient = await Patient.findOne({ username: user.username });
      if(patient) {
        throw new UserInputError(`${user.username} is already registered as a patient.`)
      }

      const nutritionist = await Nutritionist.findOne({ username: user.username })
      if(nutritionist){
        throw new UserInputError(`A nutritionist with username ${user.username} already exists.`)
      }

      const newNutritionist = new Nutritionist({
        username: user.username,
        name: user.name,
        password: user.password,
        email: user.password,
        birthDate: user.birthDate,
        createdAt: new Date().toISOString(),
        patients: [],
        attentionRequests: [],
      })
      const res = await newNutritionist.save();
      console.log(' guardado!!')
      return {
        ...res._doc,
        id: res._id,
      }
    },
  }
}
