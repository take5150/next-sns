import React, {ReactNode, createContext, useContext} from "react";

interface AuthProviderProps {
  children: ReactNode
}

interface AuthCOntextType {
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthCOntextType>({
  login: () => {},
  logout: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token)
  };

  const logout = () => {
    localStorage.removeItem("auth_token")
  }

  const value = {
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};