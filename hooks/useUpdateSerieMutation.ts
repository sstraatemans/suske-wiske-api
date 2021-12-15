import { useDataContext } from '@context/DataContext';
import { useUpdateSerieMutation as useUpdateSerieMutationFnc } from './graphql';

export const useUpdateSerieMutation = () => {
  const [updateSerie, { called, loading }] = useUpdateSerieMutationFnc();
  const { setError } = useDataContext();

  return {
    updateSerie,
    called,
    isLoading: loading,
    setError,
  };
};
