import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const withAuthNoneExist = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { accessToken } = useAuth();

    useEffect(() => {
      if (!accessToken) {
        router.push("signin");
      }
    }, [accessToken]);

    return <WrappedComponent />;
  };

  return AuthenticatedComponent;
};

export default withAuthNoneExist;
