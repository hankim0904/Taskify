import { axiosSSRInstance } from "@/api/axiosSSRInstance";
import { axiosCSRInstance } from "@/api/axiosCSRInstance";
import { ChangedName, NewColumn } from "./type";

export const getColumnList = async (dashboardId: string | string[] | undefined, accessToken?: string | undefined) => {
  const response = accessToken
    ? await axiosSSRInstance.get("columns", {
        params: { dashboardId: dashboardId },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    : await axiosCSRInstance.get("columns", {
        params: { dashboardId: dashboardId },
      });

  return response.data;
};

export const getCardList = async (cursorId: null | number, columnId: number) => {
  const response = await axiosCSRInstance.get("cards", {
    params: { size: 5, cursorId: cursorId, columnId: columnId },
  });

  return response.data;
};

export const deleteColumn = async (columnId: number | undefined) => {
  const response = await axiosCSRInstance.delete(`columns/${columnId}`);

  return response.status;
};

export const putColumnName = async (columnId: number | undefined, changedName: ChangedName) => {
  const response = await axiosCSRInstance.put(`columns/${columnId}`, changedName);

  return response.data;
};

export const postColumn = async (newColumn: NewColumn) => {
  const response = await axiosCSRInstance.post("columns", newColumn);

  return response.data;
};

export const getCardDetail = async (cardId: number) => {
  const response = await axiosCSRInstance.get(`cards/${cardId}`);

  return response.data;
};
