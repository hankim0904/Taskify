import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCardList } from "@/components/domains/dashboardid/api/queries";
import { getCardListQueryKey } from "@/components/domains/dashboardid/api/queryKeys";

import styles from "./Column.module.scss";
import classNames from "classnames/bind";

import { useModal } from "@ebay/nice-modal-react";
import TaskModal from "@/components/commons/Modals/TaskModals/TaskModal";

import ColumnHeader from "./ColumnHeader";
import CardList from "./CardList";
import { MixButton } from "@/components/commons/Buttons/MixButton";
import { useIntersectionObserver } from "../utils/useIntersectionObserver";

const cx = classNames.bind(styles);

interface ColumnProps {
  columnId: number;
  columnTitle: string;
}

export default function Column({ columnId, columnTitle }: ColumnProps) {
  const modal = useModal(TaskModal);
  const bottomObserver = useRef<HTMLDivElement | null>(null);

  const {
    data: cardPagesInfo,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: getCardListQueryKey(columnId),
    queryFn: ({ pageParam = 1 }) => getCardList(pageParam, columnId),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const cardPages = cardPagesInfo?.pages ?? [];
  const cardCount = cardPagesInfo?.pages[0].totalCount;
  const fetchNextCardList = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useIntersectionObserver(bottomObserver, fetchNextCardList, { threshold: 0 });

  return (
    <section className={cx("column")}>
      <div className={cx("column-header")}>
        <ColumnHeader columnId={columnId} columnTitle={columnTitle} cardCount={cardCount} />
      </div>
      <MixButton onClick={() => modal.show(columnId)} />
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
