import { useForm } from "react-hook-form";
import styles from "./TaskModal.module.scss";
import classNames from "classnames/bind";
import ResponseBtn from "../../Buttons/ResponseButton";
import Input from "../../Input/Input";
import Textarea from "../../Input/Textarea";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import DateInput from "../../Input/DateInput";
import ModalBackground from "../ModalBackground";
import { postCardData, postUploadCardImg, putCardData } from "@/api/postCardData";
import { useRouter } from "next/router";
import PostformatDate from "./utill/dateChange";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import DescriptionTag from "../../tag/DescriptionTag/DescriptionTag";
import getRandomColor from "../../tag/DescriptionTag/getRandomColor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCardDetailQueryKey,
  getCardListQueryKey,
  getColumnListQueryKey,
} from "@/components/domains/dashboardid/api/queryKeys";
import { getCardDetail } from "@/components/domains/dashboardid/api/queries";
import getMembers from "@/api/getMembers";
import TaskModalDropDown from "./TaskModalDropDown/TaskModalDropDown";
import isValidFile from "./utill/isVaildFile";
import { ColumnListData } from "@/components/domains/dashboardid/api/type";

const cx = classNames.bind(styles);

interface Props {
  isEdit?: boolean;
  onCancel: () => void;
  columnId?: number;
  cardId?: number;
}

interface Member {
  id: number;
  nickname: string;
  profileImageUrl: string;
  userId: number;
  isOwner: boolean;
}
interface FormValues {
  assignee?: string;
  assigneeUserId?: number;
  dashboardId?: number;
  columnId?: number;
  title?: string;
  description?: string;
  dueDate?: string | Date;
  tags?: string | string[];
  imageUrl?: string;
}

const NULL_IMG = "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image";

export default NiceModal.create(({ columnId, cardId, isEdit = false }: Props) => {
  const modal = useModal();
  return <TaskModal isEdit={isEdit} cardId={cardId} onCancel={modal.remove} columnId={columnId} />;
});

