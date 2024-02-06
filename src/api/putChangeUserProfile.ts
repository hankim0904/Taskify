import { axiosInstance } from "./axiosInstance";
import NiceModal from "@ebay/nice-modal-react";
import PasswordChangeModal from "@/components/commons/Modals/PasswordChangeModal/PasswordChangeModal";

export default async function putChangeUserProfile(nickname: string, profileImageUrl: string | null) {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

  const confirmReloadingModal = (text: string) => {
    NiceModal.show(PasswordChangeModal, { text });
  };

  try {
    const res = await axiosInstance.put(
      "users/me",
      {
        nickname: nickname,
        profileImageUrl: profileImageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (res.status === 200) {
      confirmReloadingModal("변경이 완료되었습니다.");
    }
  } catch (e) {
    console.log(e);
  }
}
