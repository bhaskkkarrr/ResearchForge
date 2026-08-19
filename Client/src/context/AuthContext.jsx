import { signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../utils/auth.util.js";
import { axiosInstance } from "../utils/axiosInstance.js";
import axios from "axios";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async () => {
    try {
      setIsAuthLoading(true);
      const res = await signInWithPopup(auth, provider);
      const session = await axiosInstance.post("/api/auth/create-session", {
        email: res.user.email,
        username: res.user.displayName,
        profileURL: res.user.photoURL,
      });
      console.log("Session", session.data);
      setUser(session.data.user);
      setToken(session.data.token);
    } catch (error) {
      console.error(error);
      setAuthError(error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const getUser = async () => {
    try {
      setIsAuthLoading(true);
      const res = await axiosInstance.get("/api/auth/get-access-token");
      setUser(res.data.user);
      setToken(res.data.token);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    try {
      setIsAuthLoading(true);
      const res = await axiosInstance.get("/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.log(error);
      setAuthError(error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, user, token, isAuthLoading, authError, getUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
