import { createContext, useContext, FC, useEffect, useState } from 'react';
import 'firebase/auth';
import '@client/auth';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  User,
} from 'firebase/auth';

type UserContextProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const userContext = createContext<UserContextProps>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

// custom hook to use the authUserContext and access authUser and loading
export const useAuthUser = () => useContext(userContext);

export const UserProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
  }, []);

  const signIn = async (): Promise<void> => {
    var provider = new GoogleAuthProvider();
    const auth = getAuth();

    await setPersistence(auth, browserLocalPersistence);
    await signInWithPopup(auth, provider);
  };

  const signOut = async (): Promise<void> => {
    const auth = getAuth();
    await auth.signOut();
  };

  // listen for Firebase state change
  useEffect(() => {}, []);

  return (
    <userContext.Provider value={{ signIn, signOut, isLoggedIn, isLoading, user }}>
      {children}
    </userContext.Provider>
  );
};
