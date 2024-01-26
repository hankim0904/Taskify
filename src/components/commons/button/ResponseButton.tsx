import React from "react";
import classNames from "classnames/bind";
import styles from "@/components/commons/Button/ResponseButton.module.scss";

interface Props {
  children: React.ReactNode;
  state?: string | number;
  pw?: number;
  ph?: number;
  fs?: number;
}

const cx = classNames.bind(styles);

export default function ResponseBtn({ children, state, ph, pw, fs }: Props) {
  return (
    <button className={cx(`${state}`)} type="button" style={{ padding: `${ph}rem ${pw}rem`, fontSize: `${fs}rem` }}>
      {children}
    </button>
  );
}
