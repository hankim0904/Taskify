import { axiosCSRInstance } from "./axiosCSRInstance";

export default async function getMembers(accessToken: string | null, dashboardId: string | string[] | undefined) {
  try {
    if (dashboardId !== undefined) {
      const res = await axiosCSRInstance.get(`members`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { dashboardId: dashboardId },
      });

      return res.data;
    }
  } catch (e) {
    throw new Error(`${e}`);
  }
}
