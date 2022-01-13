import { useEffect, useState } from 'react';
import { useDataContext } from '@context/DataContext';
import axios from './axios';
import { AxiosResponse } from 'axios';

export const useLoadData = <T>(url: string) => {
  const [startReload, setStartReload] = useState(true);
  const [data, setData] = useState<T>();
  const { setIsLoading, setError } = useDataContext();

  const loadData = async () => {
    console.log('reload');
    const result = await axios.get(url).then((result: AxiosResponse): T => result.data);
    setData(result);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [data, setIsLoading]);

  useEffect(() => {
    if (startReload) {
      setIsLoading(true);
      setError(undefined);
      setStartReload(false);
      loadData();
    }
  }, [startReload]);

  return {
    data,
    reload: setStartReload,
  };
};
