import { axiosInstance } from "./axiosInstance";

export default async function putChangeUserProfile(nickname: string, profileImageUrl: string) {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

  try {
    const res = await axiosInstance.put(
      "users/me",
      {
        nickname: nickname,
        profileImageUrl: profileImageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
