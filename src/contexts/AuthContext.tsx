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
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    document.cookie = `accessToken=${token}; expires=${expirationDate.toUTCString()}; path=/;`;

    setAccessToken(token);
  }, []);

  const logout = useCallback(() => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setAccessToken(null);
  }, []);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    setAccessToken(cookieValue || null);
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
