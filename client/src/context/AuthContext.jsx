import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  const handleAuthSuccess = (data) => {
    const userData = data.data.user;
    const tokenData = data.data.token;

    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  const login = async (formData) => {
    setLoading(true);
    try {
      const data = await loginUser(formData);
      handleAuthSuccess(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const data = await registerUser(formData);
      handleAuthSuccess(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
