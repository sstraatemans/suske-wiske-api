import {
  createContext,
  useContext,
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import 'firebase/auth';
import '@client/auth';
import { ApolloError } from '@apollo/client';

type DataContextProps = {
  error?: ApolloError;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setError: (value?: ApolloError) => void;
};

const dataContext = createContext<DataContextProps>({
  isLoading: false,
  setIsLoading: (value: boolean) => {},
  setError: (value?: ApolloError) => {},
});

export const useDataContext = () => useContext(dataContext);

export const DataProvider: FC<DataContextProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApolloError>();

  const handleSetIsLoading = (value: boolean) => setIsLoading(value);
  const handleSetError = (value?: ApolloError) => setError(value);

  return (
    <dataContext.Provider
      value={{ isLoading, error, setIsLoading: handleSetIsLoading, setError: handleSetError }}
    >
      {children}
    </dataContext.Provider>
  );
};
