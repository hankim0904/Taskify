import styles from "./CardList.module.scss";
import classNames from "classnames/bind";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import CardModal from "@/components/commons/Modals/CardModal/CardModal";

import Image from "next/image";
import DescriptionTag from "@/components/commons/tag/DescriptionTag/DescriptionTag";
import { formatDate } from "../utils/formatDate";

const cx = classNames.bind(styles);

interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  imageUrl: string;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

interface CardListProp {
  cardList: Card[] | [];
}

export default function CardList({ cardList }: CardListProp) {
  const modal = useModal(CardModal);
  return (
    <div className={cx("cards")}>
      {cardList.map(({ id, title, tags, dueDate, assignee: { profileImageUrl }, imageUrl }) => {
        const isExistImg = !(
          imageUrl === "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image"
        );
        const isExistTag = tags.length === 0 ? false : true;
        return (
          <div className={cx("card")} key={id} onClick={() => modal.show(CardModal)}>
            {isExistImg && (
              <div className={cx("card-img")}>
                <Image fill src={imageUrl} alt="카드 이미지" objectFit="cover" />
              </div>
            )}
            <h2 className={cx("card-title")}>{title}</h2>
            <div className={cx("flex-box-outer")}>
              {isExistTag && (
                <div className={cx("card-tag")}>
                  {tags.map((tag, index) => {
                    const tagObj = JSON.parse(tag);
                    return (
                      <span key={index}>
                        <DescriptionTag tagName={tagObj.name} tagStyle={tagObj.style} />
                      </span>
                    );
                  })}
                </div>
              )}
              <div className={cx("flex-box-inner")}>
                <div className={cx("card-date")}>
                  <span className={cx("card-date-img")}>
                    <Image fill src="/assets/icons/ic-calendar.svg" alt="달력 아이콘" />
                  </span>
                  <span className={cx("card-date-text")}>{formatDate(dueDate)}</span>
                </div>
                {profileImageUrl && (
                  <div className={cx("card-profile")}>
                    <span className={cx("card-profile-img")}>
                      <Image fill src={profileImageUrl} alt="프로필 이미지" objectFit="cover" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
