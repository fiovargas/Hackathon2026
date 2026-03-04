/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { auth } from '../services/auth';

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
  isLoading: true,
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On component mount, check if the user is already authenticated
    const checkAuth = async () => {
      try {
        const userData = await auth.getUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (data) => {
    try {
      await auth.login(data);
      const userData = await auth.getUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await auth.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Refresca el usuario en el contexto tras actualizaciones de perfil
  const refreshUser = useCallback(async () => {
    const userData = await auth.getUser();
    setUser(userData);
  }, []);

  const values = useMemo(
    () => ({ user, login, logout, refreshUser, isLoading, isAuthenticated }),
    [user, login, logout, refreshUser, isLoading, isAuthenticated],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
