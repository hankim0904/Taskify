import classNames from "classnames/bind";
import styles from "./CardDetailBox.module.scss";
import Image from "next/image";

const cx = classNames.bind(styles);

interface CardDetailBoxProps {
  nickname: string;
  imageUrl: string;
  formatedDueDate: string;
}

export default function CardDetailBox({ nickname, imageUrl, formatedDueDate }: CardDetailBoxProps) {
  return (
    <aside className={cx("box")}>
      <div className={cx("box-assignee")}>
        <h3 className={cx("box-title")}>담당자</h3>
        <span className={cx("box-assignee-image")}>
          <Image fill src={imageUrl} alt="담당자 프로필 이미지" style={{ objectFit: "cover" }} />
        </span>
        <span className={cx("box-detail")}>{nickname}</span>
      </div>
      <div className={cx("box-date")}>
        <h3 className={cx("box-title")}>마감일</h3>
        <span className={cx("box-detail")}>{formatedDueDate}</span>
      </div>
    </aside>
  );
}
