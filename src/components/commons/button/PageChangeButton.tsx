import styles from "./PageChangeButton.module.scss";
import classNames from "classnames/bind";

import Image from "next/image";

const cx = classNames.bind(styles);

interface PageChangeButtonProps {
  onClick: () => void;
  isForward?: boolean;
}

export default function PageChangeButton({ onClick, isForward = true }: PageChangeButtonProps) {
  return (
    <button className={cx("page-change-btn", { forward: isForward })} onClick={onClick}>
      <Image
        src={isForward ? "/assets/icons/ic-arrow-page-forward.svg" : "/assets/icons/ic-arrow-page-backward.svg"}
        alt="페이지 넘김 방향 표시 아이콘"
        width={16}
        height={16}
      />
    </button>
  );
}
