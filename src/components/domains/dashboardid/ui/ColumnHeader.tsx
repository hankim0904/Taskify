import styles from "./ColumnHeader.module.scss";
import classNames from "classnames/bind";

import { useModal } from "@ebay/nice-modal-react";
import ColumnModal from "@/components/commons/Modals/ColumnModals/ColumnModal";

import Image from "next/image";

const cx = classNames.bind(styles);

interface ColumnHeaderProps {
  columnId: number;
  columnTitle: string;
  cardCount: number | undefined;
}

export default function ColumnHeader({ columnId, columnTitle, cardCount }: ColumnHeaderProps) {
  const modal = useModal(ColumnModal);
  return (
    <header className={cx("header")}>
      <div className={cx("header-title")}>
        <span className={cx("header-title-dot")}></span>
        <h1 className={cx("header-title-text")}>{columnTitle}</h1>
        <p className={cx("header-title-count")}>{cardCount}</p>
      </div>
      <button type="button" className={cx("header-img")} onClick={() => modal.show({ isEdit: true, columnId })}>
        <Image fill src="/assets/icons/ic-gear.svg" alt="컬럼 수정 아이콘" />
      </button>
    </header>
  );
}
