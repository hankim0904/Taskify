import { axiosInstance } from "@/api/axiosInstance";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzkyLCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY4NTI4OTgsImlzcyI6InNwLXRhc2tpZnkifQ.T-nZJzh7UKvzXXZARLI4W1Nq8CB-491fx-N16fUWW-g";

export const getColumnList = async (dashboardId: string | string[] | undefined) => {
  const response = await axiosInstance.get("columns", {
    params: { dashboardId: dashboardId },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const getCardList = async (cursorId: null | number, columnId: number) => {
  const response = await axiosInstance.get("cards", {
    params: { size: 5, cursorId: cursorId, columnId: columnId },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const deleteColumn = async (columnId: number) => {
  const response = await axiosInstance.delete(`columns/${columnId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.status;
};

export const putColumnName = async (columnId: number, changedName) => {
  const response = await axiosInstance.put(`columns/${columnId}`, changedName, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const postColumn = async newColumn => {
  const response = await axiosInstance.post("columns", newColumn, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};
