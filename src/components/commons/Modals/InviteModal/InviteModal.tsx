import { useForm } from "react-hook-form";
import Input from "../../Input/Input";
import styles from "./InviteModal.module.scss";
import classNames from "classnames/bind";
import ResponseBtn from "../../Buttons/ResponseButton";
import NiceModal, { NiceModalHandler, useModal } from "@ebay/nice-modal-react";
import ModalBackground from "../ModalBackground";
import postDashboardInvitations from "@/api/postDashboardInvitations";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

interface Props {
  onCancel: () => void;
}

export default NiceModal.create(() => {
  const modal = useModal();

  return <InviteModal onCancel={modal.remove} />;
});

function InviteModal({ onCancel }: Props) {
  const { control, handleSubmit, formState } = useForm({ mode: "onBlur" });
  const rotuer = useRouter();

  function handleOnSubmit(data: any) {
    const dashboardId = rotuer.query.dashboardid;
    postDashboardInvitations(dashboardId, data.columnName);
  }
  return (
    <>
      <article className={cx("modal-container")}>
        <h2 className={cx("title")}>초대하기</h2>
        <form className={cx("form")} onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            isModal={true}
            type="text"
            name="columnName"
            labelName="이메일"
            placeholder="초대받을 이메일을 입력하세요"
            control={control}
            rules={{
              required: "이메일을 입력해 주세요",
              pattern: { value: /^\S+@\S+$/i, message: "이메일 형식이어야 합니다" },
            }}
          />
          <div className={cx("btn-line")}>
            <ResponseBtn onClick={onCancel} state="cancel" ph={1.4} fs={1.6}>
              취소
            </ResponseBtn>
            <ResponseBtn type="submit" disabled={!formState.isValid} state="accept" ph={1.4} fs={1.6}>
              초대
            </ResponseBtn>
          </div>
        </form>
      </article>
      <ModalBackground onClick={onCancel} />
    </>
  );
}
