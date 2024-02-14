import axios from "axios";
import { axiosCSRInstance } from "./axiosCSRInstance";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ToastModal from "@/components/commons/Modals/ToastModal/ToastModal";

export default async function postDashboardInvitations(
  dashboardId: string | string[] | undefined,
  email: string,
  accessToken: string | null,
) {
  const showModal = (text: string, type: string) => {
    NiceModal.show(ToastModal, { text, type });

    setTimeout(() => {
      NiceModal.remove(ToastModal);
    }, 2000);
  };

  try {
    const res = await axiosCSRInstance.post(
      `dashboards/${dashboardId}/invitations`,
      { email: email },
      {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        params: { dashboardId: dashboardId },
      },
    );
    showModal("초대가 완료되었습니다.", "success");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showModal(`${error.response.data.message}` || `${error.message}`, "fail");
      throw new Error(`${error}`);
    }
  }
}
