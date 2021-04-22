const foodResolvers = require('./food');
const categoryResolvers = require('./categories')
const usersResolvers = require('./users');
const postsResolvers = require('./posts');
const commentsResolvers = require('./comments');
const nutritionistsResolvers = require('./nutritionists');
const patientResolvers = require('./patients');
const attentionRequestsResolvers = require('./attention_requests');

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  Query: {
    ...foodResolvers.Query,
    ...categoryResolvers.Query,
    ...postsResolvers.Query,
    ...commentsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...nutritionistsResolvers.Mutation,
    ...patientResolvers.Mutation,
    ...attentionRequestsResolvers.Mutation,
  },
  RequestStates: {
    PENDING: "Pending",
    ACCEPTED: "Accepted",  // estos son los estados posibles de la solicitud de atención
    REJECTED: "Rejected"
  },
  Subscription: {
    ...postsResolvers.Subscription
  },
}
