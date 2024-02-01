import React from "react";
import classNames from "classnames/bind";
import styles from "@/components/commons/Buttons/MixButton.module.scss";
import Image from "next/image";

const cx = classNames.bind(styles);

interface MixButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const MixButton = ({ children, onClick }: MixButtonProps) => {
  return (
    <button onClick={onClick} className={cx("btn", { isChildren: children })} type="button">
      {children && <span>{children}</span>}
      <div className={cx("icon-container")}>
        <Image src="/assets/images/plus.png" fill alt="plusBtn" />
      </div>
    </button>
  );
};
