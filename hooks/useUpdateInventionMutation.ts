import { useDataContext } from '@context/DataContext';
import { useUpdateInventionMutation as useUpdateInventionMutationFnc } from './graphql';

export const useUpdateInventionMutation = () => {
  const [updateInvention, { called, loading }] = useUpdateInventionMutationFnc();
  const { setError } = useDataContext();

  return {
    updateInvention,
    called,
    isLoading: loading,
    setError,
  };
};
