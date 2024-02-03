import styles from "./AddColumn.module.scss";
import classNames from "classnames/bind";

import { useModal } from "@ebay/nice-modal-react";
import ColumnModal from "@/components/commons/Modals/ColumnModals/ColumnModal";

import { MixButton } from "@/components/commons/Buttons/MixButton";

const cx = classNames.bind(styles);

export default function AddColumn() {
  const modal = useModal(ColumnModal);

  return (
    <div className={cx("add-column")}>
      <MixButton onClick={() => modal.show({ isEdit: false })}>새로운 컬럼 추가하기</MixButton>
    </div>
  );
}
