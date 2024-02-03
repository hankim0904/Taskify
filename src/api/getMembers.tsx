import { axiosInstance } from "./axiosInstance";

export default async function getMembers(dashboardId: string | string[] | undefined) {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

  const res = await axiosInstance.get(`members`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { dashboardId: dashboardId },
  });

  return res.data;
}
