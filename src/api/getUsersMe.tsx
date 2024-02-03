import { resolveSoa } from "dns";
import { axiosInstance } from "./axiosInstance";

export default async function getUsersMe() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzkyLCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY4NTI4OTgsImlzcyI6InNwLXRhc2tpZnkifQ.T-nZJzh7UKvzXXZARLI4W1Nq8CB-491fx-N16fUWW-g";

  try {
    const res = await axiosInstance.get("users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res);

    return res.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}
