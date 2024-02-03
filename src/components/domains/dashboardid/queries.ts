import { axiosInstance } from "@/api/axiosInstance";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

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
