import { useState } from "react";
import { useRouter } from "next/router";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getColumnList, deleteColumn, putColumnName, postColumn } from "@/components/domains/dashboardid/api/queries";
import { getColumnListQueryKey } from "@/components/domains/dashboardid/api/queryKeys";

import styles from "./ColumnModal.module.scss";
import classNames from "classnames/bind";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../../Input/Input";
import ResponseBtn from "../../Buttons/ResponseButton";
import ModalBackground from "../ModalBackground";
import { ChangedName, NewColumn } from "@/components/domains/dashboardid/api/type";

const cx = classNames.bind(styles);

interface Props {
  isEdit?: boolean;
  columnId?: number;
  onCancel: () => void;
}

export default NiceModal.create(({ isEdit = false, columnId }: Props) => {
  const modal = useModal();
  return <ColumnModal isEdit={isEdit} columnId={columnId} onCancel={modal.remove} />;
});

function ColumnModal({ isEdit, columnId, onCancel }: Props) {
  const router = useRouter();
  const dashboardId = router.query.dashboardid;
  const queryClient = useQueryClient();
  const [isSureDelete, setIsSureDelete] = useState(false);
  const { control, handleSubmit, formState } = useForm<any>({
    mode: "all",
    defaultValues: { columnName: "" },
  });

  const { data: columnListData } = useQuery({
    queryKey: getColumnListQueryKey(dashboardId),
    queryFn: () => getColumnList(dashboardId),
  });
  const columnList = columnListData?.data || [];

  const mutationSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: getColumnListQueryKey(dashboardId),
    });
    onCancel();
  };

  const postColumnMutation = useMutation({
    mutationFn: (newColumn: NewColumn) => postColumn(newColumn),
    onSuccess: mutationSuccess,
  });

  const deleteColumnMutation = useMutation({
    mutationFn: () => deleteColumn(columnId),
    onSuccess: mutationSuccess,
  });

  const putColumnNameMutation = useMutation({
    mutationFn: (changedName: ChangedName) => putColumnName(columnId, changedName),
    onSuccess: mutationSuccess,
  });

  function handleDeleteColumn() {
    deleteColumnMutation.mutate();
  }

  function handelonClickDelete() {
    setIsSureDelete((prev) => !prev);
  }

  const handleOnSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isEdit) {
      const changedName = { title: data.columnName };
      putColumnNameMutation.mutate(changedName);
    } else {
      const newColumn = {
        title: data.columnName,
        dashboardId: Number(dashboardId),
      };
      postColumnMutation.mutate(newColumn);
    }
  };

  return !isSureDelete ? (
    <>
      <article className={cx("modal-container")}>
        <h2 className={cx("title")}>{isEdit ? "칼럼 관리" : "칼럼 생성"}</h2>
        <form className={cx("form")} onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            isModal={true}
            type="text"
            name="columnName"
            labelName="이름"
            placeholder="새로운 프로젝트"
            control={control}
            maxLength={16}
            rules={{
              required: "프로젝트 이름을 입력해 주세요",
              validate: {
                limitColumnNumber: () => {
                  if (columnList.length >= 10 && !isEdit) return "컬럼은 최대 10개까지 생성할 수 있습니다";
                  return true;
                },
                alreadyExist: (value) => {
                  const isDuplicatedColumnName = columnList.some((column: { title: string }) => column.title === value);
                  if (isDuplicatedColumnName) return "중복된 컬럼 이름입니다";
                  return true;
                },
                limitLetterNumber: (value) => {
                  if (value.length > 15)
                    return `컬럼 이름은 15자를 초과하지 않도록 입력해 주세요 (현재 글자수: ${value.length}/15)`;
                  return true;
                },
              },
            }}
          />
          <div className={cx("btn-line")}>
            <ResponseBtn onClick={onCancel} state="cancel" ph={1.4} fs={1.6}>
              취소
            </ResponseBtn>
            <ResponseBtn type="submit" disabled={!formState.isValid} state="accept" ph={1.4} fs={1.6}>
              {isEdit ? "변경" : "생성"}
            </ResponseBtn>
          </div>
        </form>
        {isEdit && (
          <button type="button" onClick={handelonClickDelete} className={cx("delete-column-btn")}>
            삭제하기
          </button>
        )}
      </article>
      <ModalBackground onClick={onCancel} />
    </>
  ) : (
    <>
      <article className={cx("modal-container")}>
        <h2 className={cx("delete-message")}>칼럼의 모든 카드가 삭제됩니다</h2>
        <div className={cx("btn-line")}>
          <ResponseBtn onClick={handelonClickDelete} state="cancel" ph={1.4} fs={1.6}>
            취소
          </ResponseBtn>
          <ResponseBtn type="submit" state="accept" ph={1.4} fs={1.6} onClick={handleDeleteColumn}>
            삭제
          </ResponseBtn>
        </div>
      </article>
      <ModalBackground onClick={onCancel} />
    </>
  );
}
