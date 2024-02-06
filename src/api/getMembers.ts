import { axiosCSRInstance } from "./axiosCSRInstance";

export default async function getMembers(accessToken: string, dashboardId: string | string[] | undefined) {
  const res = await axiosCSRInstance.get(`members`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { dashboardId: dashboardId },
  });

  return res.data;
}
