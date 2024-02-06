import { axiosCSRInstance } from "@/api/axiosCSRInstance";

export async function putDashBoard(
  dashboardId: string | string[] | undefined,
  putData: { title: string; color: string }
) {
  await axiosCSRInstance.put(`dashboards/${dashboardId}`, putData);
}
