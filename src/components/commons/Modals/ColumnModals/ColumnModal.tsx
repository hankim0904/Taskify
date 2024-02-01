import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../Input/Input";
import styles from "./ColumnModal.module.scss";
import classNames from "classnames/bind";
import ResponseBtn from "../../Buttons/ResponseButton";
import { useState } from "react";
import { NiceModalHandler } from "@ebay/nice-modal-react";

const cx = classNames.bind(styles);

interface Props {
  isEdit: boolean;
  setModal?: NiceModalHandler<Record<string, unknown>>;
}

export default function ColumnModal({ isEdit, setModal }: Props) {
  const [isSureDelete, setIsSureDelete] = useState(false);
  const { control, handleSubmit, formState } = useForm({ mode: "onChange" });

  function handelonClickDelete() {
    setIsSureDelete((prev) => !prev);
  }

  const handleOnSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return !isSureDelete ? (
    <>
      <h2 className={cx("title")}>{isEdit ? "칼럼 관리" : "칼럼 생성"}</h2>
      <form className={cx("form")} onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          isModal={true}
          type="text"
          name="columnName"
          labelName="이름"
          placeholder="새로운 프로젝트"
          control={control}
          rules={{ required: "프로젝트 이름을 입력해 주세요" }}
        />
        <div className={cx("btn-line")}>
          <ResponseBtn onClick={setModal?.remove} state="cancel" ph={1.4} fs={1.6}>
            취소
          </ResponseBtn>
          <ResponseBtn type="submit" disabled={!formState.isValid} state="accept" ph={1.4} fs={1.6}>
            {isEdit ? "변경" : "생성"}
          </ResponseBtn>
        </div>
      </form>
      {isEdit && (
        <button type="button" onClick={handelonClickDelete} className={cx("delete-column-btn")}>
          삭제하기
        </button>
      )}
    </>
  ) : (
    <>
      <h2 className={cx("delete-message")}>칼럼의 모든 카드가 삭제됩니다</h2>
      <div className={cx("btn-line")}>
        <ResponseBtn onClick={handelonClickDelete} state="cancel" ph={1.4} fs={1.6}>
          취소
        </ResponseBtn>
        <ResponseBtn type="submit" state="accept" ph={1.4} fs={1.6}>
          삭제
        </ResponseBtn>
      </div>
    </>
  );
}
