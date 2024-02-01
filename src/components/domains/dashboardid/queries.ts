import { axiosInstance } from "@/api/axiosInstance";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzE0LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2OTg1NTQsImlzcyI6InNwLXRhc2tpZnkifQ.oEoe6s1NCVsFlTn1Gara6-eMRIE-zGcfBwQl7SFlEe4";

export const getColumnList = async (dashboardId: string | string[] | undefined) => {
  const response = await axiosInstance.get("columns", {
    params: { dashboardId: dashboardId },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const getCardList = async (columnId: number) => {
  const response = await axiosInstance.get(`cards`, {
    params: { size: 10, columnId: columnId },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};
