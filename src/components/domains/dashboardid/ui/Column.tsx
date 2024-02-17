import { useRef } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCardList } from "@/components/domains/dashboardid/api/queries";
import { getCardListQueryKey } from "@/components/domains/dashboardid/api/queryKeys";
import { putCardDataDrag } from "@/api/postCardData";

import styles from "./Column.module.scss";
import skeletonStyles from "./CardListSkUi.module.scss";
import classNames from "classnames/bind";

import { useModal } from "@ebay/nice-modal-react";
import TaskModal from "@/components/commons/Modals/TaskModals/TaskModal";

import ColumnHeader from "./ColumnHeader";
import CardList from "./CardList";
import { MixButton } from "@/components/commons/Buttons/MixButton";
import { useIntersectionObserver } from "../utils/useIntersectionObserver";
import { FormValuesDrag } from "../api/type";
import { processDropData } from "../utils/processDropData";

const cx = classNames.bind(styles);
const skCx = classNames.bind(skeletonStyles);

interface ColumnProps {
  columnId: number;
  columnTitle: string;
}

export default function Column({ columnId, columnTitle }: ColumnProps) {
  const modal = useModal(TaskModal);
  const queryClient = useQueryClient();
  const bottomObserver = useRef<HTMLDivElement | null>(null);

  const {
    data: cardPagesInfo,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: getCardListQueryKey(columnId),
    queryFn: ({ pageParam }) => getCardList(pageParam, columnId),
    initialPageParam: null,
    getNextPageParam: lastPage => lastPage.cursorId,
  });

  const cardPages = cardPagesInfo?.pages ?? [];
  const cardCount = cardPagesInfo?.pages[0].totalCount;
  const fetchNextCardList = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };
  useIntersectionObserver(bottomObserver, fetchNextCardList, { threshold: 0 });

  const EditCardMutation = useMutation({
    mutationFn: (putData: FormValuesDrag) => putCardDataDrag(putData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCardListQueryKey(columnId as number) });
    },
  });

  function updateCard(putData: FormValuesDrag, columnId: number) {
    EditCardMutation.mutate(putData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getCardListQueryKey(columnId as number) });
      },
    });
  }

  function handleDrop(e: React.DragEvent<HTMLElement>) {
    const { putData, columnId } = processDropData(e);
    updateCard(putData, columnId);
  }

  if (isLoading) {
    return (
      <section className={cx("column")}>
        <div className={cx("column-header")}>
          <ColumnHeader columnId={columnId} columnTitle={columnTitle} cardCount={cardCount} />
        </div>
        <MixButton onClick={() => modal.show({ columnId })} />
        <div className={cx("column-pages")}>
          <SkeletonCardList />
          <div className={cx("column-pages-end")} ref={bottomObserver}></div>
        </div>
      </section>
    );
  }

  return (
    <section className={cx("column")} id={String(columnId)} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <div className={cx("column-header")}>
        <ColumnHeader columnId={columnId} columnTitle={columnTitle} cardCount={cardCount} />
      </div>
      <MixButton onClick={() => modal.show({ columnId })} />
      {cardCount !== 0 && (
        <div className={cx("column-pages")}>
          {cardPages.map((cardPage, i) => (
            <div className={cx("column-cards")} key={i}>
              <CardList cardList={cardPage.cards} columnTitle={columnTitle} />
            </div>
          ))}
          <div className={cx("column-pages-end")} ref={bottomObserver}></div>
        </div>
      )}
    </section>
  );
}

function SkeletonCardList() {
  const numberOfItems = 5;

  const items = Array.from({ length: numberOfItems }, (_, index) => (
    <div className={skCx("skeleton-card")} key={index}>
      <div className={skCx("skeleton-card-img")}>
        <div className={skCx("line")} />
      </div>
    </div>
  ));

  return <>{items}</>;
}
