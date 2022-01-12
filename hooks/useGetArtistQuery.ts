import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetArtistQuery as useGetArtistQueryFnc } from './graphql';

export const useGetArtistQuery = (id: string) => {
  const { data, loading, error } = useGetArtistQueryFnc({ variables: { id } });
  const { setIsLoading, setError } = useDataContext();

  useEffect(() => {
    setIsLoading(loading);
    setError(error);
  }, [loading, error, setIsLoading, setError]);

  return {
    data,
    loading,
    error,
  };
};
