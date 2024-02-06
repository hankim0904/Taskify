import { axiosCSRInstance } from "./axiosCSRInstance";

export default async function getUsersMe(accessToken) {
  try {
    const res = await axiosCSRInstance.get("users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}
