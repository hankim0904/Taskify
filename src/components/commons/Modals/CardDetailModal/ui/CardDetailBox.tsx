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
      <div className={cx("box-assignee", "flex")}>
        <h3 className={cx("box-assignee-title", "title")}>담당자</h3>
        <p className={cx("box-assignee-profile")}>
          {imageUrl && (
            <span className={cx("box-assignee-profile-image")}>
              <Image fill src={imageUrl} alt="담당자 프로필 이미지" style={{ objectFit: "cover" }} />
            </span>
          )}
          <span className={cx("box-assignee-profile-detail", "detail")}>{nickname}</span>
        </p>
      </div>
      <div className={cx("box-date", "flex")}>
        <h3 className={cx("box-date-title", "title")}>마감일</h3>
        <p className={cx("box-date-detail", "detail")}>{formatedDueDate}</p>
      </div>
    </aside>
  );
}
