import { axiosInstance } from "@/api/axiosInstance";

const testAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

export const deleteDashBoard = async (dashboardId: string | string[] | undefined) => {
  const res = await axiosInstance.delete(`dashboards/${dashboardId}`, {
    headers: { Authorization: `Bearer ${testAccessToken}` },
  });

  if (res.status > 400) {
    console.log(res.data);
    throw new Error("Failed delete.");
  }
};

export const deleteMembers = async (membersId: number) => {
  const res = await axiosInstance.delete(`/members/${membersId}`, {
    headers: { Authorization: `Bearer ${testAccessToken}` },
  });
};

export const deleteInvitations = async (dashboardId: string | string[] | undefined, invitationsId: number) => {
  const res = await axiosInstance.delete(`dashboards/${dashboardId}/invitations/${invitationsId}`, {
    headers: { Authorization: `Bearer ${testAccessToken}` },
  });
};
