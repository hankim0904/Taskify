import { axiosInstance } from "./axiosInstance";

export default async function postReceivedDashboardInvitation(isAccepted: boolean, path?: number) {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY4NTMxMDMsImlzcyI6InNwLXRhc2tpZnkifQ.zD8I9TQVFAoPoN06us4vfBwiMf6RTofNlWxyTdEKZGQ";

  try {
    const res = await axiosInstance.put(
      `invitations/${path}`,
      {
        inviteAccepted: isAccepted,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}
