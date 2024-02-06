import { axiosSSRInstance } from "./axiosSSRInstance";

export default async function getReceivedDashboardInvitations(cursorId: number | null, accessToken: string | null) {
  try {
    const res = await axiosSSRInstance.get(`invitations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        size: 5,
        cursorId: cursorId,
      },
    });

    return res.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}
