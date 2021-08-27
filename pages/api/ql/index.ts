import { gql, ApolloServer } from 'apollo-server-micro';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';

const typeDefs = gql`
  type User {
    id: ID
  }

  type Query {
    getUser: User
  }
`;

const resolvers = {
  Query: {
    getUser: () => {
      return {
        id: 'Foso',
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

const startServer = server.start();

export default async function handler(req, res) {
  await startServer;
  return await server.createHandler({
    path: '/api/ql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
