import { axiosCSRInstance } from "./axiosCSRInstance";

export default async function postReceivedDashboardInvitation(isAccepted: boolean, path?: number) {
  try {
    const res = await axiosCSRInstance.put(`invitations/${path}`, {
      inviteAccepted: isAccepted,
    });

    return res.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}
