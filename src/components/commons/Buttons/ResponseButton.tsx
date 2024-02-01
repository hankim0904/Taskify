import React from "react";
import classNames from "classnames/bind";
import styles from "@/components/commons/Buttons/ResponseButton.module.scss";

interface Props {
  children: React.ReactNode;
  state?: string | number;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  ph?: number;
  fs?: number;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

export default function ResponseBtn({ children, state, type = "button", disabled = false, ph, fs, onClick }: Props) {
  return (
    <button
      className={cx(`${state}`)}
      type={type}
      disabled={disabled}
      style={{ paddingBlock: `${ph}rem`, fontSize: `${fs}rem` }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
