import { UseControllerProps, useController } from "react-hook-form";
import styles from "./Input.module.scss";
import classNames from "classnames/bind";
import { KeyboardEvent, SetStateAction, useState } from "react";
import Image from "next/image";

const cx = classNames.bind(styles);

interface InputProps extends UseControllerProps {
  placeholder?: string;
  labelName?: string;
  type: string;
  isModal?: boolean;
  tagItem?: {
    name: string;
    style: {};
  };
}

export default function Input({ placeholder, type, labelName, tagItem, isModal = false, ...props }: InputProps) {
  const { field, fieldState } = useController(props);
  const [inputType, setInputType] = useState(type);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleChangePasswordType = () => {
    const changedType = inputType === "password" ? "text" : "password";
    setInputType(changedType);
  };

  const eyeImg = inputType === "password" ? "/assets/icons/ic-eye-close.svg" : "/assets/icons/ic-eye-open.svg";

  const isError = fieldState.invalid;

  return (
    <div className={cx("input-area", { checkbox: inputType === "checkbox" })}>
      <label htmlFor={props.name} className={cx("label", { modal: isModal })}>
        {labelName}
        {isModal && props.rules?.required && <span className={cx("modalRequired")}> *</span>}
        {inputType === "file" && (
          <div className={cx("lable-file-type")}>
            <Image width={28} height={28} src="/assets/icons/ic-plus-without-background.svg" alt="이미지 추가하기" />
          </div>
        )}
      </label>
      <input
        id={props.name}
        type={inputType}
        className={cx(
          "input",
          { checkbox: inputType === "checkbox" },
          { error: isError },
          { search: type === "search" },
          { file: inputType === "file" }
        )}
        placeholder={placeholder}
        maxLength={16}
        {...field}
        onKeyDown={props.name === "tags" ? handleKeyPress : undefined}
      />

      {inputType !== "checkbox" && <p className={cx("error-message")}>{fieldState.error?.message}</p>}

      {type === "password" ? (
        <Image
          className={cx("eye")}
          width={16}
          height={16}
          src={eyeImg}
          alt="비밀번호 보기"
          onClick={handleChangePasswordType}
        />
      ) : null}
      {type === "search" ? (
        <Image
          src="/assets/icons/ic-magnifier.svg"
          className={cx("searchIcon")}
          width={24}
          height={24}
          alt="검색하기"
        />
      ) : null}
    </div>
  );
}
