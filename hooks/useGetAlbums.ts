import { useQuery, gql } from '@apollo/client';
import { Album } from '@ts/album';

const QUERY = gql`
  query {
    albums {
      id
      name
    }
  }
`;

interface AlbumsData {
  albums: any;
}

export const useGetAlbums = (): AlbumsData => {
  return useQuery<AlbumsData>(QUERY);
};
