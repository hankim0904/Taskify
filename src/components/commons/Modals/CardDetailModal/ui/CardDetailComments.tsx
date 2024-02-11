import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getMe } from "@/components/domains/dashboardid/api/queries";
import { getMeQueryKey } from "@/components/domains/dashboardid/api/queryKeys";
import { getCommentsQueryKey } from "@/components/domains/dashboardid/api/queryKeys";
import { delelteComments } from "@/components/domains/dashboardid/api/queries";
import formatDateDot from "../utils/dateDotChange";
import { EditStore } from "../CardDetailModal";

import classNames from "classnames/bind";
import styles from "./CardDetailComments.module.scss";

const cx = classNames.bind(styles);

interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

interface CardDetailCommentsProps {
  commentsData: CommentData[];
  cardId: number;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditStore: React.Dispatch<React.SetStateAction<EditStore>>;
}

export default function CardDetailComments({
  commentsData,
  cardId,
  setEditing,
  setEditStore,
}: CardDetailCommentsProps) {
  const { setValue } = useFormContext();
  const { data: meData } = useQuery({ queryKey: getMeQueryKey(), queryFn: () => getMe() });

  const userId = meData?.id;

  const queryClient = useQueryClient();

  const mutationSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: getCommentsQueryKey(cardId),
    });
  };

  const deleteCommentsMutation = useMutation({
    mutationFn: (commentId: number) => delelteComments(commentId),
    onSuccess: mutationSuccess,
  });

  const handleDeleteClick = (commentId: number) => {
    deleteCommentsMutation.mutate(commentId);
  };

  if (!commentsData) {
    return null;
  }

  return (
    <>
      <div className={cx("comments-container")}>
        {commentsData.map((comment) => (
          <div key={comment.id} className={cx("container-1")}>
            {comment.author.profileImageUrl && (
              <Image
                className={cx("profileImage")}
                src={comment.author.profileImageUrl}
                alt="댓글 작성자 이미지"
                width={34}
                height={34}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            )}
            <div className={cx("container-2")}>
              <div className={cx("container-3")}>
                <div className={cx("nickname")}>{comment.author.nickname}</div>
                <div className={cx("createdAt")}>{formatDateDot(comment.createdAt)}</div>
              </div>
              <div className={cx("content")}>{comment.content}</div>
              {userId === comment.author.id && (
                <div className={cx("container-4")}>
                  <button
                    className={cx("edit")}
                    onClick={() => {
                      setEditing(true);
                      setEditStore({ id: comment.id, content: comment.content });
                      setValue("comment-Textarea", comment.content);
                    }}
                  >
                    수정
                  </button>
                  <button className={cx("delete")} onClick={() => handleDeleteClick(comment.id)}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
