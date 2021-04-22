const { ApolloServer, PubSub } = require('apollo-server-express');
const mongoose = require('mongoose');
const app = require('express')();

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { MONGODB, ATLASDB } = require('./config.js');
const pubsub = new PubSub();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

server.applyMiddleware({ app });

// Use MONGODB for local database
// Use ATLASDB for db on the cloud
mongoose
  .connect(ATLASDB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return app.listen({ port: 3000 });
  })
  .then(() => {
    console.log(`Server running at port 3000`);
  })
  .catch(err => {
    console.error(err)
  })
