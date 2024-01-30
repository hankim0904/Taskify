import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Logo from "@/components/commons/logo/Logo";
import Input from "@/components/commons/Input/Input";
import { SignButton } from "@/components/commons/button/SignButton";

import classNames from "classnames/bind";
import styles from "./signUp.module.scss";

const cx = classNames.bind(styles);

export default function SignUp() {
  const { control, handleSubmit } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // 입력된 이메일과 비밀번호로 로그인 요청(post)를 보내고
    // 유효하면 /mydashboard로 이동시키고
    // 유효하지 않으면 비밀번호가 일치하지 않는다는 모달창을 띄우도록 수정
  };

  return (
    <div className={cx("container")}>
      <Logo message="첫 방문을 환영합니다!" />
      <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          labelName="이메일"
          type="email"
          control={control}
          placeholder="이메일을 입력해 주세요"
          rules={{
            required: "이메일을 입력해 주세요",
            pattern: { value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, message: "이메일 형식이어야 합니다" },
          }}
        />
        <Input
          name="text"
          labelName="닉네임"
          type="text"
          control={control}
          placeholder="닉네임을 입력해 주세요"
          rules={{
            required: "닉네임을 입력해 주세요",
            pattern: { value: /^[a-zA-Z0-9_]{1,10}$/, message: "열 자 이하로 작성해 주세요" },
          }}
        />
        <Input
          name="password"
          labelName="비밀번호"
          type="password"
          control={control}
          placeholder="8자 이상 입력해 주세요"
          rules={{
            required: "비밀번호를 입력해 주세요",
            pattern: { value: /^(?=.*[a-zA-Z0-9]).{8,}$/, message: "8자 이상 입력해 주세요" },
          }}
        />
        <Input
          name="password-confirm"
          labelName="비밀번호 확인"
          type="password"
          control={control}
          placeholder="비밀번호를 한번 더 입력해 주세요"
          rules={{
            required: "비밀번호가 일치하지 않습니다",
          }}
        />
        <div className={cx("checkbox-container")}>
          <input className={cx("checkbox")} id="agree" type="checkbox" />
          <label className={cx("checkbox-label")} htmlFor="agree">
            이용약관에 동의합니다
          </label>
        </div>
        <SignButton type="submit" isDisabled={true}>
          가입하기
        </SignButton>
      </form>
      <p className={cx("paragraph")}>
        이미 가입하셨나요?{" "}
        <Link className={cx("signIn-Link")} href="/signIn">
          로그인하기
        </Link>
      </p>
    </div>
  );
}
