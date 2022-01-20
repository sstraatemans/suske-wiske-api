import { useEffect, useState } from 'react';
import { useDataContext } from '@context/DataContext';
import axios from './axios';
import { AxiosResponse } from 'axios';
import { useAuthUser } from '@context/UserContext';

export const useLoadData = <T>(url: string) => {
  const [startReload, setStartReload] = useState(true);
  const [data, setData] = useState<T>();
  const { setIsLoading, setError } = useDataContext();
  const { getTokenId, user } = useAuthUser();

  const getHeaders = async () => {
    const token = await getTokenId();
    console.log(token);
    if (!token) return;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const loadData = async () => {
    const headers = await getHeaders();

    const result = await axios.get(url, headers).then((result: AxiosResponse): T => result.data);
    setData(result);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [data, setIsLoading]);

  useEffect(() => {
    if (startReload && user) {
      setIsLoading(true);
      setError(undefined);
      setStartReload(false);
      loadData();
    }
  }, [startReload, user]);

  return {
    data,
    reload: setStartReload,
  };
};
