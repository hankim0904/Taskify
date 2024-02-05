import { axiosInstance } from "./axiosInstance";

export default async function putChangePassword(password: string, newPassword: string) {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODA2LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDcwNjczMDcsImlzcyI6InNwLXRhc2tpZnkifQ.BPGtVVENzyAKB4-7gXGR7d1WVbDacD22BERhSIbGzj0";

  try {
    const res = await axiosInstance.put(
      "auth/password",
      {
        password: password,
        newPassword: newPassword,
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
  } catch (error) {
    const errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}
