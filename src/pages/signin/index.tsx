import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Logo from "@/components/commons/Logo/Logo";
import Input from "@/components/commons/Input/Input";
import { SignButton } from "@/components/commons/Buttons/SignButton";

import classNames from "classnames/bind";
import styles from "./signin.module.scss";

const cx = classNames.bind(styles);

export default function Signin() {
  const { control, handleSubmit } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // 입력된 이메일과 비밀번호로 로그인 요청(post)를 보내고
    // 유효하면 /mydashboard로 이동시키고
    // 유효하지 않으면 비밀번호가 일치하지 않는다는 모달창을 띄우도록 수정
  };

  return (
    <div className={cx("container")}>
      <Logo message="오늘도 만나서 반가워요!" />
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
          name="password"
          labelName="비밀번호"
          type="password"
          control={control}
          placeholder="비밀번호를 입력해 주세요"
          rules={{
            required: "비밀번호를 입력해 주세요",
          }}
        />
        <SignButton type="submit" isDisabled={true}>
          로그인
        </SignButton>
      </form>
      <p className={cx("paragraph")}>
        회원이 아니신가요?{" "}
        <Link className={cx("signUp-Link")} href="/signUp">
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
