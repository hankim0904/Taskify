import styles from "./DescriptionTag.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface TagProps {
  tagName: string;
  tagStyle: {
    backgroundColor: string;
    color: string;
  };
}

function DescriptionTag({ tagName, tagStyle }: TagProps) {
  return (
    <div
      className={cx("description-tag")}
      style={{
        backgroundColor: tagStyle?.backgroundColor,
        color: tagStyle?.color,
      }}
    >
      <p className={cx("description-tag-item")}>{tagName}</p>
    </div>
  );
}

export default DescriptionTag;
