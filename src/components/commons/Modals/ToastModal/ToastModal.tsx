import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classNames from "classnames/bind";
import styles from "./ToastModal.module.scss";
import Image from "next/image";

const cx = classNames.bind(styles);

export default NiceModal.create(({ text, type }: { text: string; type: string }) => {
  const modal = useModal();
  return <ToastModal text={text} type={type} />;
});

function ToastModal({ text, type }: { text: string; type: string }) {
  return (
    <div className={cx("container")}>
      <div className={cx("container-box")}>
        {type === "success" && <Image width={15} height={15} src="/assets/icons/ic-success.png" alt="성공 아이콘" />}
        {type === "fail" && <Image width={15} height={15} src="/assets/icons/ic-fail.png" alt="실패 아이콘" />}
        <h2 className={cx("text")}>{text}</h2>
      </div>
    </div>
  );
}
