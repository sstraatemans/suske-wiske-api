import { useEffect } from 'react';
import { useDataContext } from '@context/DataContext';
import { useGetSeriesQuery as useGetSeriesQueryFnc } from './graphql';

export const useGetSeriesQuery = () => {
  const { data, loading, error } = useGetSeriesQueryFnc();
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
