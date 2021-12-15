import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetCharactersQuery as useGetCharactersQueryFnc } from './graphql';

export const useGetCharactersQuery = () => {
  const { data, loading, error } = useGetCharactersQueryFnc();
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
