import React, { ReactNode } from "react";
import styles from "./ModalBackground.module.scss";

export default function ({ children }: { children: ReactNode }) {
  return <div className={styles.background}>{children}</div>;
}
