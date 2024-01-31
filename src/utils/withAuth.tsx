import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = () => {
    const router = useRouter();
    const { accessToken } = useAuth();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (!accessToken) {
            router.push("signIn");
          }
        } catch (error) {
          console.log(error);
        }
      };

      checkAuth();
    }, [accessToken]);

    return <WrappedComponent />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
