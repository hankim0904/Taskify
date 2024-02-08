import styles from "./CardDetailComments.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import formatDateDot from "../utils/dateDotChange";

const cx = classNames.bind(styles);

interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

interface CardDetailCommentsProps {
  commentsData: CommentData[];
}

export default function CardDetailComments({ commentsData }: CardDetailCommentsProps) {
  if (!commentsData) {
    return null;
  }

  return (
    <div className={cx("comments-container")}>
      {commentsData.map((comment) => (
        <div key={comment.id} className={cx("container-1")}>
          <Image
            className={cx("profileImage")}
            src={comment.author.profileImageUrl}
            alt="댓글 작성자 이미지"
            width={34}
            height={34}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
          <div className={cx("container-2")}>
            <div className={cx("container-3")}>
              <div className={cx("nickname")}>{comment.author.nickname}</div>
              <div className={cx("updatedAt")}>{formatDateDot(comment.createdAt)}</div>
            </div>
            <div className={cx("content")}>{comment.content}</div>
            <div className={cx("container-4")}>
              <div className={cx("edit")}>수정</div>
              <div className={cx("delete")}>삭제</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
