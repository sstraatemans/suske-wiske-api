import { useEffect, useState } from 'react';
import { useDataContext } from '@context/DataContext';
import axios from './axios';
import { AxiosResponse } from 'axios';

export const useMutateData = <T>(url: string) => {
  const [result, setResult] = useState(false);
  const { setIsLoading } = useDataContext();

  const mutateData = async (body: T | undefined) => {
    if (body) {
      setIsLoading(true);
      await axios.put(url, { ...body });
      setResult(true);
    }
  };

  useEffect(() => {
    if (result) {
      setIsLoading(false);
      setResult(false);
    }
  }, [result]);

  return {
    mutateData,
  };
};
