import { axiosSSRInstance } from "@/api/axiosSSRInstance";
import { axiosCSRInstance } from "@/api/axiosCSRInstance";

export const getDashBoardTittle = async (
  dashboardId?: string | string[] | undefined,
  accessToken?: string | undefined
) => {
  const res = accessToken
    ? await axiosSSRInstance.get(`dashboards/${dashboardId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    : await axiosCSRInstance.get(`dashboards/${dashboardId}`);

  return await res.data;
};

export const getDashBoardMembers = async (
  dashboardId: string | string[] | undefined,
  page = 1,
  accessToken?: string | undefined
) => {
  const res = accessToken
    ? await axiosSSRInstance.get("members", {
        params: { page, size: 5, dashboardId: dashboardId },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    : await axiosCSRInstance.get("members", {
        params: { page, size: 5, dashboardId: dashboardId },
      });

  return await res.data;
};

export const getDashboardInvitations = async (
  dashboardId: string | string[] | undefined,
  page = 1,
  accessToken?: string | undefined
) => {
  const res = accessToken
    ? await axiosSSRInstance.get(`dashboards/${dashboardId}/invitations`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { page, size: 5 },
      })
    : await axiosCSRInstance.get(`dashboards/${dashboardId}/invitations`, {
        params: { page, size: 5 },
      });

  return res.data;
};

export const getDashBoardTittleQueryKey = (dashboardId: string | string[] | undefined) => ["dashboards", dashboardId];
export const getDashBoardMembersQueryKey = (dashboardId: string | string[] | undefined, page: number) => [
  "members",
  dashboardId,
  page,
];
export const getDashboardInvitationsQueryKey = (dashboardId: string | string[] | undefined, page: number) => [
  "invitations",
  dashboardId,
  page,
];
