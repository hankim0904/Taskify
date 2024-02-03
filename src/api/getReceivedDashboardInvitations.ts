import { axiosInstance } from "./axiosInstance";

export default async function getReceivedDashboardInvitations() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

  try {
    const res = await axiosInstance.get(`invitations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        size: 10,
      },
    });

    return res.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}
