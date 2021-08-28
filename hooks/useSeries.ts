import { useQuery, gql } from '@apollo/client';

const QUERY = gql`
  query {
    getUser {
      id
    }
  }
`;

export const useSeries = () => {
  return useQuery(QUERY);
};
