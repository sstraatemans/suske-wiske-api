import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetSerieQuery as useGetSerieQueryFnc } from './graphql';

export const useGetSerieQuery = (id: string) => {
  const { data, loading, error } = useGetSerieQueryFnc({ variables: { id } });
  const { setIsLoading, setError } = useDataContext();

  console.log({ data, loading, error });
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
