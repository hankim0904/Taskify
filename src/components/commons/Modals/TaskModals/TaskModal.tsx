import { FieldValues, useForm, useWatch } from "react-hook-form";
import styles from "./TaskModal.module.scss";
import classNames from "classnames/bind";
import ResponseBtn from "../../Button/ResponseButton";
import Input from "../../Input/Input";
import Textarea from "../../Input/Textarea";
import Dropdown from "../../Dropdown/Dropdown";
import { ChangeEvent } from "react";

const cx = classNames.bind(styles);

interface Props {
  isEdit: boolean;
  isModalOpen?: () => void;
}

export default function TaskModal({ isEdit, isModalOpen }: Props) {
  const { control, setValue, handleSubmit } = useForm({ mode: "onChange" });

  function handleOnSubmit(data: any) {
    console.log(data);
  }
  return (
    <>
      <h2 className={cx("title")}>{isEdit ? "할 일 수정" : "할 일 생성"}</h2>
      <form className={cx("form")} onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={cx("dropdown-line")}>
          {isEdit && <Dropdown name="state" setValue={setValue} control={control} />}
          <Dropdown name="manager" setValue={setValue} control={control} />
        </div>

        <Input
          isModal={true}
          type="text"
          name="createTodoModalTitle"
          labelName="제목"
          placeholder="제목을 입력해 주세요"
          control={control}
          rules={{ required: "제목을 입력해 주세요" }}
        />
        <Textarea
          name="description"
          labelName="설명"
          placeholder="설명을 입력해 주세요"
          control={control}
          rules={{ required: "설명을 입력해 주세요" }}
        />

        <Input
          isModal={true}
          type="date"
          name="dueDate"
          labelName="마감일"
          placeholder="날짜를 입력해 주세요"
          control={control}
        />
        <Input isModal={true} type="text" name="tag" labelName="태그" placeholder="입력 후 Enter" control={control} />
        <Input isModal={true} type="file" name="image" labelName="이미지" placeholder="" control={control} />
        <div className={cx("btn-line", { edit: isEdit })}>
          <ResponseBtn state="cancel" ph={1.4} fs={1.6}>
            취소
          </ResponseBtn>
          <ResponseBtn state="accept" ph={1.4} fs={1.6}>
            {isEdit ? "수정" : "생성"}
          </ResponseBtn>
        </div>
      </form>
    </>
  );
}
