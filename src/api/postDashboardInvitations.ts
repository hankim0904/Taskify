import { axiosInstance } from "./axiosInstance";

export default async function postDashboardInvitations(dashboardId: string | string[] | undefined, email: string) {
  console.log(dashboardId, email);
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";
  try {
    const res = await axiosInstance.post(
      `dashboards/${dashboardId}/invitations`,
      { email: email },
      {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        params: { dashboardId: dashboardId },
      },
    );
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
}
