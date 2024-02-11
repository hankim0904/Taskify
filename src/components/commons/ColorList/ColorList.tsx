import { useEffect, useState } from "react";
import styles from "./ColorList.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const cx = classNames.bind(styles);

const colors = ["green", "purple", "orange", "blue", "pink"];

interface Props {
  setColor: (color: string) => void;
  beforeColor?: string;
}

export default function ColorList({ setColor, beforeColor }: Props) {
  const [selectedColor, setSelectedColor] = useState<string>("");

  function handleSelectColor(color: string) {
    if (selectedColor === color) {
      setSelectedColor("");
      setColor("");
    } else {
      setSelectedColor(color);
      setColor(color);
    }
  }
  useEffect(() => {
    if (beforeColor) {
      setSelectedColor(beforeColor);
    }
  }, [beforeColor]);

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
