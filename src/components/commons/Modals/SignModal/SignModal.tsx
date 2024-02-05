import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import ModalBackground from "@/components/commons/Modals/ModalBackground";

import classNames from "classnames/bind";
import styles from "./SignModal.module.scss";

const cx = classNames.bind(styles);

export default NiceModal.create(({ text, customFunction }: { text: string; customFunction?: () => void }) => {
  const modal = useModal();
  return (
    <SignModal
      text={text}
      onCancel={() => {
        modal.remove();
        customFunction && customFunction();
      }}
    />
  );
});

function SignModal({ text, onCancel }: { text: string; onCancel: () => void }) {
  return (
    <>
      <div className={cx("container")}>
        <h2>{text}</h2>
        <div className={cx("button")}>
          <ResponseBtn state={"accept"} disabled={false} ph={1.4} onClick={onCancel}>
            확인
          </ResponseBtn>
        </div>
      </div>
      <ModalBackground onClick={onCancel} />
    </>
  );
}
