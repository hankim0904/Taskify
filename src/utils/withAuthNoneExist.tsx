import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const withAuthNoneExist = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { accessToken } = useAuth();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (!accessToken) {
            router.push("signin");
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

export default withAuthNoneExist;
