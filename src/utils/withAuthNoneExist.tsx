import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuthNoneExist = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (!accessToken) {
        router.push("signin");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuthNoneExist;
