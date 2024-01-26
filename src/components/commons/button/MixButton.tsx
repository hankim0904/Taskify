import React from "react";
import classNames from "classnames/bind";
import styles from "@/components/commons/Button/MixButton.module.scss";
import Image from "next/image";

const cx = classNames.bind(styles);

interface MixButtonProps {
  children?: React.ReactNode;
}

export const MixButton = ({ children }: MixButtonProps) => {
  return (
    <button className={cx("btn", { isChildren: children })} type="button">
      {children && <span>{children}</span>}
      <div className={cx("icon-container")}>
        <Image src="/assets/images/plus.png" fill alt="plusBtn" />
      </div>
    </button>
  );
};
