import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import path from 'path';
import db from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(
	fileLoader(path.join(__dirname, './resolvers'))
);

const server = new ApolloServer({
	typeDefs: gql(typeDefs),
	resolvers,
	context: { db },
});

// Express middleware
const app = express();
server.applyMiddleware({ app });

db.sequelize.sync().then(() => {
	app.listen({ port: 4000 }, () => {
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
		);
	});
});
