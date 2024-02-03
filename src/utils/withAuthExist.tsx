import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { axiosInstance } from "@/api/axiosInstance";

const withAuthExist = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { accessToken } = useAuth();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (accessToken) {
            const response = await axiosInstance.get("dashboards?navigationMethod=infiniteScroll", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            const firstDashboardId = response.data.dashboards[0]?.id;
            if (firstDashboardId) {
              router.push(`dashboard/${firstDashboardId}`);
            } else {
              router.push("mydashboard");
            }
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

export default withAuthExist;
