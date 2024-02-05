import { axiosInstance } from "@/api/axiosInstance";

const testAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

export const getDashBoardTittle = async (dashboardId?: string | string[] | undefined) => {
  const res = await axiosInstance.get(`dashboards/${dashboardId}`, {
    headers: { Authorization: `Bearer ${testAccessToken}` },
  });

  return await res.data;
};

export const getDashBoardMembers = async (dashboardId: string | string[] | undefined, page = 1, size = 4) => {
  const res = await axiosInstance.get("members", {
    params: { page, size, dashboardId: dashboardId },
    headers: { Authorization: `Bearer ${testAccessToken}` },
  });

  return await res.data;
};

export const getDashboardInvitations = async (dashboardId: string | string[] | undefined, page = 1, size = 5) => {
  const res = await axiosInstance.get(`dashboards/${dashboardId}/invitations`, {
    headers: { Authorization: `Bearer ${testAccessToken}` },
    params: { page, size },
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
