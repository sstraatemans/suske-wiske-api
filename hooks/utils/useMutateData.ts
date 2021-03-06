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

        const result = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/v1${url}`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }).then((res) => res.json());

        setMutateResult({ ...result });
        return result;
      }

      const result = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/v1${url}/${body.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      }).then((res) => res.json());

      setMutateResult({ ...result });
      return result;
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
