import styles from "./CardList.module.scss";
import classNames from "classnames/bind";

import { useModal } from "@ebay/nice-modal-react";
import CardDetailModal from "@/components/commons/Modals/CardDetailModal/CardDetailModal";

import Image from "next/image";
import DescriptionTag from "@/components/commons/tag/DescriptionTag/DescriptionTag";
import { formatDate } from "../../../../utils/formatDate";
import { Card } from "../api/type";
import { motion } from "framer-motion";
import extractInitial from "@/utils/extractInitial";

const cx = classNames.bind(styles);

interface CardListProp {
  cardList: Card[] | [];
  columnTitle: string;
}

export default function CardList({ cardList, columnTitle }: CardListProp) {
  const modal = useModal(CardDetailModal);

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, card: Card) {
    e.currentTarget.classList.add(cx("dragged"));
    e.dataTransfer.setData("text/plain", JSON.stringify(card));
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragEnd(e: React.MouseEvent) {
    e.currentTarget.classList.remove(cx("dragged"));
  }

  return (
    <div className={cx("cards")}>
      {cardList.map((card) => {
        const {
          id,
          title,
          tags,
          dueDate,
          assignee: { profileImageUrl, nickname },
          imageUrl,
        } = card;
        const isExistImg = !(
          imageUrl === "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image"
        );
        const isExistTag = tags.length === 0 ? false : true;
        return (
          <motion.div
            key={id}
            onClick={() => modal.show({ cardId: id, columnTitle })}
            whileHover={{ scale: 0.95, backgroundColor: "#fafafa" }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={cx("card")}
              onDragStart={(e) => handleDragStart(e, card)}
              onDragEnd={(e) => handleDragEnd(e)}
              draggable
            >
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
                      const tagObj = JSON?.parse(tag);
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

                  <div className={cx("card-profile")}>
                    <span className={cx("card-profile-img")}>
                      {profileImageUrl ? (
                        <Image fill src={profileImageUrl} alt="프로필 이미지" objectFit="cover" />
                      ) : (
                        <div className={cx("card-profile-img-none")}>{extractInitial(nickname)}</div>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
