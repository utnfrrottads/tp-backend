const { UserInputError } = require('apollo-server-express');

const User = require('../../models/User');
const Nutritionist = require('../../models/Nutritionist');
const AttentionRequest = require('../../models/AttentionRequest');
const Patient = require('../../models/Patient');

module.exports = {
  Mutation: {
    async createAttentionRequest(_, { userId, nutritionistId }) {
      const user = await User.findById(userId);
      if(!user) {
        throw new UserInputError('User not found.')
      }

      const patient = await Patient.findById(userId);
      if(patient) {
        throw new UserInputError('The user already is a patient.')
      }

      const nutritionist = await Nutritionist.findById(nutritionistId);
      if(!nutritionist) {
        throw new UserInputError('Nutritionist not found.')
      }

      const newAttentionRequest = new AttentionRequest({
        nutritionistId,
        userId,
        state: 'Pending',
        createdAt: new Date().toISOString(),
      })

      const res = await newAttentionRequest.save();
      return {
        ...res._doc,
        id: res._id,
      }
    }
  }
}
