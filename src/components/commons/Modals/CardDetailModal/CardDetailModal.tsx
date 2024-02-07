import { useQuery } from "@tanstack/react-query";
import { getCardDetail } from "@/components/domains/dashboardid/api/queries";
import { getCardDetailQueryKey } from "@/components/domains/dashboardid/api/queryKeys";

import classNames from "classnames/bind";
import styles from "./CardDetailModal.module.scss";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalBackground from "../ModalBackground";
import CardDetailHeader from "./ui/CardDetailHeader";
import CardDetailContent from "./ui/CardDetailContent";
import CardDetailBox from "./ui/CardDetailBox";
import { formatDate } from "@/utils/formatDate";

const cx = classNames.bind(styles);

interface Props {
  cardId: number;
  columnTitle: string;
  onCancel: () => void;
}

export default NiceModal.create(({ cardId, columnTitle }: Props) => {
  const modal = useModal();
  return <CardDetailModal cardId={cardId} columnTitle={columnTitle} onCancel={modal.remove} />;
});

function CardDetailModal({ cardId, columnTitle, onCancel }: Props) {
  const { data: cardDetailData, isLoading } = useQuery({
    queryKey: getCardDetailQueryKey(cardId),
    queryFn: () => getCardDetail(cardId),
    staleTime: 300 * 1000,
  });

  if (isLoading || !cardDetailData) return null;

  const { title, description, tags, imageUrl, assignee, dueDate, id, columnId } = cardDetailData;
  const formatedDate = formatDate(dueDate);
  let parsedTags = tags.map((tag: string) => JSON.parse(tag));

  return (
    <>
      <div className={cx("card")}>
        <div className={cx("card-header")}>
          <CardDetailHeader
            title={title}
            cardId={id}
            columnId={columnId}
            assigneeUserId={assignee.id}
            onClick={onCancel}
          />
        </div>
        <div className={cx("card-content")}>
          <CardDetailContent
            columnTitle={columnTitle}
            tags={parsedTags}
            description={description}
            imageUrl={imageUrl}
          />
        </div>
        <div className={cx("card-box")}>
          <CardDetailBox
            nickname={assignee.nickname}
            imageUrl={assignee.profileImageUrl}
            formatedDueDate={formatedDate}
          />
        </div>
      </div>
      <ModalBackground onClick={onCancel} />
    </>
  );
}
