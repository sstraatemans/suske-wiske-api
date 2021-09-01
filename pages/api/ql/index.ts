import { gql, ApolloServer } from 'apollo-server-micro';
import microCors from 'micro-cors';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { NextApiRequest, NextApiResponse } from 'next';

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

const cors = microCors();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer;
  return await server.createHandler({
    path: '/api/ql',
  })(req, res);
};

export default cors(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
