import { useForm } from "react-hook-form";
import Input from "../../Input/Input";
import styles from "./InviteModal.module.scss";
import classNames from "classnames/bind";
import ResponseBtn from "../../Button/ResponseButton";

const cx = classNames.bind(styles);

interface Props {
  isOpen?: () => void;
}

export default function InviteModal({ isOpen }: Props) {
  const { control, handleSubmit } = useForm({ mode: "onBlur" });

  function handleOnSubmit(data: any) {
    console.log(data);
  }
  return (
    <>
      <h2 className={cx("title")}>초대하기</h2>
      <form className={cx("form")} onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          isModal={true}
          type="text"
          name="columnName"
          labelName="이메일"
          placeholder="초대받을 이메일을 입력하세요"
          control={control}
          rules={{ pattern: { value: /^\S+@\S+$/i, message: "이메일 형식이어야 합니다" } }}
        />
        <div className={cx("btn-line")}>
          <ResponseBtn state="cancel" ph={1.4} fs={1.6}>
            취소
          </ResponseBtn>
          <ResponseBtn state="accept" ph={1.4} fs={1.6}>
            초대
          </ResponseBtn>
        </div>
      </form>
    </>
  );
}
