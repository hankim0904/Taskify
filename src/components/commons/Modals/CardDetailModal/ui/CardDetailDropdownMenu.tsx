import classNames from "classnames/bind";
import styles from "./CardDetailDropdownMenu.module.scss";

import Image from "next/image";

const cx = classNames.bind(styles);

export default function CardDetailDropdownMenu() {
  return (
    <div className={cx("dropdown")}>
      <button className={cx("dropdown-btn")}>
        <Image fill src="/assets/icons/ic-more.svg" alt="할 일 카드 모달 메뉴 버튼" />
      </button>
    </div>
  );
}
