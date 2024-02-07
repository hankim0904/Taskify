import { useQueries } from "@tanstack/react-query";
import { getCardDetail, getComments } from "@/components/domains/dashboardid/api/queries";
import { getCardDetailQueryKey, getCommentsQueryKey } from "@/components/domains/dashboardid/api/queryKeys";

import classNames from "classnames/bind";
import styles from "./CardDetailModal.module.scss";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalBackground from "../ModalBackground";
import CardDetailHeader from "./ui/CardDetailHeader";
import CardDetailContent from "./ui/CardDetailContent";
import CardDetailBox from "./ui/CardDetailBox";
import { formatDate } from "@/utils/formatDate";
import CardDetailComments from "./ui/CardDetailComments";
import CardDetailTextarea from "./ui/CardDetailTextarea";

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

function CardDetailModal({ cardId, onCancel, columnTitle }: Props) {
  const queries = [
    { queryKey: getCardDetailQueryKey(cardId), queryFn: () => getCardDetail(cardId), staleTime: 300 * 1000 },
    { queryKey: getCommentsQueryKey(cardId), queryFn: () => getComments(cardId), staleTime: 300 * 1000 },
  ];

  const results = useQueries({ queries });
  const isLoading = results.some((result) => result.isLoading);

  if (isLoading || !results[0].data || !results[1].data) return null;

  const cardDetailData = results[0].data;
  const commentsData = results[1].data;

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
        <div className={cx("card-textarea")}>
          <CardDetailTextarea />
        </div>
        <div className={cx("card-comments")}>
          <CardDetailComments commentsData={commentsData.comments} />
        </div>
      </div>
      <ModalBackground onClick={onCancel} />
    </>
  );
}
