import { useState, MouseEvent } from "react";
import styles from "./colorList.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const cx = classNames.bind(styles);

const colors = ["green", "purple", "orange", "blue", "pink"];

interface Props {
  setColor: () => void;
  beforeColor: string;
}

export default function ColorList({ setColor, beforeColor }: any) {
  const [selectedColor, setSelectedColor] = useState<string>(beforeColor);

  function handleSelectColor(color: string) {
    if (selectedColor === color) {
      setSelectedColor("");
      setColor();
    } else {
      setSelectedColor(color);
      setColor(color);
    }
  }

  return (
    <ul className={cx("color-list")}>
      {colors.map((color) => (
        <li onClick={() => handleSelectColor(color)} id={color} className={cx("color-btn", color)} key={color}>
          {selectedColor === color && <Image src="/assets/icons/ic-check.svg" fill alt="선택" />}
        </li>
      ))}
    </ul>
  );
}
