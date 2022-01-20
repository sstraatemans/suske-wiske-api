import { useEffect, useState } from 'react';
import { useDataContext } from '@context/DataContext';
import axios from './axios';
import { AxiosResponse } from 'axios';
import { useAuthUser } from '@context/UserContext';

export const useMutateData = <T extends { id: string }>(url: string, id?: string) => {
  const [mutateResult, setMutateResult] = useState<T>();
  const { setIsLoading } = useDataContext();
  const { getTokenId, user } = useAuthUser();

  const mutateData = async (body: T | undefined) => {
    if (body) {
      const token = await getTokenId();
      setIsLoading(true);
      let res: AxiosResponse;
      if (!body.id) {
        const { id, ...newBody } = body as any;
        res = await axios.post(
          url,
          { ...newBody },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMutateResult({ ...res.data });
        return;
      }
      res = await axios.put(
        `${url}/${body.id}`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      setMutateResult({ ...data });
    }
  };

  useEffect(() => {
    if (mutateResult) {
      setIsLoading(false);
    }
  }, [mutateResult, setIsLoading]);

  return {
    mutateData,
    mutateResult,
  };
};
