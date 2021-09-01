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

const cors = microCors({ allowMethods: ['GET', 'PUT', 'POST'] });
const handler: any = async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer;
  const handle = await server.createHandler({
    path: '/api/ql',
  })(req, res);

  return handle;
};

export default cors(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
