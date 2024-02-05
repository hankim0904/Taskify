import { axiosInstance } from "@/api/axiosInstance";
import { ChangedName, NewColumn } from "./type";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzE0LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2OTg1NTQsImlzcyI6InNwLXRhc2tpZnkifQ.oEoe6s1NCVsFlTn1Gara6-eMRIE-zGcfBwQl7SFlEe4";

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

export const deleteColumn = async (columnId: number | undefined) => {
  const response = await axiosInstance.delete(`columns/${columnId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.status;
};

export const putColumnName = async (columnId: number | undefined, changedName: ChangedName) => {
  const response = await axiosInstance.put(`columns/${columnId}`, changedName, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const postColumn = async (newColumn: NewColumn) => {
  const response = await axiosInstance.post("columns", newColumn, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const getCardDetail = async (cardId: number) => {
  const response = await axiosInstance.get(`cards/${cardId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};
