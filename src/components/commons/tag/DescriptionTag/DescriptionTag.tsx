import styles from "./DescriptionTag.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface TagProps {
  tagName: string;

  tagStyle: {
    backgroundColor: string;
    color: string;
  };
  id?: string;
}

function DescriptionTag({ tagName, tagStyle, id }: TagProps) {
  return (
    <div
      id={id}
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
