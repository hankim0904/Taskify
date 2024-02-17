import { axiosCSRInstance } from "@/api/axiosCSRInstance";
import { axiosSSRInstance } from "./axiosSSRInstance";
import { FormValuesDrag } from "@/components/domains/dashboardid/api/type";

export const postCardData = async (data: unknown) => {
  const res = await axiosCSRInstance.post(`cards`, data);
  return res;
};

export const putCardData = async (cardId: number | undefined, data: unknown) => {
  console.log(cardId);
  const res = await axiosCSRInstance.put(`cards/${cardId}`, data);
  console.log(res);
  return res;
};

export const putCardDataDrag = async (data: FormValuesDrag) => {
  const cardId = data.cardId;
  delete data.cardId;
  const res = await axiosCSRInstance.put(`cards/${cardId}`, data);
  return res;
};

export const postUploadCardImg = async (
  accessToken: string | null,
  columnId: number | undefined,
  formData: unknown
) => {
  try {
    const res = await axiosSSRInstance.post(`columns/${columnId}/card-image`, formData, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${accessToken}` },
    });
    return await res;
  } catch (error) {
    console.log(error);
  }
};
