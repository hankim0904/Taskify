import styles from "./Column.module.scss";
import classNames from "classnames/bind";

import ColumnHeader from "./ColumnHeader";
import CardList from "./CardList";
import { MixButton } from "@/components/commons/Button/MixButton";

import { cardListToDo } from "../mock/card-list-todo";
import { cardListOnProgress } from "../mock/card-list-onprogress";
import { cardListDone } from "../mock/card-list-done";
import { cardListExample } from "../mock/card-list-example";

const cx = classNames.bind(styles);

interface ColumnProps {
  columnId: number;
  columnTitle: string;
}

//temObj는 mockdata를 사용하기 객체입니다.
// 실제 데이터를 받아올 때 무시해도 되는 부분 입니다.
const tempObj = [
  { id: 8519, data: cardListToDo },
  { id: 8520, data: cardListOnProgress },
  { id: 8521, data: cardListDone },
  { id: 8655, data: cardListExample },
];

export default function Column({ columnId, columnTitle }: ColumnProps) {
  //mock 데이터를 사용했으니 실제 데이터로 변경해 주세요.
  let thisColumn;
  for (const column of tempObj) {
    if (column.id === columnId) {
      thisColumn = column.data;
      break;
    }
  }
  const cardCount = thisColumn?.totalCount;
  const cards = thisColumn?.cards;
  const isExistCards = cards?.length === 0 ? false : true;

  return (
    <section className={cx("column")}>
      <div className={cx("column-header")}>
        <ColumnHeader columnTitle={columnTitle} cardCount={cardCount} />
      </div>
      <MixButton />
      {isExistCards && (
        <div className={cx("column-cards")}>
          <CardList cards={cards} />
        </div>
      )}
    </section>
  );
}
