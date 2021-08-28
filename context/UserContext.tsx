import { createContext, useContext, FC, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import '@client/auth';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

const userContext = createContext(null);

// custom hook to use the authUserContext and access authUser and loading
export const useUser = () => useContext(userContext);

export const UserProvider: FC = ({ children }) => {
  const signIn = async () => {
    var provider = new GoogleAuthProvider();
    const auth = getAuth();

    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  // listen for Firebase state change
  useEffect(() => {}, []);

  return <userContext.Provider value={{ signIn }}>{children}</userContext.Provider>;
};
