import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Textarea from "@/components/commons/Input/Textarea";
import ResponseButton from "@/components/commons/Buttons/ResponseButton";
import { putComments, postComments } from "@/components/domains/dashboardid/api/queries";
import { getCommentsQueryKey } from "@/components/domains/dashboardid/api/queryKeys";
import { EditedComments, NewComments } from "@/components/domains/dashboardid/api/type";
import { EditStore } from "../CardDetailModal";

import classNames from "classnames/bind";
import styles from "./CardDetailTextarea.module.scss";

const cx = classNames.bind(styles);

interface CardDetailTextareaProps {
  dashboardId: number;
  columnId: number;
  cardId: number;
  editing: boolean;
  editStore: EditStore;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardDetailTextarea({
  dashboardId,
  columnId,
  cardId,
  editing,
  editStore,
  setEditing,
}: CardDetailTextareaProps) {
  const { control, handleSubmit, formState, setValue } = useFormContext();
  const queryClient = useQueryClient();

  const mutationSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: getCommentsQueryKey(cardId),
    });
  };

  const putCommentsMutation = useMutation({
    mutationFn: (editedComments: EditedComments) => putComments(editedComments),
    onSuccess: mutationSuccess,
  });

  const postCommentsMutation = useMutation({
    mutationFn: (newCommnets: NewComments) => postComments(newCommnets),
    onSuccess: mutationSuccess,
  });

  const handleOnSubmitPut: SubmitHandler<FieldValues> = (data) => {
    const editedComments = {
      content: data["comment-Textarea"],
      commentId: editStore.id,
    };

    putCommentsMutation.mutate(editedComments);
    setEditing(false);
    setValue("comment-Textarea", "");
  };

  const handleOnSubmitPost: SubmitHandler<FieldValues> = (data) => {
    const newComments = {
      content: data["comment-Textarea"],
      cardId: cardId,
      columnId: columnId,
      dashboardId: dashboardId,
    };

    postCommentsMutation.mutate(newComments);
    setValue("comment-Textarea", "");
  };

  return (
    <>
      {editing ? (
        <form className={cx("form")} onSubmit={handleSubmit(handleOnSubmitPut)}>
          <Textarea
            name="comment-Textarea"
            labelName="댓글수정"
            placeholder="댓글 수정하기"
            isModal={false}
            control={control}
            rules={{ required: true }}
          />
          <ResponseButton type="submit" disabled={!formState.isValid} state="reject">
            수정
          </ResponseButton>
        </form>
      ) : (
        <form className={cx("form")} onSubmit={handleSubmit(handleOnSubmitPost)}>
          <Textarea
            name="comment-Textarea"
            labelName="댓글"
            placeholder="댓글 작성하기"
            isModal={false}
            control={control}
            rules={{ required: true }}
          />
          <ResponseButton type="submit" disabled={!formState.isValid} state="reject">
            입력
          </ResponseButton>
        </form>
      )}
    </>
  );
}
