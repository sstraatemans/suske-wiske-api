import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetCharacterQuery as useGetCharacterQueryFnc } from './graphql';

export const useGetCharacterQuery = (id: string) => {
  const { data, loading, error } = useGetCharacterQueryFnc({ variables: { id } });
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
