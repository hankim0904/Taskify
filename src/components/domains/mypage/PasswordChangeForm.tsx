import Image from "next/image";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "@/components/commons/Input/Input";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import styles from "./PasswordChangeForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function PasswordChangeForm() {
  const { control, handleSubmit } = useForm({ mode: "onChange" });
  // control , handleSubmit필수, { mode: 'onChange' } - onChange 시 error 나옴,

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data); // error 면 submit 안됨 ,SubmitHandler<FieldValues> handleSubmit 안에 들어가는 type 입니다
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cx("mypage-container-change-password")}>
        <div className={cx("title")}>비밀번호 변경</div>
        <div className={cx("contents")}>
          <div className={cx("contents-input-area", "input-gap")}>
            <div className={cx("contents-input-area-password")}>
              <Input
                name="currentPassword"
                type="password"
                labelName="현재 비밀번호"
                control={control}
                placeholder="현재 비밀번호 입력"
                rules={{ required: "비밀번호를 입력해 주세요" }}
              />
            </div>
            <div className={cx("contents-input-area-password")}>
              <Input
                name="newPassword"
                type="password"
                labelName="새 비밀번호"
                control={control}
                placeholder="새 비밀번호 입력"
                rules={{ required: "새 비밀번호를 입력해 주세요" }}
              />
            </div>
            <div className={cx("contents-input-area-password")}>
              <Input
                name="password"
                type="password"
                labelName="새 비밀번호 확인"
                control={control}
                placeholder="새 비밀번호 확인"
                rules={{ required: "비밀번호 확인을 위해 한번 더 입력해 주세요" }}
              />
            </div>
          </div>
        </div>
        <div className={cx("contents-btn")}>
          <ResponseBtn state="accept" ph={0.8}>
            변경
          </ResponseBtn>
        </div>
      </div>
    </form>
  );
}
