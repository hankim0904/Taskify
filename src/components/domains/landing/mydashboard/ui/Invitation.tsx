import styles from "./Invitation.module.scss";
import classNames from "classnames/bind";

import ResponseBtn from "@/components/commons/Button/ResponseButton";

const cx = classNames.bind(styles);

interface InvitationProp {
  title: string;
  inviter: string;
}

export default function Invitation({ title, inviter }: InvitationProp) {
  return (
    <div className={cx("invitation")}>
      <span className={cx("invitation-title")}>
        <h1>이름</h1>
        <p>{title}</p>
      </span>
      <span className={cx("invitation-inviter")}>
        <h1>초대자</h1>
        <p>{inviter}</p>
      </span>
      <span className={cx("invitation-btn")}>
        <ResponseBtn state="accept" ph={0.7} pw={3.7}>
          수락
        </ResponseBtn>
        <ResponseBtn state="cancel" ph={0.7} pw={3.7}>
          거절
        </ResponseBtn>
      </span>
    </div>
  );
}
