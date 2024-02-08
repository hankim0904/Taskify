import React from "react";
import classNames from "classnames/bind";
import styles from "@/components/commons/Buttons/SignButton.module.scss";

const cx = classNames.bind(styles);

interface SignButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
  onClick: () => void;
}

export const SignButton = ({ children, type = "button", isDisabled = false, onClick }: SignButtonProps) => {
  return (
    <button className={cx("btn", { disabled: isDisabled })} disabled={isDisabled} type={type} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};
