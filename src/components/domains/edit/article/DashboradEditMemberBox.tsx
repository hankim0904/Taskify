import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import styles from "./DashboradEditMemberBox.module.scss";
import classNames from "classnames/bind";
import PageChangeButton from "@/components/commons/Buttons/PageChangeButton";
import Image from "next/image";
import { MouseEventHandler } from "react";
import NiceModal, { NiceModalHandler } from "@ebay/nice-modal-react";
import ModalLayout from "@/components/commons/Modals/ModalLayout";

const cx = classNames.bind(styles);

const members = [
  {
    id: 0,
    userId: 0,
    email: "asdf@asdf.asdf",
    nickname: "ddd",
    profileImageUrl: "/a",
  },
  {
    id: 0,
    userId: 0,
    email: "qwer@qwer.qwer",
    nickname: "qqqqq",
    profileImageUrl: "/a",
  },
  {
    id: 0,
    userId: 0,
    email: "qwerqwer@qwer.qwer",
    nickname: "eeeee",
    profileImageUrl: "/a",
  },
  {
    id: 0,
    userId: 0,
    email: "d@asfsdf.sfsd",
    nickname: "aaaaa",
    profileImageUrl: "/a",
  },
  {
    id: 0,
    userId: 0,
    email: "QWERwqe@asdf.sd",
    nickname: "ccccc",
    profileImageUrl: "/a",
  },
];

interface Props {
  title: string;
  isMemberEdit: boolean;
  setModal?: NiceModalHandler<Record<string, unknown>>;
  showModal?: () => void;
  memberList?: any;
}

//초대 취소시 유저 아이디 필요

export default function DashboradEditMemberBox({ showModal, title, isMemberEdit, memberList }: Props) {
  function handleBackwardPageClick() {}
  return (
    <section className={cx("dashborad-edit-box", { email: !isMemberEdit })}>
      <article className={cx("title-line")}>
        <h2 className={cx("title")}>{title}</h2>
        <div className={cx("title-right-contents")}>
          <p>1 페이지 중 1</p>
          <PageChangeButton isForward={false} onClick={handleBackwardPageClick}></PageChangeButton>
          <PageChangeButton isForward={true} onClick={handleBackwardPageClick}></PageChangeButton>

          {!isMemberEdit && (
            <div className={cx("invite-btn")}>
              <ResponseBtn onClick={showModal} state="accept" ph={0.7} fs={1.2}>
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
                {/* <Image
                  className={cx("profileImg")}
                  width={38}
                  height={38}
                  alt="프로필 이미지"
                  src={member.profileImageUrl}
                /> */}
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
