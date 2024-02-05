import classNames from "classnames/bind";
import styles from "./CardDetailContent.module.scss";

import DescriptionTag from "@/components/commons/tag/DescriptionTag/DescriptionTag";
import ProgressTag from "@/components/commons/tag/ProgressTag/ProgressTag";
import Image from "next/image";

const cx = classNames.bind(styles);

interface Tag {
  name: string;
  style: {
    backgroundColor: string;
    color: string;
  };
}

interface CardDetailContentProps {
  columnTitle: string;
  tags: Tag[];
  description: string;
  imageUrl: string;
}

export default function CardDetailContent({ columnTitle, tags, description, imageUrl }: CardDetailContentProps) {
  return (
    <main className={cx("main")}>
      <div className={cx("main-tags")}>
        <span className={cx("main-tags-progress")}>
          <ProgressTag>{columnTitle}</ProgressTag>
        </span>
        {tags.length !== 0 && <div className={cx("main-tags-line")} />}
        <span className={cx("main-tags-description")}>
          {tags.map((tag, i) => (
            <span>
              <DescriptionTag key={i} tagName={tag.name} tagStyle={tag.style} />
            </span>
          ))}
        </span>
      </div>
      <div className={cx("main-description")}>
        <p>{description}</p>
      </div>
      <div className={cx("main-image")}>
        <Image fill src={imageUrl} alt="카드 이미지" style={{ objectFit: "cover" }} />
      </div>
    </main>
  );
}
