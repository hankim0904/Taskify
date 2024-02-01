import React, { useState } from "react";
import ModalBackground from "../ModalBackground";
import classNames from "classnames/bind";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import styles from "./DashboardCreationModal.module.scss";
import ColorList from "@/components/commons/ColorList/ColorList";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import Input from "@/components/commons/Input/Input";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import axios from "axios";

const cx = classNames.bind(styles);

interface IdashboardData {
  color: string;
  createdAt: string;
  createdByMe: boolean;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

export default NiceModal.create(({}: {}) => {
  const modal = useModal();
  return <DashboardCreationModal onCancel={() => modal.remove()} />;
});

function DashboardCreationModal({ onCancel }: { onCancel: () => void }) {
  const [color, setColor] = useState<string>("");
  const { control, handleSubmit } = useForm({ mode: "onBlur" });

  const inputValue = useWatch({
    name: "dashBoardName",
    control,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const value = data.dashBoardName;
    creationModalHandler(value);
  };

  async function creationModalHandler(title: string) {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2ODU1ODcsImlzcyI6InNwLXRhc2tpZnkifQ.LpyKKnBYSkI29ifh2b3uZHhmjc07tGA7DOOnKKP4joI";
    try {
      await axios.post(
        "https://sp-taskify-api.vercel.app/2-9/dashboards",
        {
          title,
          color: "#E876EA",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      onCancel();
    } catch (e) {
      console.error(e);
    }
  }

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
