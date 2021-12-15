import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['String'];
  name: Scalars['String'];
  images: Array<Maybe<Scalars['String']>>;
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Character = {
  __typename?: 'Character';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Invention = {
  __typename?: 'Invention';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateAlbum?: Maybe<Album>;
};


export type MutationUpdateAlbumArgs = {
  input?: Maybe<UpdateAlbumInput>;
};

export type Query = {
  __typename?: 'Query';
  albums?: Maybe<Array<Maybe<Album>>>;
  album?: Maybe<Album>;
  characters?: Maybe<Array<Maybe<Character>>>;
  inventions?: Maybe<Array<Maybe<Invention>>>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  series?: Maybe<Array<Maybe<Serie>>>;
};


export type QueryAlbumArgs = {
  id: Scalars['String'];
};

export type Serie = {
  __typename?: 'Serie';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateAlbumInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GetAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlbumsQuery = { __typename?: 'Query', albums?: Maybe<Array<Maybe<{ __typename?: 'Album', id: string, name: string, images: Array<Maybe<string>> }>>> };

export type GetAlbumQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAlbumQuery = { __typename?: 'Query', album?: Maybe<{ __typename?: 'Album', id: string, name: string, images: Array<Maybe<string>> }> };

export type UpdateAlbumMutationVariables = Exact<{
  input?: Maybe<UpdateAlbumInput>;
}>;


export type UpdateAlbumMutation = { __typename?: 'Mutation', updateAlbum?: Maybe<{ __typename?: 'Album', id: string, name: string, images: Array<Maybe<string>> }> };

export type GetCharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCharactersQuery = { __typename?: 'Query', characters?: Maybe<Array<Maybe<{ __typename?: 'Character', id: string, name: string }>>> };

export type GetInventionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInventionsQuery = { __typename?: 'Query', inventions?: Maybe<Array<Maybe<{ __typename?: 'Invention', id: string, name: string }>>> };

export type GetSeriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSeriesQuery = { __typename?: 'Query', series?: Maybe<Array<Maybe<{ __typename?: 'Serie', id: string, name: string }>>> };

export type GetArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArtistsQuery = { __typename?: 'Query', artists?: Maybe<Array<Maybe<{ __typename?: 'Artist', id: string, name: string }>>> };


export const GetAlbumsDocument = gql`
    query getAlbums {
  albums {
    id
    name
    images
  }
}
    `;

/**
 * __useGetAlbumsQuery__
 *
 * To run a query within a React component, call `useGetAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument, options);
      }
export function useGetAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument, options);
        }
export type GetAlbumsQueryHookResult = ReturnType<typeof useGetAlbumsQuery>;
export type GetAlbumsLazyQueryHookResult = ReturnType<typeof useGetAlbumsLazyQuery>;
export type GetAlbumsQueryResult = Apollo.QueryResult<GetAlbumsQuery, GetAlbumsQueryVariables>;
export function refetchGetAlbumsQuery(variables?: GetAlbumsQueryVariables) {
      return { query: GetAlbumsDocument, variables: variables }
    }
export const GetAlbumDocument = gql`
    query getAlbum($id: String!) {
  album(id: $id) {
    id
    name
    images
  }
}
    `;

/**
 * __useGetAlbumQuery__
 *
 * To run a query within a React component, call `useGetAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumQuery(baseOptions: Apollo.QueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbumDocument, options);
      }
export function useGetAlbumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbumDocument, options);
        }
export type GetAlbumQueryHookResult = ReturnType<typeof useGetAlbumQuery>;
export type GetAlbumLazyQueryHookResult = ReturnType<typeof useGetAlbumLazyQuery>;
export type GetAlbumQueryResult = Apollo.QueryResult<GetAlbumQuery, GetAlbumQueryVariables>;
export function refetchGetAlbumQuery(variables?: GetAlbumQueryVariables) {
      return { query: GetAlbumDocument, variables: variables }
    }
export const UpdateAlbumDocument = gql`
    mutation updateAlbum($input: UpdateAlbumInput) {
  updateAlbum(input: $input) {
    id
    name
    images
  }
}
    `;
export type UpdateAlbumMutationFn = Apollo.MutationFunction<UpdateAlbumMutation, UpdateAlbumMutationVariables>;

/**
 * __useUpdateAlbumMutation__
 *
 * To run a mutation, you first call `useUpdateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAlbumMutation, { data, loading, error }] = useUpdateAlbumMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAlbumMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAlbumMutation, UpdateAlbumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAlbumMutation, UpdateAlbumMutationVariables>(UpdateAlbumDocument, options);
      }
export type UpdateAlbumMutationHookResult = ReturnType<typeof useUpdateAlbumMutation>;
export type UpdateAlbumMutationResult = Apollo.MutationResult<UpdateAlbumMutation>;
export type UpdateAlbumMutationOptions = Apollo.BaseMutationOptions<UpdateAlbumMutation, UpdateAlbumMutationVariables>;
export const GetCharactersDocument = gql`
    query getCharacters {
  characters {
    id
    name
  }
}
    `;

/**
 * __useGetCharactersQuery__
 *
 * To run a query within a React component, call `useGetCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharactersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCharactersQuery(baseOptions?: Apollo.QueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, options);
      }
export function useGetCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, options);
        }
export type GetCharactersQueryHookResult = ReturnType<typeof useGetCharactersQuery>;
export type GetCharactersLazyQueryHookResult = ReturnType<typeof useGetCharactersLazyQuery>;
export type GetCharactersQueryResult = Apollo.QueryResult<GetCharactersQuery, GetCharactersQueryVariables>;
export function refetchGetCharactersQuery(variables?: GetCharactersQueryVariables) {
      return { query: GetCharactersDocument, variables: variables }
    }
export const GetInventionsDocument = gql`
    query getInventions {
  inventions {
    id
    name
  }
}
    `;

/**
 * __useGetInventionsQuery__
 *
 * To run a query within a React component, call `useGetInventionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInventionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInventionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInventionsQuery(baseOptions?: Apollo.QueryHookOptions<GetInventionsQuery, GetInventionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInventionsQuery, GetInventionsQueryVariables>(GetInventionsDocument, options);
      }
export function useGetInventionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInventionsQuery, GetInventionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInventionsQuery, GetInventionsQueryVariables>(GetInventionsDocument, options);
        }
export type GetInventionsQueryHookResult = ReturnType<typeof useGetInventionsQuery>;
export type GetInventionsLazyQueryHookResult = ReturnType<typeof useGetInventionsLazyQuery>;
export type GetInventionsQueryResult = Apollo.QueryResult<GetInventionsQuery, GetInventionsQueryVariables>;
export function refetchGetInventionsQuery(variables?: GetInventionsQueryVariables) {
      return { query: GetInventionsDocument, variables: variables }
    }
export const GetSeriesDocument = gql`
    query getSeries {
  series {
    id
    name
  }
}
    `;

/**
 * __useGetSeriesQuery__
 *
 * To run a query within a React component, call `useGetSeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSeriesQuery(baseOptions?: Apollo.QueryHookOptions<GetSeriesQuery, GetSeriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeriesQuery, GetSeriesQueryVariables>(GetSeriesDocument, options);
      }
export function useGetSeriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeriesQuery, GetSeriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeriesQuery, GetSeriesQueryVariables>(GetSeriesDocument, options);
        }
export type GetSeriesQueryHookResult = ReturnType<typeof useGetSeriesQuery>;
export type GetSeriesLazyQueryHookResult = ReturnType<typeof useGetSeriesLazyQuery>;
export type GetSeriesQueryResult = Apollo.QueryResult<GetSeriesQuery, GetSeriesQueryVariables>;
export function refetchGetSeriesQuery(variables?: GetSeriesQueryVariables) {
      return { query: GetSeriesDocument, variables: variables }
    }
export const GetArtistsDocument = gql`
    query getArtists {
  artists {
    id
    name
  }
}
    `;

/**
 * __useGetArtistsQuery__
 *
 * To run a query within a React component, call `useGetArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetArtistsQuery(baseOptions?: Apollo.QueryHookOptions<GetArtistsQuery, GetArtistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArtistsQuery, GetArtistsQueryVariables>(GetArtistsDocument, options);
      }
export function useGetArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArtistsQuery, GetArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArtistsQuery, GetArtistsQueryVariables>(GetArtistsDocument, options);
        }
export type GetArtistsQueryHookResult = ReturnType<typeof useGetArtistsQuery>;
export type GetArtistsLazyQueryHookResult = ReturnType<typeof useGetArtistsLazyQuery>;
export type GetArtistsQueryResult = Apollo.QueryResult<GetArtistsQuery, GetArtistsQueryVariables>;
export function refetchGetArtistsQuery(variables?: GetArtistsQueryVariables) {
      return { query: GetArtistsDocument, variables: variables }
    }