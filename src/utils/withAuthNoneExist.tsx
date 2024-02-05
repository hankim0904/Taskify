import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const withAuthNoneExist = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const { accessToken } = useAuth();

    useEffect(() => {
      if (!accessToken) {
        router.push("signin");
      }
    }, [accessToken]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuthNoneExist;
