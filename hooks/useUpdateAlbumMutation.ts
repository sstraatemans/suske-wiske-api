import { useDataContext } from '@context/DataContext';
import { useUpdateAlbumMutation as useUpdateAlbumMutationFnc } from './graphql';

export const useUpdateAlbumMutation = () => {
  const [updateAlbum, { called, loading }] = useUpdateAlbumMutationFnc();
  const { setError } = useDataContext();

  return {
    updateAlbum,
    called,
    isLoading: loading,
    setError,
  };
};
