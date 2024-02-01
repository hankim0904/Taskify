import { FieldValues, useForm } from "react-hook-form";
import styles from "./TaskModal.module.scss";
import classNames from "classnames/bind";
import ResponseBtn from "../../Buttons/ResponseButton";
import Input from "../../Input/Input";
import Textarea from "../../Input/Textarea";
import { ChangeEvent, useState } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import DateInput from "../../Input/DateInput";
import { NiceModalHandler } from "@ebay/nice-modal-react";

const cx = classNames.bind(styles);

interface Props {
  isEdit: boolean;
  setModal?: NiceModalHandler<Record<string, unknown>>;
}

//상태 값 dashboardId 로 변환해서 submit

export default function TaskModal({ isEdit, setModal }: Props) {
  const [startDate, setStartDate] = useState(new Date());

  const { control, setValue, handleSubmit, formState } = useForm({ mode: "onBlur" });
  const { errors } = formState;

  function handleOnSubmit(data: any) {
    console.log(data);
  }
  return (
    <>
      <h2 className={cx("title")}>{isEdit ? "할 일 수정" : "할 일 생성"}</h2>
      <form className={cx("form")} onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={cx("dropdown-line")}>
          {isEdit && <Dropdown name="dashboardId" setValue={setValue} control={control} />}
          <Dropdown name="assignee" setValue={setValue} control={control} />
        </div>

        <Input
          isModal={true}
          type="text"
          name="title"
          labelName="제목"
          placeholder="제목을 입력해 주세요"
          control={control}
          rules={{ required: "제목을 입력해 주세요" }}
        />
        <Textarea
          isModal={true}
          name="description"
          labelName="설명"
          placeholder="설명을 입력해 주세요"
          control={control}
          rules={{ required: "설명을 입력해 주세요" }}
        />
        <DateInput labelName="날짜" control={control} name="dueDate" />

        <Input isModal={true} type="text" name="tag" labelName="태그" placeholder="입력 후 Enter" control={control} />
        <Input isModal={true} type="file" name="profileImageUrl" labelName="이미지" placeholder="" control={control} />
        <div className={cx("btn-line", { edit: isEdit })}>
          <ResponseBtn type="button" onClick={setModal?.remove} state="cancel" ph={1.4} fs={1.6}>
            취소
          </ResponseBtn>
          <ResponseBtn type="submit" disabled={!formState.isValid} state="accept" ph={1.4} fs={1.6}>
            {isEdit ? "수정" : "생성"}
          </ResponseBtn>
        </div>
      </form>
    </>
  );
}
