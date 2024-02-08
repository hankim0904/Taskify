import React, { useState } from "react";
import ModalBackground from "../ModalBackground";
import classNames from "classnames/bind";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import styles from "./DashboardCreationModal.module.scss";
import ColorList from "@/components/commons/ColorList/ColorList";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import Input from "@/components/commons/Input/Input";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import postDashboard from "@/api/postDashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const cx = classNames.bind(styles);

export default NiceModal.create(({}: {}) => {
  const modal = useModal();
  return <DashboardCreationModal onCancel={() => modal.remove()} />;
});

function DashboardCreationModal({ onCancel }: { onCancel: () => void }) {
  const [color, setColor] = useState<string>("");
  const { control, handleSubmit } = useForm({ mode: "onBlur" });

  const queryClient = useQueryClient();

  const creationDashboardMutation = useMutation({
    mutationFn: (newDashboard: { title: string; color: string }) =>
      postDashboard(newDashboard.title, newDashboard.color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardList"] });
    },
  });

  const inputValue = useWatch({
    name: "dashBoardName",
    control,
  });

  const colorList: { [key: string]: string } = {
    green: "#7ac555",
    purple: "#760dde",
    orange: "#ffa500",
    blue: "#76a5ea",
    pink: "#e876ea",
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const DashboardDotColor = colorList[color];
    const newDashboard = {
      title: data.dashBoardName,
      color: DashboardDotColor,
    };

    creationDashboardMutation.mutate({ title: newDashboard.title, color: newDashboard.color });
    onCancel();
  };

  return (
    <>
      <div className={cx("container")}>
        <h2>새로운 대시보드</h2>
        <form className={cx("form-container")} onSubmit={handleSubmit(onSubmit)}>
          <Input
            control={control}
            labelName="대시보드 이름"
            name="dashBoardName"
            placeholder="텍스트를 입력해주세요"
            type="text"
            defaultValue={inputValue || ""}
            rules={{
              required: "텍스트를 입력해주세요",
            }}
          />

          <ColorList setColor={setColor} />
          <div className={cx("button-container")}>
            <div className={cx("button-item-container")}>
              <ResponseBtn state="accept" ph={1.4} type="submit" disabled={Boolean(!color) || Boolean(!inputValue)}>
                생성
              </ResponseBtn>
            </div>
            <div className={cx("button-item-container")}>
              <ResponseBtn state="cancel" ph={1.4} onClick={onCancel}>
                취소
              </ResponseBtn>
            </div>
          </div>
        </form>
      </div>
      <ModalBackground onClick={onCancel} />
    </>
  );
}
