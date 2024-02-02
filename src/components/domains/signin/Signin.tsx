import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Input from "@/components/commons/Input/Input";
import { SignButton } from "@/components/commons/Buttons/SignButton";
import { axiosInstance } from "@/api/axiosInstance";

import classNames from "classnames/bind";
import styles from "./Signin.module.scss";

const cx = classNames.bind(styles);

export default function Signin() {
  const { login } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const response = await axiosInstance.post("auth/login", {
      email: data.email,
      password: data.password,
    });
    if (response.status === 201) {
      console.log("성공");
      console.log(response);
      login(response.data.accessToken);
      router.push("mydashboard");
    } else if (response.status === 404) {
      console.log("실패");
    }
  };

  return (
    <>
      <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          labelName="이메일"
          type="email"
          control={control}
          placeholder="이메일을 입력해 주세요"
          rules={{
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "이메일 형식으로 작성해 주세요.",
            },
          }}
        />
        <Input
          name="password"
          labelName="비밀번호"
          type="password"
          control={control}
          placeholder="8자 이상 입력해 주세요"
          rules={{
            required: "비밀번호를 입력해 주세요.",
            minLength: { value: 8, message: "8자 이상 입력해 주세요." },
          }}
        />
        <SignButton type="submit" isDisabled={!isValid} onClick={handleSubmit(onSubmit)}>
          로그인
        </SignButton>
      </form>
      <p className={cx("paragraph")}>
        회원이 아니신가요?{" "}
        <Link className={cx("signUp-Link")} href="/signup">
          회원가입하기
        </Link>
      </p>
    </>
  );
}
