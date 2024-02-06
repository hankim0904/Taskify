import { axiosInstance } from "@/api/axiosInstance";
import { axiosInterceptor } from "@/api/axiosInterceptor";
import { ChangedName, NewColumn } from "./type";

export const getColumnList = async (dashboardId: string | string[] | undefined, accessToken?: string | undefined) => {
  let response;

  if (accessToken) {
    response = await axiosInstance.get("columns", {
      params: { dashboardId: dashboardId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } else {
    response = await axiosInterceptor.get("columns", {
      params: { dashboardId: dashboardId },
    });
  }

  return response.data;
};

export const getCardList = async (cursorId: null | number, columnId: number) => {
  const response = await axiosInterceptor.get("cards", {
    params: { size: 5, cursorId: cursorId, columnId: columnId },
  });

  return response.data;
};

export const deleteColumn = async (columnId: number | undefined) => {
  const response = await axiosInterceptor.delete(`columns/${columnId}`);

  return response.status;
};

export const putColumnName = async (columnId: number | undefined, changedName: ChangedName) => {
  const response = await axiosInterceptor.put(`columns/${columnId}`, changedName);

  return response.data;
};

export const postColumn = async (newColumn: NewColumn) => {
  const response = await axiosInterceptor.post("columns", newColumn);

  return response.data;
};

export const getCardDetail = async (cardId: number) => {
  const response = await axiosInterceptor.get(`cards/${cardId}`);

  return response.data;
};
