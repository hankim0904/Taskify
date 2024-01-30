import styles from "./AddColumn.module.scss";
import classNames from "classnames/bind";

import { MixButton } from "@/components/commons/Button/MixButton";

const cx = classNames.bind(styles);

export default function AddColumn() {
  return (
    <div className={cx("add-column")}>
      <MixButton>새로운 컬럼 추가하기</MixButton>
    </div>
  );
}
