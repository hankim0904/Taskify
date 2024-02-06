import { axiosCSRInstance } from "./axiosCSRInstance";
import PasswordChangeModal from "@/components/commons/Modals/PasswordChangeModal/PasswordChangeModal";
import SignModal from "@/components/commons/Modals/SignModal/SignModal";
import NiceModal from "@ebay/nice-modal-react";

export default async function putChangePassword(accessToken: string | null, password: string, newPassword: string) {
  const confirmReloadingModal = (text: string) => {
    NiceModal.show(PasswordChangeModal, { text });
  };

  const showModal = (text: string) => {
    NiceModal.show(SignModal, { text });
  };

  try {
    const res = await axiosCSRInstance.put(
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
      }
    );

    if (res.status === 204) {
      confirmReloadingModal("변경이 완료되었습니다.");
    }
  } catch (error) {
    showModal(error.response.data.message);
  }
}
