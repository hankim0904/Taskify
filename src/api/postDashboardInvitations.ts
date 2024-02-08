import { axiosCSRInstance } from "./axiosCSRInstance";

export default async function postDashboardInvitations(
  dashboardId: string | string[] | undefined,
  email: string,
  accessToken: string | null,
) {
  try {
    const res = await axiosCSRInstance.post(
      `dashboards/${dashboardId}/invitations`,
      { email: email },
      {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        params: { dashboardId: dashboardId },
      },
    );
    console.log(res.data);
  } catch (error) {
    alert(error.response.data.message);
  }
}
