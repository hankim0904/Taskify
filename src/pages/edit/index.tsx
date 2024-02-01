import styles from "./edit.module.scss";
import classNames from "classnames/bind";
import DashboradEditTitleBox from "@/components/domains/edit/article/DashboradEditTitleBox";
import DashboradEditMemberBox from "@/components/domains/edit/article/DashboradEditMemberBox";
import Image from "next/image";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import ModalLayout from "@/components/commons/Modals/ModalLayout";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useAuth } from "@/contexts/AuthContext";
import { axiosInstance } from "@/api/axiosInstance";
import { useParams } from "next/navigation";

const cx = classNames.bind(styles);

interface DashBoradData {
  id: number;
  title: string;
  color: string;
  createdAt: number;
  updatedAt: number;
  createdByMe: true;
  userId: number;
}

export default function Edit() {
  const { accessToken } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [myDashBoard, setMyDashBoard] = useState<DashBoradData>();
  const [invitedMemberList, setInvitedMembersList] = useState();
  const router = useRouter();
  const parms = useParams();

  console.log(parms);

  async function getMyDashBoard(id: number) {
    try {
      const res = await axiosInstance.get(`/dashboards/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY`,
        },
      });
      const dashBoradData = res.data;
      console.log(dashBoradData);
      setMyDashBoard(dashBoradData);
    } catch (error) {
      console.error("대시보드를 가져오는 중 에러 발생:", error);
    }
  }

  async function getInvitedMember(id?: number) {
    const res = await axiosInstance.get(`dashboards/2713/invitations?page=1&size=20`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY`,
      },
    });
    const invitedMembers = res.data.invitations.map((invitation: any) => invitation.invitee);

    setInvitedMembersList(invitedMembers);
  }

  function gobackButton() {
    router.back();
  }

  const showModal = () => {
    NiceModal.show(ModalLayout, { modalType: "editTask" });
  };

  useEffect(() => {
    getMyDashBoard(2713);
    getInvitedMember();
  }, []);

  return (
    <BaseContainer currentPath="test">
      <main className={cx("main", { openModal: isOpenModal })}>
        <button type="button" onClick={gobackButton} className={cx("backforward")}>
          <Image src="/assets/icons/ic-arrow-forward.svg" width={20} height={20} alt="뒤로가기" />
          돌아가기
        </button>
        <DashboradEditTitleBox selectedColor={myDashBoard?.color}>{myDashBoard?.title}</DashboradEditTitleBox>
        <DashboradEditMemberBox isMemberEdit={true} title="구성원"></DashboradEditMemberBox>
        <DashboradEditMemberBox
          showModal={showModal}
          isMemberEdit={false}
          memberList={invitedMemberList}
          title="초대 내역"
        ></DashboradEditMemberBox>
        <ResponseBtn state="delete" ph={2} fs={1.8}>
          대시보드 삭제하기
        </ResponseBtn>
      </main>
    </BaseContainer>
  );
}
