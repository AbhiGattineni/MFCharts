import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../config/firebase";
import { Loading } from "../components";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
  const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const changePassword = (newPassword) => {
    return updatePassword(user, newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        signInWithGoogle,
        signInWithFacebook,
        changePassword,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
