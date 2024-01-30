import styles from "./EmptyInvitation.module.scss";
import classNames from "classnames/bind";

import Image from "next/image";

const cx = classNames.bind(styles);

export default function EmptyInvitation() {
  return (
    <div className={cx("empty-invitation")}>
      <span className={cx("empty-invitation-img")}>
        <Image fill src="/assets/icons/ic-unsubscribe.svg" alt="빈 초대장 아이콘" />
      </span>
      <span className={cx("empty-invitation-text")}>아직 초대받은 대시보드가 없어요</span>
    </div>
  );
}
