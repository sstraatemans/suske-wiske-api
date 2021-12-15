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
  characters: Array<Maybe<Scalars['String']>>;
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String'];
  name: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  albums?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Character = {
  __typename?: 'Character';
  id: Scalars['String'];
  name: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  albums?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Invention = {
  __typename?: 'Invention';
  id: Scalars['String'];
  name: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  albums?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateAlbum?: Maybe<Album>;
  updateSerie?: Maybe<Serie>;
  updateArtist?: Maybe<Artist>;
  updateInvention?: Maybe<Invention>;
  updateCharacter?: Maybe<Character>;
};


export type MutationUpdateAlbumArgs = {
  input?: Maybe<UpdateAlbumInput>;
};


export type MutationUpdateSerieArgs = {
  input?: Maybe<UpdateSerieInput>;
};


export type MutationUpdateArtistArgs = {
  input?: Maybe<UpdateArtistInput>;
};


export type MutationUpdateInventionArgs = {
  input?: Maybe<UpdateInventionInput>;
};


export type MutationUpdateCharacterArgs = {
  input?: Maybe<UpdateCharacterInput>;
};

export type Query = {
  __typename?: 'Query';
  albums?: Maybe<Array<Maybe<Album>>>;
  album?: Maybe<Album>;
  characters?: Maybe<Array<Maybe<Character>>>;
  character?: Maybe<Character>;
  inventions?: Maybe<Array<Maybe<Invention>>>;
  invention?: Maybe<Invention>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  artist?: Maybe<Artist>;
  series?: Maybe<Array<Maybe<Serie>>>;
  serie?: Maybe<Serie>;
};


export type QueryAlbumArgs = {
  id: Scalars['String'];
};


export type QueryCharacterArgs = {
  id: Scalars['String'];
};


export type QueryInventionArgs = {
  id: Scalars['String'];
};


export type QueryArtistArgs = {
  id: Scalars['String'];
};


export type QuerySerieArgs = {
  id: Scalars['String'];
};

export type Serie = {
  __typename?: 'Serie';
  id: Scalars['String'];
  name: Scalars['String'];
  albums?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateAlbumInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateArtistInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  albums?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateCharacterInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  albums?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateInventionInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  albums?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateSerieInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GetAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlbumsQuery = { __typename?: 'Query', albums?: Maybe<Array<Maybe<{ __typename?: 'Album', id: string, name: string, images: Array<Maybe<string>> }>>> };

export type GetAlbumQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAlbumQuery = { __typename?: 'Query', album?: Maybe<{ __typename?: 'Album', id: string, name: string, images: Array<Maybe<string>>, characters: Array<Maybe<string>> }> };

export type GetCharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCharactersQuery = { __typename?: 'Query', characters?: Maybe<Array<Maybe<{ __typename?: 'Character', id: string, name: string }>>> };

export type GetCharacterQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCharacterQuery = { __typename?: 'Query', character?: Maybe<{ __typename?: 'Character', id: string, name: string, images?: Maybe<Array<Maybe<string>>>, albums?: Maybe<Array<Maybe<string>>> }> };

export type GetInventionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInventionsQuery = { __typename?: 'Query', inventions?: Maybe<Array<Maybe<{ __typename?: 'Invention', id: string, name: string }>>> };

export type GetInventionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetInventionQuery = { __typename?: 'Query', invention?: Maybe<{ __typename?: 'Invention', id: string, name: string, images?: Maybe<Array<Maybe<string>>>, albums?: Maybe<Array<Maybe<string>>> }> };

export type GetSeriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSeriesQuery = { __typename?: 'Query', series?: Maybe<Array<Maybe<{ __typename?: 'Serie', id: string, name: string }>>> };

export type GetSerieQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSerieQuery = { __typename?: 'Query', serie?: Maybe<{ __typename?: 'Serie', id: string, name: string, albums?: Maybe<Array<Maybe<string>>> }> };

export type GetArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArtistsQuery = { __typename?: 'Query', artists?: Maybe<Array<Maybe<{ __typename?: 'Artist', id: string, name: string }>>> };

export type GetArtistQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetArtistQuery = { __typename?: 'Query', artist?: Maybe<{ __typename?: 'Artist', id: string, name: string, images?: Maybe<Array<Maybe<string>>>, albums?: Maybe<Array<Maybe<string>>> }> };

export type UpdateAlbumMutationVariables = Exact<{
  input?: Maybe<UpdateAlbumInput>;
}>;


export type UpdateAlbumMutation = { __typename?: 'Mutation', updateAlbum?: Maybe<{ __typename?: 'Album', id: string, name: string, images: Array<Maybe<string>> }> };

export type UpdateSerieMutationVariables = Exact<{
  input?: Maybe<UpdateSerieInput>;
}>;


export type UpdateSerieMutation = { __typename?: 'Mutation', updateSerie?: Maybe<{ __typename?: 'Serie', id: string, name: string }> };

export type UpdateArtistMutationVariables = Exact<{
  input?: Maybe<UpdateArtistInput>;
}>;


export type UpdateArtistMutation = { __typename?: 'Mutation', updateArtist?: Maybe<{ __typename?: 'Artist', id: string, name: string, images?: Maybe<Array<Maybe<string>>> }> };

export type UpdateInventionMutationVariables = Exact<{
  input?: Maybe<UpdateInventionInput>;
}>;


export type UpdateInventionMutation = { __typename?: 'Mutation', updateInvention?: Maybe<{ __typename?: 'Invention', id: string, name: string, images?: Maybe<Array<Maybe<string>>>, albums?: Maybe<Array<Maybe<string>>> }> };

export type UpdateCharacterMutationVariables = Exact<{
  input?: Maybe<UpdateCharacterInput>;
}>;


export type UpdateCharacterMutation = { __typename?: 'Mutation', updateCharacter?: Maybe<{ __typename?: 'Character', id: string, name: string, images?: Maybe<Array<Maybe<string>>> }> };


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
    characters
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
export const GetCharacterDocument = gql`
    query getCharacter($id: String!) {
  character(id: $id) {
    id
    name
    images
    albums
  }
}
    `;

/**
 * __useGetCharacterQuery__
 *
 * To run a query within a React component, call `useGetCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharacterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCharacterQuery(baseOptions: Apollo.QueryHookOptions<GetCharacterQuery, GetCharacterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCharacterQuery, GetCharacterQueryVariables>(GetCharacterDocument, options);
      }
export function useGetCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCharacterQuery, GetCharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCharacterQuery, GetCharacterQueryVariables>(GetCharacterDocument, options);
        }
export type GetCharacterQueryHookResult = ReturnType<typeof useGetCharacterQuery>;
export type GetCharacterLazyQueryHookResult = ReturnType<typeof useGetCharacterLazyQuery>;
export type GetCharacterQueryResult = Apollo.QueryResult<GetCharacterQuery, GetCharacterQueryVariables>;
export function refetchGetCharacterQuery(variables?: GetCharacterQueryVariables) {
      return { query: GetCharacterDocument, variables: variables }
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
export const GetInventionDocument = gql`
    query getInvention($id: String!) {
  invention(id: $id) {
    id
    name
    images
    albums
  }
}
    `;

/**
 * __useGetInventionQuery__
 *
 * To run a query within a React component, call `useGetInventionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInventionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInventionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInventionQuery(baseOptions: Apollo.QueryHookOptions<GetInventionQuery, GetInventionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInventionQuery, GetInventionQueryVariables>(GetInventionDocument, options);
      }
export function useGetInventionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInventionQuery, GetInventionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInventionQuery, GetInventionQueryVariables>(GetInventionDocument, options);
        }
export type GetInventionQueryHookResult = ReturnType<typeof useGetInventionQuery>;
export type GetInventionLazyQueryHookResult = ReturnType<typeof useGetInventionLazyQuery>;
export type GetInventionQueryResult = Apollo.QueryResult<GetInventionQuery, GetInventionQueryVariables>;
export function refetchGetInventionQuery(variables?: GetInventionQueryVariables) {
      return { query: GetInventionDocument, variables: variables }
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
export const GetSerieDocument = gql`
    query getSerie($id: String!) {
  serie(id: $id) {
    id
    name
    albums
  }
}
    `;

/**
 * __useGetSerieQuery__
 *
 * To run a query within a React component, call `useGetSerieQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSerieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSerieQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSerieQuery(baseOptions: Apollo.QueryHookOptions<GetSerieQuery, GetSerieQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSerieQuery, GetSerieQueryVariables>(GetSerieDocument, options);
      }
export function useGetSerieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSerieQuery, GetSerieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSerieQuery, GetSerieQueryVariables>(GetSerieDocument, options);
        }
export type GetSerieQueryHookResult = ReturnType<typeof useGetSerieQuery>;
export type GetSerieLazyQueryHookResult = ReturnType<typeof useGetSerieLazyQuery>;
export type GetSerieQueryResult = Apollo.QueryResult<GetSerieQuery, GetSerieQueryVariables>;
export function refetchGetSerieQuery(variables?: GetSerieQueryVariables) {
      return { query: GetSerieDocument, variables: variables }
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
export const GetArtistDocument = gql`
    query getArtist($id: String!) {
  artist(id: $id) {
    id
    name
    images
    albums
  }
}
    `;

/**
 * __useGetArtistQuery__
 *
 * To run a query within a React component, call `useGetArtistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArtistQuery(baseOptions: Apollo.QueryHookOptions<GetArtistQuery, GetArtistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArtistQuery, GetArtistQueryVariables>(GetArtistDocument, options);
      }
export function useGetArtistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArtistQuery, GetArtistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArtistQuery, GetArtistQueryVariables>(GetArtistDocument, options);
        }
export type GetArtistQueryHookResult = ReturnType<typeof useGetArtistQuery>;
export type GetArtistLazyQueryHookResult = ReturnType<typeof useGetArtistLazyQuery>;
export type GetArtistQueryResult = Apollo.QueryResult<GetArtistQuery, GetArtistQueryVariables>;
export function refetchGetArtistQuery(variables?: GetArtistQueryVariables) {
      return { query: GetArtistDocument, variables: variables }
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
export const UpdateSerieDocument = gql`
    mutation updateSerie($input: UpdateSerieInput) {
  updateSerie(input: $input) {
    id
    name
  }
}
    `;
export type UpdateSerieMutationFn = Apollo.MutationFunction<UpdateSerieMutation, UpdateSerieMutationVariables>;

/**
 * __useUpdateSerieMutation__
 *
 * To run a mutation, you first call `useUpdateSerieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSerieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSerieMutation, { data, loading, error }] = useUpdateSerieMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSerieMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSerieMutation, UpdateSerieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSerieMutation, UpdateSerieMutationVariables>(UpdateSerieDocument, options);
      }
export type UpdateSerieMutationHookResult = ReturnType<typeof useUpdateSerieMutation>;
export type UpdateSerieMutationResult = Apollo.MutationResult<UpdateSerieMutation>;
export type UpdateSerieMutationOptions = Apollo.BaseMutationOptions<UpdateSerieMutation, UpdateSerieMutationVariables>;
export const UpdateArtistDocument = gql`
    mutation updateArtist($input: UpdateArtistInput) {
  updateArtist(input: $input) {
    id
    name
    images
  }
}
    `;
export type UpdateArtistMutationFn = Apollo.MutationFunction<UpdateArtistMutation, UpdateArtistMutationVariables>;

/**
 * __useUpdateArtistMutation__
 *
 * To run a mutation, you first call `useUpdateArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArtistMutation, { data, loading, error }] = useUpdateArtistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArtistMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArtistMutation, UpdateArtistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArtistMutation, UpdateArtistMutationVariables>(UpdateArtistDocument, options);
      }
export type UpdateArtistMutationHookResult = ReturnType<typeof useUpdateArtistMutation>;
export type UpdateArtistMutationResult = Apollo.MutationResult<UpdateArtistMutation>;
export type UpdateArtistMutationOptions = Apollo.BaseMutationOptions<UpdateArtistMutation, UpdateArtistMutationVariables>;
export const UpdateInventionDocument = gql`
    mutation updateInvention($input: UpdateInventionInput) {
  updateInvention(input: $input) {
    id
    name
    images
    albums
  }
}
    `;
export type UpdateInventionMutationFn = Apollo.MutationFunction<UpdateInventionMutation, UpdateInventionMutationVariables>;

/**
 * __useUpdateInventionMutation__
 *
 * To run a mutation, you first call `useUpdateInventionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInventionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInventionMutation, { data, loading, error }] = useUpdateInventionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInventionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInventionMutation, UpdateInventionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInventionMutation, UpdateInventionMutationVariables>(UpdateInventionDocument, options);
      }
export type UpdateInventionMutationHookResult = ReturnType<typeof useUpdateInventionMutation>;
export type UpdateInventionMutationResult = Apollo.MutationResult<UpdateInventionMutation>;
export type UpdateInventionMutationOptions = Apollo.BaseMutationOptions<UpdateInventionMutation, UpdateInventionMutationVariables>;
export const UpdateCharacterDocument = gql`
    mutation updateCharacter($input: UpdateCharacterInput) {
  updateCharacter(input: $input) {
    id
    name
    images
  }
}
    `;
export type UpdateCharacterMutationFn = Apollo.MutationFunction<UpdateCharacterMutation, UpdateCharacterMutationVariables>;

/**
 * __useUpdateCharacterMutation__
 *
 * To run a mutation, you first call `useUpdateCharacterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCharacterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCharacterMutation, { data, loading, error }] = useUpdateCharacterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCharacterMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCharacterMutation, UpdateCharacterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCharacterMutation, UpdateCharacterMutationVariables>(UpdateCharacterDocument, options);
      }
export type UpdateCharacterMutationHookResult = ReturnType<typeof useUpdateCharacterMutation>;
export type UpdateCharacterMutationResult = Apollo.MutationResult<UpdateCharacterMutation>;
export type UpdateCharacterMutationOptions = Apollo.BaseMutationOptions<UpdateCharacterMutation, UpdateCharacterMutationVariables>;