import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    albums: [Album]
    album(id: String!): Album
    characters: [Character]
    inventions: [Invention]
    artists: [Artist]
    series: [Serie]
  }

  type Album {
    id: String!
    name: String!
    images: [String]!
  }

  input UpdateAlbumInput {
    id: String
    name: String
    images: [String]
  }
  type Mutation {
    updateAlbum(input: UpdateAlbumInput): Album
  }

  type Character {
    id: String!
    name: String!
  }

  type Invention {
    id: String!
    name: String!
  }

  type Artist {
    id: String!
    name: String!
  }

  type Serie {
    id: String!
    name: String!
  }
`;
