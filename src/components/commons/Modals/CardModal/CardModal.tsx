import NiceModal, { useModal } from "@ebay/nice-modal-react";

export default NiceModal.create(() => {
  const modal = useModal();
  return <CardModal />;
});

function CardModal() {
  return <>카드 모달 입니다.</>;
}
