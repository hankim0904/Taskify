import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface AuthContextProps {
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = useCallback((token: string) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  }, []);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  return <AuthContext.Provider value={{ accessToken, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  //undefined일 경우를 위한 에러 처리
  if (!context) {
    throw new Error("함수형 컴포넌트 내에서만 사용해야 합니다");
  }
  return context;
};

export { AuthProvider, useAuth };
