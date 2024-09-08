import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setIsLoggedIn(true);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setIsLoggedIn(true);
      setUsername(decodedToken.username);
    } catch (error) {
      console.error("Error decoding token", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
