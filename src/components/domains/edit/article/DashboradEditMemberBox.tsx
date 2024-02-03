import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import styles from "./DashboradEditMemberBox.module.scss";
import classNames from "classnames/bind";
import PageChangeButton from "@/components/commons/Buttons/PageChangeButton";
import Image from "next/image";
import { useModal } from "@ebay/nice-modal-react";
//import InviteModal from "@/components/commons/Modals/InviteModal/InviteModal";
import TaskModal from "@/components/commons/Modals/TaskModals/TaskModal";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDashBoardMembers, getDashboardInvitations } from "./getEditData";
import { useState } from "react";
import ColumnModal from "@/components/commons/Modals/ColumnModals/ColumnModal";

const cx = classNames.bind(styles);

interface Props {
  title: string;
  isMemberEdit: boolean;
}

//초대 취소시 유저 아이디 필요

export default function DashboradEditMemberBox({ title, isMemberEdit }: Props) {
  const modal = useModal(TaskModal, { isEdit: false });
  const [invitationPage, setInvitationPage] = useState(1);
  const [memberPage, setMemberPage] = useState(1);
  const [page, setPage] = useState(1);

  const parms = useParams();
  const dashboardId = parms.dashboardid;

  const { data: invitationsData } = useQuery({
    queryKey: ["invitations", dashboardId, invitationPage],
    queryFn: () => getDashboardInvitations(dashboardId, invitationPage),
  });

  const { data: memberData } = useQuery({
    queryKey: ["members", dashboardId, memberPage],
    queryFn: () => getDashBoardMembers(dashboardId, memberPage),
  });

  console.log(memberData);
  const memebers = memberData?.members;

  const invitedMembers = invitationsData?.invitations.map((invitation: any) => invitation.invitee);

  const memberList = isMemberEdit ? memebers : invitedMembers;
  //const page = isMemberEdit ? memberPage : invitationPage;

  function handleBackwardPageClick() {}
  return (
    <section className={cx("dashborad-edit-box", { email: !isMemberEdit })}>
      <article className={cx("title-line")}>
        <h2 className={cx("title")}>{title}</h2>
        <div className={cx("title-right-contents")}>
          <p>1 페이지 중 {page}</p>
          <PageChangeButton
            isForward={false}
            disabled={page === 1}
            onClick={handleBackwardPageClick}
          ></PageChangeButton>
          <PageChangeButton isForward={true} onClick={() => setMemberPage((old) => old + 1)}></PageChangeButton>

          {!isMemberEdit && (
            <div className={cx("invite-btn")}>
              <ResponseBtn onClick={modal.show} state="accept" ph={0.7} fs={1.2}>
                <Image src="/assets/icons/ic-plus-box.svg" width={16} height={16} alt="sd" />
                초대 하기
              </ResponseBtn>
            </div>
          )}
        </div>
      </article>
      <h3 className={cx("little-title")}>{isMemberEdit ? "이름" : "이메일"}</h3>

      <ul className={cx("list")}>
        {memberList?.map((member: any) => (
          <li className={cx("list-item")} key={member.id}>
            {isMemberEdit ? (
              <div className={cx("member-name")}>
                <Image
                  className={cx("profileImg")}
                  width={38}
                  height={38}
                  alt="프로필 이미지"
                  src={member.profileImageUrl}
                />
                {member.nickname}
              </div>
            ) : (
              <>{member.email}</>
            )}
            <ResponseBtn state="reject">{isMemberEdit ? "삭제" : "취소"}</ResponseBtn>
          </li>
        ))}
      </ul>
    </section>
  );
}
