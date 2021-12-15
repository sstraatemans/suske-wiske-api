import { useDataContext } from '@context/DataContext';
import { useUpdateArtistMutation as useUpdateArtistMutationFnc } from './graphql';

export const useUpdateArtistMutation = () => {
  const [updateArtist, { called, loading }] = useUpdateArtistMutationFnc();
  const { setError } = useDataContext();

  return {
    updateArtist,
    called,
    isLoading: loading,
    setError,
  };
};
