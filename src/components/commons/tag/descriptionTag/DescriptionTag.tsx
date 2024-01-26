import styles from "./DescriptionTag.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface TagProps {
  tagName: string;
  tagColor: {
    backgroundColor: string;
    color: string;
  };
}

const DescriptionTag = ({ tagName, tagColor }: TagProps) => {
  return (
    <p
      className={cx("tag-item")}
      style={{
        backgroundColor: tagColor.backgroundColor,
        color: tagColor.color,
      }}>
      {tagName}
    </p>
  );
};

export default DescriptionTag;
