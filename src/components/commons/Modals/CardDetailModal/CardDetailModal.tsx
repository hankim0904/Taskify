import { useRef, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { getCardDetail, getComments } from "@/components/domains/dashboardid/api/queries";
import { getCardDetailQueryKey, getCommentsQueryKey } from "@/components/domains/dashboardid/api/queryKeys";
import ModalBackground from "../ModalBackground";
import CardDetailHeader from "./ui/CardDetailHeader";
import CardDetailContent from "./ui/CardDetailContent";
import CardDetailBox from "./ui/CardDetailBox";
import { formatDate } from "@/utils/formatDate";
import CardDetailComments from "./ui/CardDetailComments";
import CardDetailTextarea from "./ui/CardDetailTextarea";

import classNames from "classnames/bind";
import styles from "./CardDetailModal.module.scss";

const cx = classNames.bind(styles);

interface Props {
  cardId: number;
  columnTitle: string;
  onCancel: () => void;
}

export interface EditStore {
  id: number;
  content: string;
}

export default NiceModal.create(({ cardId, columnTitle }: Props) => {
  const modal = useModal();
  return <CardDetailModal cardId={cardId} columnTitle={columnTitle} onCancel={modal.remove} />;
});

function CardDetailModal({ cardId, onCancel, columnTitle }: Props) {
  const methods = useForm({
    mode: "onChange",
  });

  const [editing, setEditing] = useState(false);
  const [editStore, setEditStore] = useState<EditStore>({ id: 0, content: "" });
  const bottomObserver = useRef<HTMLDivElement | null>(null);

  const { data: cardDetailData, isLoading } = useQuery({
    queryKey: getCardDetailQueryKey(cardId),
    queryFn: () => getCardDetail(cardId),
    staleTime: 300 * 1000,
  });

  const {
    data: cardCommentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: getCommentsQueryKey(cardId),
    queryFn: ({ pageParam = 1 }) => getComments(pageParam, cardId),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.cursorId,
  });

  const fetchNextComments = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (bottomObserver.current === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextComments();
        }
      },
      { threshold: 0 }
    );
    const currentBottomObserver = bottomObserver.current;
    observer.observe(currentBottomObserver);

    return () => observer.unobserve(currentBottomObserver);
  }, [bottomObserver, fetchNextComments]);

  if (isLoading || !cardDetailData || !cardCommentsData) return null;

  const { title, description, tags, imageUrl, assignee, dueDate, id, columnId, dashboardId } = cardDetailData;
  const cardComments = cardCommentsData?.pages ?? [];

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
        <FormProvider {...methods}>
          <div className={cx("card-textarea")}>
            <CardDetailTextarea
              dashboardId={dashboardId}
              cardId={cardId}
              columnId={columnId}
              editing={editing}
              editStore={editStore}
              setEditing={setEditing}
            />
          </div>
          <div className={cx("card-comments")}>
            {cardComments.map((comments) => (
              <CardDetailComments
                cardId={cardId}
                commentsData={comments.comments}
                setEditing={setEditing}
                setEditStore={setEditStore}
              />
            ))}
            <div className={cx("card-ref")} ref={bottomObserver}></div>
          </div>
        </FormProvider>
      </div>
      <ModalBackground onClick={onCancel} />
    </>
  );
}
