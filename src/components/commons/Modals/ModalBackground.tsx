import React from "react";
import styles from "./ModalBackground.module.scss";

export default function ({ onClick }: { onClick: () => void }) {
  return <div className={styles.background} onClick={onClick}></div>;
}
