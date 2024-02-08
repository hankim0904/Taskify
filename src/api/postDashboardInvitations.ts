import axios from "axios";
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
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.message);
    }
  }
}
