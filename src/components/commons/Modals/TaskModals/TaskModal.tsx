import { useForm } from "react-hook-form";
import styles from "./TaskModal.module.scss";
import classNames from "classnames/bind";
import ResponseBtn from "../../Buttons/ResponseButton";
import Input from "../../Input/Input";
import Textarea from "../../Input/Textarea";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import DateInput from "../../Input/DateInput";
import ModalBackground from "../ModalBackground";
import { postCardData, postUploadCardImg, putCardData } from "@/api/postCardData";
import { useRouter } from "next/router";
import formatDate from "./utill/dateChange";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import DescriptionTag from "../../tag/DescriptionTag/DescriptionTag";
import getRandomColor from "../../tag/DescriptionTag/getRandomColor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCardDetailQueryKey, getCardListQueryKey } from "@/components/domains/dashboardid/api/queryKeys";
import { getCardDetail } from "@/components/domains/dashboardid/api/queries";
import getMembers from "@/api/getMembers";
import TTest from "./TTest/TTest";

const cx = classNames.bind(styles);

interface Props {
  isEdit?: boolean;
  onCancel: () => void;
  columnId?: number;
  cardId?: number;
  assigneeUserId?: number;
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
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}

const NULL_IMG = "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image";

export default NiceModal.create(({ columnId, assigneeUserId, cardId, isEdit = false }: Props) => {
  const modal = useModal();
  return (
    <TaskModal
      isEdit={isEdit}
      assigneeUserId={assigneeUserId}
      cardId={cardId}
      onCancel={modal.remove}
      columnId={columnId}
    />
  );
});

//상태 값 dashboardId 로 변환해서 submit

function TaskModal({ isEdit = false, onCancel, assigneeUserId, columnId, cardId }: Props) {
  const router = useRouter();
  const { dashboardid } = router.query;
  const dashboardId = Number(dashboardid);

  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const [tagItem, setTagItem] = useState({ name: "", style: { backgroundColor: "", color: "" } });
  const [tagList, setTagList] = useState<(typeof tagItem)[] | []>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [imgFile, setImgFile] = useState(NULL_IMG);

  const { control, setValue, handleSubmit, formState, getValues, register } = useForm<FormValues | any>({
    mode: "onBlur",
  });

  const { data: cardData } = useQuery({
    queryKey: getCardDetailQueryKey(cardId as number),
    queryFn: () => getCardDetail(cardId as number),
  });

  const { data: memberData } = useQuery({
    queryKey: ["memberList", dashboardid],
    queryFn: () => getMembers(accessToken, dashboardid),
  });

  const members = memberData?.members;

  const initialValues: FormValues = {
    columnId,
    dashboardId,
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault;

    const target = e.target as HTMLInputElement;
    if (target.value.length !== 0 && e.key === "Enter") {
      e.preventDefault;

      submitTagItem();
    }
  };

  const submitTagItem = () => {
    setTagList((prev) => [...prev, tagItem]);
    setTagItem({ name: "", style: { backgroundColor: "", color: "" } });
    setValue("tags", "");
  };

  const handelLoadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
      };
      reader.readAsDataURL(file);
      const formData = new FormData();

      formData.append("image", file);

      const res = await postUploadCardImg(accessToken, columnId, formData);

      return setImgFile(res?.data.imageUrl);
    }
  };

  const ownerId = members?.find((member: Member) => member.isOwner).userId;

  function getAssignee(assignee: string | undefined) {
    if (assignee === undefined) {
      const nextAssigneeId = ownerId;
      return nextAssigneeId;
    } else if (assignee) {
      const assigneeValues = getValues("assignee");
      const member = members.find((member: Member) => member.nickname === assigneeValues);
      const nextAssigneeId = member?.userId;
      return nextAssigneeId;
    }
  }

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
      onCancel;
      queryClient.invalidateQueries({ queryKey: getCardListQueryKey(columnId as number) });
    },
  });

  async function onSubmit(data: FormValues) {
    const postData = data;

    postData.assigneeUserId = getAssignee(data.assignee);
    delete postData.assignee;

    postData.dueDate = data.dueDate ? formatDate(data.dueDate) : formatDate(startDate);

    postData.tags = tagList.flatMap((tag) => JSON.stringify(tag));
    postData.imageUrl = imgFile;

    console.log({ ...postData, ...initialValues });

    isEdit
      ? EditCardMutation.mutate({ ...postData, ...initialValues })
      : addCardMutation.mutate({ ...postData, ...initialValues });
  }

  return (
    <>
      <article className={cx("modal-container")}>
        <h2 className={cx("title")}>{isEdit ? "할 일 수정" : "할 일 생성"}</h2>
        <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
          <div className={cx("dropdown-line")}>
            <TTest />
          </div>
          {/* <div className={cx("dropdown-line")}>
            {isEdit && <DropdownForTaskModal name='state' columnId={columnId} />}
            <DropdownForTaskModal name="assignee"  ownerId={ownerId} members={members} />
          </div> */}

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
            {tagList.map((tagItem, index) => {
              return (
                <li key={index} className={cx("tag")}>
                  <DescriptionTag tagStyle={tagItem.style} tagName={tagItem.name} />
                </li>
              );
            })}
            <input
              type="text"
              {...register("tags")}
              placeholder="입력 후 Enter"
              onChange={(e) => setTagItem({ name: e.target.value, style: getRandomColor(0.3) })}
              onKeyDown={onKeyPress}
              value={tagItem.name}
            />
          </ul>
          <div className={cx("input-file-upload")} onChange={handelLoadImg}>
            <Input isModal={true} type="file" name="imageUrl" labelName="이미지" placeholder="" control={control} />
            {imgFile !== NULL_IMG && (
              <Image className={cx("input-file-img")} src={imgFile} width={80} height={80} alt="카드 이미지 업로드" />
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
