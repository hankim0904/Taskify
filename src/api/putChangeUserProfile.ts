import { axiosInstance } from "./axiosInstance";

export default async function putChangeUserProfile(nickname: string, profileImageUrl: string) {
  console.log(nickname, profileImageUrl);
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

  const formData = new FormData();
  formData.append("nickname", nickname);
  formData.append("profileImageUrl", profileImageUrl);
  console.log(formData);
  try {
    const res = await axiosInstance.put(`users/me`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
