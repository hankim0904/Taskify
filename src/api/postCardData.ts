import { axiosCSRInstance } from "@/api/axiosCSRInstance";
import { axiosSSRInstance } from "./axiosSSRInstance";

export const postCardData = async (data: unknown) => {
  const res = await axiosCSRInstance.post(`cards`, data);
  return res;
};

export const putCardData = async (cardId: number, data: unknown) => {
  const res = await axiosCSRInstance.put(`card/${cardId}`, data);
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
