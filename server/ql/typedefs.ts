import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    albums: [Album]
    album(id: String!): Album
    characters: [Character]
    character(id: String!): Character
    inventions: [Invention]
    invention(id: String!): Invention
    artists: [Artist]
    artist(id: String!): Artist
    series: [Serie]
    serie(id: String!): Serie
  }

  type Mutation {
    updateAlbum(input: UpdateAlbumInput): Album
    updateSerie(input: UpdateSerieInput): Serie
    updateArtist(input: UpdateArtistInput): Artist
    updateInvention(input: UpdateInventionInput): Invention
    updateCharacter(input: UpdateCharacterInput): Character
  }

  type Album {
    id: String!
    name: String!
    images: [String]!
    characters: [String]!
  }

  input UpdateAlbumInput {
    id: String
    name: String
    images: [String]
  }

  input UpdateSerieInput {
    id: String
    name: String
  }

  input UpdateArtistInput {
    id: String
    name: String
    images: [String]
  }

  input UpdateInventionInput {
    id: String
    name: String
    images: [String]
  }

  input UpdateCharacterInput {
    id: String
    name: String
    images: [String]
  }

  type Character {
    id: String!
    name: String!
    images: [String]
    albums: [String]!
  }

  type Invention {
    id: String!
    name: String!
    images: [String]
    albums: [String]!
  }

  type Artist {
    id: String!
    name: String!
    images: [String]
    albums: [String]!
  }

  type Serie {
    id: String!
    name: String!
    albums: [String]!
  }
`;
