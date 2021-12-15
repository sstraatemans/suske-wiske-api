import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetInventionQuery as useGetInventionQueryFnc } from './graphql';

export const useGetInventionQuery = (id: string) => {
  const { data, loading, error } = useGetInventionQueryFnc({ variables: { id } });
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
