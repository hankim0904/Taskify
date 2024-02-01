import styles from "./ModalLayout.module.scss";
import classNames from "classnames/bind";
import TaskModal from "./TaskModals/TaskModal";
import ColumnModal from "./ColumnModals/ColumnModal";
import InviteModal from "./InviteModal/InviteModal";
import React from "react";
import NiceModal, { NiceModalHandler, useModal } from "@ebay/nice-modal-react";

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
  setModal?: NiceModalHandler<Record<string, unknown>>;
}

function ModalLayout({ modalType = "addTask" }: Props) {
  const modal = useModal();

  const ContentComponent = React.cloneElement(ModalContents[modalType], { setModal: modal });
  return (
    <section className={cx("modal-background")}>
      <article className={cx("modal-container")}> {ContentComponent}</article>
    </section>
  );
}

export default NiceModal.create(({ modalType }: Props) => {
  return <ModalLayout modalType={modalType} />;
});
