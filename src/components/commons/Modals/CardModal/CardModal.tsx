import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalBackground from "../ModalBackground";

interface Props {
  onCancel: () => void;
}

export default NiceModal.create(() => {
  const modal = useModal();
  return <CardModal onCancel={modal.remove} />;
});

function CardModal({ onCancel }: Props) {
  return (
    <>
      <div>카드 모달 입니다.</div>
      <ModalBackground onClick={onCancel} />
    </>
  );
}
