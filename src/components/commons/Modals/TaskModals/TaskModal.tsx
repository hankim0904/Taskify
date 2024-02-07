import { useForm } from "react-hook-form";
import styles from "./TaskModal.module.scss";
import classNames from "classnames/bind";
import ResponseBtn from "../../Buttons/ResponseButton";
import Input from "../../Input/Input";
import Textarea from "../../Input/Textarea";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import Dropdown from "./DropdownForTaskModals/DropdownForTaskModals";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import DateInput from "../../Input/DateInput";
import ModalBackground from "../ModalBackground";
import { postCardData, postUploadCardImg, putCardData } from "@/api/postCardData";
import { useRouter } from "next/router";
import formatDate, { convertToUTCString } from "./utill/dateChange";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import DescriptionTag from "../../tag/DescriptionTag/DescriptionTag";
import getRandomColor from "../../tag/DescriptionTag/getRandomColor";
import rgbaStringToHex from "@/utils/rgbaToHex";
import { useQuery } from "@tanstack/react-query";
import { getCardDetailQueryKey } from "@/components/domains/dashboardid/api/queryKeys";
import { getCardDetail } from "@/components/domains/dashboardid/api/queries";
import rgbaToHex from "@/utils/rgbaToHex";
import getMembers from "@/api/getMembers";

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
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}

export default NiceModal.create(({ columnId, isEdit = false }: Props) => {
  const modal = useModal();
  return <TaskModal isEdit={isEdit} onCancel={modal.remove} columnId={columnId} />;
});

//상태 값 dashboardId 로 변환해서 submit

function TaskModal({ isEdit = false, onCancel, columnId, cardId }: Props) {
  const router = useRouter();
  const { dashboardid } = router.query;

  const { accessToken } = useAuth();

  const [tagItem, setTagItem] = useState({ name: "", style: { backgroundColor: "", color: "" } });
  const [tagList, setTagList] = useState<(typeof tagItem)[] | []>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [imgFile, setImgFile] = useState("");

  const { control, setValue, handleSubmit, formState, getValues, watch } = useForm<FormValues | any>({
    mode: "onBlur",
  });
  // const { data: cardData } = useQuery({
  //   queryKey: getCardDetailQueryKey(cardid),
  //   queryFn: (cardid) => getCardDetail(cardid),
  // });
  //프롭으로 받아도 될 것 같음

  const { data: memberData } = useQuery({
    queryKey: ["memberList", dashboardid],
    queryFn: () => getMembers(accessToken, dashboardid),
  });

  const members = memberData?.members;

  const initialValues: FormValues = {
    columnId,
    dashboardId: Number(dashboardid),
  };

  // if (isEdit === true) {
  //   initialValues = { ...card };
  // }

  const onKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.id !== "tags" || e.key !== "Enter") return;
    if (target.value.length !== 0 && e.key === "Enter") {
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

  async function onSubmit(data: FormValues) {
    const postData = data;

    postData.assigneeUserId = getAssignee(data.assignee);
    delete postData.assignee;

    postData.dueDate = data.dueDate ? formatDate(data.dueDate) : formatDate(startDate);

    postData.tags = tagList.flatMap((tag) => JSON.stringify(tag));
    postData.imageUrl = imgFile;

    const res = isEdit
      ? await putCardData(cardId, { postData, ...initialValues })
      : await postCardData({ ...postData, ...initialValues });

    res.status === 201 && onCancel();
  }

  return (
    <>
      <article className={cx("modal-container")}>
        <h2 className={cx("title")}>{isEdit ? "할 일 수정" : "할 일 생성"}</h2>
        <form className={cx("form")} onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => onKeyPress(e)}>
          <div className={cx("dropdown-line")}>
            {isEdit && <Dropdown name="column" columnId={columnId} setValue={setValue} control={control} />}
            <Dropdown name="assignee" members={members} setValue={setValue} control={control} />
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
          <ul className={cx("tag-list")}>
            {tagList.map((tagItem, index) => {
              return (
                <li key={index} className={cx("tag")}>
                  <DescriptionTag tagStyle={tagItem.style} tagName={tagItem.name} />
                </li>
              );
            })}
            <Input
              isModal={true}
              type="text"
              name="tags"
              labelName="태그"
              placeholder="입력 후 Enter"
              control={control}
              tagItem={tagItem}
              rules={{
                onChange: (e) => setTagItem({ name: e.target.value, style: getRandomColor() }),
              }}
            />
          </ul>
          <div className={cx("input-file-upload")} onChange={handelLoadImg}>
            <Input isModal={true} type="file" name="imageUrl" labelName="이미지" placeholder="" control={control} />
            {imgFile && (
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
