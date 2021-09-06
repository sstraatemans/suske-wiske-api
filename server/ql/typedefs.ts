import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Album {
    id: String!
    name: String!
  }

  type Query {
    albums: [Album]
    album(id: String!): Album
  }

  input UpdateAlbumInput {
    id: String
    name: String
  }
  type Mutation {
    updateAlbum(input: UpdateAlbumInput): Album
  }
`;
