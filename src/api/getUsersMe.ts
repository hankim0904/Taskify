import { axiosInstance } from "./axiosInstance";

export default async function getUsersMe() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODA2LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDcwNjczMDcsImlzcyI6InNwLXRhc2tpZnkifQ.BPGtVVENzyAKB4-7gXGR7d1WVbDacD22BERhSIbGzj0";

  try {
    const res = await axiosInstance.get("users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}
