import { axiosCSRInstance } from "./axiosCSRInstance";

<<<<<<< HEAD
export default async function getUsersMe(accessToken: string) {
=======
export default async function getUsersMe(accessToken: string | null) {
>>>>>>> 31cb24977735484b0cede8ee41eeae8585bb1514
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