function TaskModal({ isEdit = false, onCancel, columnId, cardId }: Props) {
  const router = useRouter();
  const { dashboardid } = router.query;
  const dashboardId = Number(dashboardid);

  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const [tagItem, setTagItem] = useState({ name: "", style: { backgroundColor: "", color: "" } });
  const [tagList, setTagList] = useState<(typeof tagItem)[] | []>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [imgFile, setImgFile] = useState(NULL_IMG);
  const [selectMemberId, setSelectMemberId] = useState(0);
  const [selectColumnId, setSelectColumnId] = useState(columnId);

  const { control, setValue, handleSubmit, formState, register } = useForm<FormValues>({
    mode: "onBlur",
  });

  const initialValues: FormValues = {
    columnId: selectColumnId,
    dashboardId,
  };

  const { data: cardData } = useQuery({
    queryKey: getCardDetailQueryKey(cardId as number),
    queryFn: () => getCardDetail(cardId as number),
    enabled: isEdit,
  });

  const { data: columnListData } = useQuery<ColumnListData>({
    queryKey: getColumnListQueryKey(dashboardid),
    enabled: isEdit,
  });
  const columnList = columnListData?.data ?? [];

  const { data: memberData } = useQuery({
    queryKey: ["memberList", dashboardid],
    queryFn: () => getMembers(accessToken, dashboardid),
  });

  const members = memberData?.members;
  useEffect(() => {
    const host = members.find((member: Member) => member.isOwner);
    setSelectMemberId(host?.userId);
  }, [members]);

  useEffect(() => {
    if (isEdit && cardData !== undefined) {
      setValue("title", cardData.title);
      setValue("description", cardData.description);
      setValue("dueDate", new Date(cardData.dueDate));
      setSelectColumnId(cardData.columnId);
      setSelectMemberId(cardData.assignee.id);
      const prevTags = cardData.tags.map((tag: string) => JSON.parse(tag));
      setTagList(prevTags);
      setImgFile(cardData.imageUrl);
    }
  }, [isEdit, cardData]);

  const handelSubmitTagList = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.preventDefault();

    const target = e.target as HTMLInputElement;
    if (target.value.length !== 0 && e.key === "Enter") {
      HandelAddTagList();
    }
  };

  const HandelAddTagList = () => {
    const isDuplicate = tagList.some((tag) => tag.name === tagItem.name);

    if (!isDuplicate) {
      setTagList((prev) => [...prev, tagItem]);
    }

    setTagItem({ name: "", style: { backgroundColor: "", color: "" } });
    setValue("tags", "");
  };

  const handleDeleteTagClick = (tagId: string) => {
    setTagList((prevTagList) => prevTagList.filter((tag) => tag.name !== tagId));
  };

  const handelUpLoadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    isValidFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      const res = await postUploadCardImg(accessToken, columnId, formData);

      if (res?.status !== 201) return;

      return setImgFile(res?.data.imageUrl);
    }
  };

  const addCardMutation = useMutation({
    mutationFn: (postdata: FormValues) => postCardData(postdata),
    onSuccess: () => {
      onCancel();
      queryClient.invalidateQueries({ queryKey: getCardListQueryKey(columnId as number) });
    },
  });

  const EditCardMutation = useMutation({
    mutationFn: (postdata: FormValues) => putCardData(cardId, postdata),
    onSuccess: () => {
      onCancel();
      queryClient.invalidateQueries({ queryKey: getCardListQueryKey(columnId as number) });
      queryClient.invalidateQueries({ queryKey: getCardListQueryKey(selectColumnId as number) });
      queryClient.invalidateQueries({ queryKey: getCardDetailQueryKey(cardId as number) });
    },
  });

  async function onSubmit(data: FormValues) {
    const postData = data;
    postData.assigneeUserId = selectMemberId;

    postData.dueDate = data.dueDate ? PostformatDate(data.dueDate) : PostformatDate(startDate);

    postData.tags = tagList.flatMap((tag) => JSON.stringify(tag));
    postData.imageUrl = imgFile;

    isEdit
      ? EditCardMutation.mutate({ ...postData, ...initialValues })
      : addCardMutation.mutate({ ...postData, ...initialValues });
  }

  return (
    <>
      <article className={cx("modal-container")}>
        <h2 className={cx("title")}>{isEdit ? "할 일 수정" : "할 일 생성"}</h2>
        <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
          <div className={cx("dropdown-line", { add: !isEdit })}>
            {isEdit && (
              <TaskModalDropDown
                columnId={columnId}
                columnList={columnList}
                selectColumnId={selectColumnId}
                setSelectColumnId={setSelectColumnId}
              />
            )}
            <TaskModalDropDown
              members={members}
              setSelectMemberId={setSelectMemberId}
              selectMemberId={selectMemberId}
            />
          </div>
          <Input
            isModal={true}
            type="text"
            name="title"
            labelName="제목"
            placeholder="제목을 입력해 주세요"
            control={control}
            rules={{ required: "제목을 입력해 주세요" }}
          />
          <Textarea
            isModal={true}
            name="description"
            labelName="설명"
            placeholder="설명을 입력해 주세요"
            control={control}
            rules={{ required: "설명을 입력해 주세요" }}
          />
          <DateInput labelName="마감일" startDate={startDate} control={control} name="dueDate" />
          <label className={cx("tag-list-label")}>태그</label>
          <ul className={cx("tag-list")}>
            {tagList.map((tag, index) => {
              return (
                <li key={index} className={cx("tag")} onClick={() => handleDeleteTagClick(tag.name)}>
                  <DescriptionTag id={tag.name} tagStyle={tag.style} tagName={tag.name} />
                </li>
              );
            })}
            <input
              type="text"
              {...register("tags")}
              placeholder="입력 후 Enter"
              onChange={(e) => setTagItem({ name: e.target.value, style: getRandomColor(0.15) })}
              onKeyDown={handelSubmitTagList}
              value={tagItem.name}
            />
          </ul>
          <div className={cx("input-file-upload")} onChange={handelUpLoadImg}>
            <Input isModal={true} type="file" name="imageUrl" labelName="이미지" placeholder="" control={control} />
            {imgFile !== NULL_IMG && (
              <Image

                className={cx("input-file-img", { existed: imgFile === cardData?.imageUrl })}
                src={imgFile}
                width={80}
                height={80}
                alt="카드 이미지 업로드"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div className={cx("btn-line", { edit: isEdit })}>
            <ResponseBtn type="button" onClick={onCancel} state="cancel" ph={1.4} fs={1.6}>
              취소
            </ResponseBtn>
            <ResponseBtn type="submit" disabled={!formState.isValid} state="accept" ph={1.4} fs={1.6}>
              {isEdit ? "수정" : "생성"}
            </ResponseBtn>
          </div>
        </form>
      </article>
      <ModalBackground onClick={onCancel} />
    </>
  );
}
