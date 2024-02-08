import React from "react";
import styles from "./LodingSpinner.module.scss";

export default function LodingSpinner() {
  return (
    <div className={styles.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
