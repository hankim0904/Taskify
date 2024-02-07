import { axiosSSRInstance } from "@/api/axiosSSRInstance";
import { axiosCSRInstance } from "@/api/axiosCSRInstance";
import { ChangedName, NewColumn, EditedComments, NewComments } from "./type";

export const getColumnList = async (
  dashboardId: string | string[] | undefined,
  accessToken?: string | undefined | null
) => {
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

export const deleteCard = async (cardId: number | undefined) => {
  const response = await axiosCSRInstance.delete(`cards/${cardId}`);

  return response.status;
};

export const getComments = async (cursorId: null | number, cardId: number) => {
  const response = await axiosCSRInstance.get("comments", {
    params: { size: 3, cursorId: cursorId, cardId: cardId },
  });

  return response.data;
};

export const putComments = async (editedComments: EditedComments) => {
  const response = await axiosCSRInstance.put(`comments/${editedComments.commentId}`, {
    content: editedComments.content,
  });

  return response.data;
};

export const postComments = async (newComments: NewComments) => {
  const response = await axiosCSRInstance.post("comments", newComments);

  return response.data;
};

export const delelteComments = async (commentId: number) => {
  const response = await axiosCSRInstance.delete(`comments/${commentId}`);

  return response.data;
};

export const getMe = async () => {
  const response = await axiosCSRInstance.get("users/me");

  return response.data;
};
