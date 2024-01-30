import ResponseBtn from "@/components/commons/Button/ResponseButton";
import styles from "./DashboradEditMemberBox.module.scss";
import classNames from "classnames/bind";
import PageChangeButton from "@/components/commons/Button/PageChangeButton";
import Image from "next/image";

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
  isUserNameEdit: boolean;
}

export default function DashboradEditMemberBox({ title, isUserNameEdit }: Props) {
  function handleBackwardPageClick() {}
  return (
    <section className={cx("dashborad-edit-box", { last: !isUserNameEdit })}>
      <article className={cx("title-line")}>
        <h2 className={cx("title")}>{title}</h2>
        <div className={cx("page-nation")}>
          <p>1 페이지 중 1</p>
          <PageChangeButton isForward={false} onClick={handleBackwardPageClick}></PageChangeButton>
          <PageChangeButton isForward={true} onClick={handleBackwardPageClick}></PageChangeButton>

          {!isUserNameEdit && (
            <div className={cx("invite-btn")}>
              <ResponseBtn state="accept" ph={0.7} fs={1.2}>
                <Image src="/assets/icons/ic-plus-box.svg" width={16} height={16} alt="sd" />
                초대 하기
              </ResponseBtn>
            </div>
          )}
        </div>
      </article>
      <h3 className={cx("little-title")}>{isUserNameEdit ? "이름" : "이메일"}</h3>

      <ul className={cx("list")}>
        {members.map((member) => (
          <li className={cx("list-item")} key={member.id}>
            {isUserNameEdit ? (
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
            <ResponseBtn state="reject">{isUserNameEdit ? "삭제" : "취소"}</ResponseBtn>
          </li>
        ))}
      </ul>
    </section>
  );
}
