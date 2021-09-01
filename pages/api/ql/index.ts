import { gql, ApolloServer } from 'apollo-server-micro';
import microCors from 'micro-cors';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { NextApiRequest, NextApiResponse } from 'next';
import { Album } from '@ts/album';
import { getAll } from '@server/data/getAll';

const typeDefs = gql`
  type Album {
    id: ID
    name: String
  }

  type Query {
    albums: [Album]
  }
`;

const resolvers = {
  Query: {
    albums: async () => {
      return await getAll<Album>('albums');
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
