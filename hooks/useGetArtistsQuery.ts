import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetArtistsQuery as useGetArtistsQueryFnc } from './graphql';

export const useGetArtistsQuery = () => {
  const { data, loading, error } = useGetArtistsQueryFnc();
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
