import { useQuery, gql } from '@apollo/client';

const QUERY = gql`
  query {
    series {
      id
      name
    }
  }
`;

export const useGetSeries = () => {
  return useQuery(QUERY);
};
