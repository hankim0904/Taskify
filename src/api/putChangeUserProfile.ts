import { axiosSSRInstance } from "./axiosSSRInstance";
import NiceModal from "@ebay/nice-modal-react";
import PasswordChangeModal from "@/components/commons/Modals/PasswordChangeModal/PasswordChangeModal";

export default async function putChangeUserProfile(
  nickname: string,
  profileImageUrl: string | null,
  accessToken: string
) {
  const confirmReloadingModal = (text: string) => {
    NiceModal.show(PasswordChangeModal, { text });
  };

  try {
    const res = await axiosSSRInstance.put(
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
      }
    );
    if (res.status === 200) {
      confirmReloadingModal("변경이 완료되었습니다.");
    }
  } catch (e) {
    throw new Error(`${e}`);
  }
}
