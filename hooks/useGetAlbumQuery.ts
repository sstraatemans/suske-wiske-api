import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetAlbumQuery as useGetAlbumQueryFnc } from './graphql';

export const useGetAlbumQuery = (id: string) => {
  const { data, loading, error } = useGetAlbumQueryFnc({ variables: { id } });
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
