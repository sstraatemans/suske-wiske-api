import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetAlbumsQuery as useGetAlbumsQueryFnc } from './graphql';

export const useGetAlbumsQuery = () => {
  const { data, loading, error } = useGetAlbumsQueryFnc();
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
