import { useQuery } from "@tanstack/react-query";
import { getCardList } from "@/components/domains/dashboardid/queries";

import styles from "./Column.module.scss";
import classNames from "classnames/bind";

import ColumnHeader from "./ColumnHeader";
import CardList from "./CardList";
import { MixButton } from "@/components/commons/Buttons/MixButton";

const cx = classNames.bind(styles);

interface ColumnProps {
  columnId: number;
  columnTitle: string;
}

export default function Column({ columnId, columnTitle }: ColumnProps) {
  const {
    data: cardListData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["cardList", columnId],
    queryFn: () => getCardList(columnId),
    staleTime: 60 * 1000,
  });

  const cardCount = cardListData?.totalCount;
  const cardList = cardListData?.cards;

  return (
    <section className={cx("column")}>
      <div className={cx("column-header")}>
        <ColumnHeader columnTitle={columnTitle} cardCount={cardCount} />
      </div>
      <MixButton />
      {!isLoading && (
        <div className={cx("column-cards")}>
          <CardList cardList={cardList} />
        </div>
      )}
    </section>
  );
}
