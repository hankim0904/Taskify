import styles from "./ColumnList.module.scss";
import classNames from "classnames/bind";

import Column from "./ui/Column";

const cx = classNames.bind(styles);

import { columnListData } from "./mock/column-list";

export default function ColumnList() {
  //mock 데이터를 사용했으니 실제 데이터로 변경해 주세요.
  const columns = columnListData.data;

  return (
    <article className={cx("column-list")}>
      {columns.map(({ id, title }) => (
        <Column key={id} columnId={id} columnTitle={title} />
      ))}
    </article>
  );
}
