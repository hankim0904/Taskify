import React from "react";
import classNames from "classnames/bind";
import styles from "@/components/commons/Button/SignButton.module.scss";

const cx = classNames.bind(styles);

interface SignButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
}

export const SignButton = ({ children, type = "button", isDisabled = false }: SignButtonProps) => {
  return (
    <button className={cx("btn", { disabled: isDisabled })} disabled={isDisabled} type={type}>
      <span>{children}</span>
    </button>
  );
};
