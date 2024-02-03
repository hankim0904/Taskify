import { useEffect } from "react";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Input from "@/components/commons/Input/Input";
import { SignButton } from "@/components/commons/Buttons/SignButton";
import { axiosInstance } from "@/api/axiosInstance";

import classNames from "classnames/bind";
import styles from "./Signup.module.scss";

const cx = classNames.bind(styles);

export default function Signup() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    setError,
    clearErrors,
  } = useForm({ mode: "onBlur" });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const response = await axiosInstance.post("users", {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    });
    if (response.status === 201) {
      console.log("성공");
      // 모달창을 띄우고 모달창의 확인 버튼을 눌렀을 시 로그인 페이지로 이동시키도록 수정
      router.push("signin");
    } else if (response.status === 409) {
      console.log("중복 이메일");
    }
  };

  useEffect(() => {
    if (watch("password") !== watch("password-confirm") && watch("password-confirm")) {
      setError("password-confirm", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("password-confirm");
    }
  }, [watch("password"), watch("password-confirm")]);

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
          name="nickname"
          labelName="닉네임"
          type="text"
          control={control}
          placeholder="닉네임을 입력해 주세요"
          rules={{
            required: "닉네임을 입력해 주세요.",
            maxLength: { value: 10, message: "열 자 이하로 작성해 주세요." },
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
        <Input
          name="password-confirm"
          labelName="비밀번호 확인"
          type="password"
          control={control}
          placeholder="비밀번호를 한번 더 입력해 주세요"
          rules={{
            required: "비밀번호를 한번 더 입력해 주세요.",
            validate: (value) => (value === watch("password") ? true : "비밀번호가 일치하지 않습니다."),
          }}
        />
        <Input
          name="agree"
          labelName="이용약관에 동의합니다."
          type="checkbox"
          control={control}
          rules={{ required: true }}
        />
        <SignButton type="submit" isDisabled={!isValid} onClick={handleSubmit(onSubmit)}>
          가입하기
        </SignButton>
      </form>
      <p className={cx("paragraph")}>
        이미 가입하셨나요?{" "}
        <Link className={cx("signIn-Link")} href="/signin">
          로그인하기
        </Link>
      </p>
    </>
  );
}
