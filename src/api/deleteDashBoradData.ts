import { axiosCSRInstance } from "@/api/axiosCSRInstance";

export const deleteDashBoard = async (dashboardId: string | string[] | undefined) => {
  const res = await axiosCSRInstance.delete(`dashboards/${dashboardId}`);

  if (res.status > 400) {
    console.log(res.data);
    throw new Error("Failed delete.");
  }
};

export const deleteMembers = async (membersId: number) => {
  const res = await axiosCSRInstance.delete(`/members/${membersId}`);

  if (res.status > 400) {
    console.log(res.data);
    throw new Error("Failed delete.");
  }
};

export const deleteInvitations = async (dashboardId: string | string[] | undefined, invitationsId: number) => {
  const res = await axiosCSRInstance.delete(`dashboards/${dashboardId}/invitations/${invitationsId}`);

  if (res.status > 400) {
    console.log(res.data);
    throw new Error("Failed delete.");
  }
};
