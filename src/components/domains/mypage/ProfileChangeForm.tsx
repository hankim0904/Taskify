import Image from "next/image";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "@/components/commons/Input/Input";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import styles from "./ProfileChangeForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function ProfileChangeForm() {
  const { control, handleSubmit } = useForm({ mode: "onChange" });
  // control , handleSubmit필수, { mode: 'onChange' } - onChange 시 error 나옴,

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data); // error 면 submit 안됨 ,SubmitHandler<FieldValues> handleSubmit 안에 들어가는 type 입니다
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cx("mypage-container-profile")}>
        <div className={cx("title")}>프로필</div>
        <div className={cx("contents")}>
          <label htmlFor="fileInput">
            <div className={cx("contents-upload-image")}>
              <Image width={30} height={30} src="/assets/icons/ic-plus-without-background.svg" alt="이미지 업로드" />
            </div>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />
          <div className={cx("contents-input-area")}>
            <div className={cx("contents-input-area-email")}>
              <span className={cx("label")}>이메일</span>
              <input className={cx("input-box")} value="dhfma3394@naver.com" disabled />
            </div>
            <div className={cx("contents-input-area-nickname")}>
              <Input
                name="nickname"
                labelName="닉네임"
                type="text"
                control={control}
                placeholder="닉네임을 입력해 주세요"
              />
            </div>
          </div>
        </div>
        <div className={cx("contents-btn")}>
          <ResponseBtn state="accept" ph={0.8}>
            저장
          </ResponseBtn>
        </div>
      </div>
    </form>
  );
}
