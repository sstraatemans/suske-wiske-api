import { useDataContext } from '@context/DataContext';
import { useUpdateCharacterMutation as useUpdateCharacterMutationFnc } from './graphql';

export const useUpdateCharacterMutation = () => {
  const [updateCharacter, { called, loading }] = useUpdateCharacterMutationFnc();
  const { setError } = useDataContext();

  return {
    updateCharacter,
    called,
    isLoading: loading,
    setError,
  };
};
