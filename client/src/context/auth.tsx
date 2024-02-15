import React, { ReactNode, createContext, useContext, useEffect } from "react";
import apiClient from "../lib/apiClient";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthCOntextType {
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthCOntextType>({
  login: () => {},
  logout: () => {},
});

// カスタムフック
export const useAuth = () => {
  return useContext(AuthContext);
};

// ReduxのProviderのような感じでコンポーネントを囲ってあげる
export const AuthProvider = ({ children }: AuthProviderProps) => {
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    console.log(token);
    apiClient.defaults.headers["Authrorization"] = `Bearer ${token}`;
  }, []);
  const login = async (token: string) => {
    // NOTE ローカルストレージにトークンを保存しないほうがいいらしい
    localStorage.setItem("auth_token", token);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
  };

  const value = {
    login,
    logout,
  };
  // childrenには各コンポーネントが入る
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
