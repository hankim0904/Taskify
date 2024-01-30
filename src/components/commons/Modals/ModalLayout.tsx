import styles from "./ModalLayout.module.scss";
import classNames from "classnames/bind";
import TaskModal from "./TaskModals/TaskModal";
import ColumnModal from "./ColumnModals/ColumnModal";
import InviteModal from "./InviteModal/InviteModal";
import React from "react";

const cx = classNames.bind(styles);

const ModalContents = {
  addTask: <TaskModal isEdit={false} />,
  editTask: <TaskModal isEdit={true} />,
  addColumn: <ColumnModal isEdit={false} />,
  editColumn: <ColumnModal isEdit={true} />,
  invite: <InviteModal />,
};

interface Props {
  modalType: keyof typeof ModalContents;
  isModalOpen?: () => void;
}

export default function ModalLayout({ modalType = "addTask", isModalOpen }: Props) {
  const ContentComponent = ModalContents[modalType];
  return (
    <section className={cx("modal-background")}>
      <article className={cx("modal-container")}> {ContentComponent}</article>
    </section>
  );
}
