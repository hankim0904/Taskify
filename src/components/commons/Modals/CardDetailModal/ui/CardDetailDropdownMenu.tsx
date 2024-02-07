import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "@/components/domains/dashboardid/api/queries";

import classNames from "classnames/bind";
import styles from "./CardDetailDropdownMenu.module.scss";
import { useModal } from "@ebay/nice-modal-react";

import Image from "next/image";
import TaskModal from "../../TaskModals/TaskModal";
import { getCardListQueryKey } from "@/components/domains/dashboardid/api/queryKeys";

const cx = classNames.bind(styles);

interface CardDetailDropdownMenuProps {
  cardId: number;
  columnId: number;
  assigneeUserId: number;
  onClick: () => void;
}

export default function CardDetailDropdownMenu({
  cardId,
  columnId,
  assigneeUserId,
  onClick,
}: CardDetailDropdownMenuProps) {
  const modal = useModal(TaskModal);
  const queryClient = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const deleteCardMutation = useMutation({
    mutationFn: () => deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCardListQueryKey(columnId),
      });
      onClick();
    },
  });

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOpenEditModal = () => {
    modal.show({ assigneeUserId, columnId, cardId, isEdit: true });
    onClick();
  };

  const handleDeleteCard = () => {
    if (confirm("할 일 카드를 삭제할까요?")) {
      deleteCardMutation.mutate();
      alert("삭제가 완료됐습니다");
    }
  };
  return (
    <div className={cx("dropdown")}>
      <button className={cx("dropdown-btn")} onClick={handleDropdownOpen}>
        <Image fill src="/assets/icons/ic-more.svg" alt="할 일 카드 모달 메뉴 버튼" />
      </button>
      {isDropdownOpen && (
        <ul className={cx("dropdown-menu")}>
          <li className={cx("dropdown-menu-element")}>
            <button onClick={handleOpenEditModal}>수정하기</button>
          </li>
          <li className={cx("dropdown-menu-element")}>
            <button onClick={handleDeleteCard}>삭제하기</button>
          </li>
        </ul>
      )}
    </div>
  );
}
