import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetInventionsQuery as useGetInventionsQueryFnc } from './graphql';

export const useGetInventionsQuery = () => {
  const { data, loading, error } = useGetInventionsQueryFnc();
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
