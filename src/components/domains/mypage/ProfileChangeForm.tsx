import Image from "next/image";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "@/components/commons/Input/Input";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import styles from "./ProfileChangeForm.module.scss";
import classNames from "classnames/bind";
import getUsersMe from "@/api/getUsersMe";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import putChangeUserProfile from "@/api/putChangeUserProfile";
import { axiosCSRInstance } from "@/api/axiosCSRInstance";
import { useAuth } from "@/contexts/AuthContext";
import extractFirstLetter from "@/utils/extractFirstLetter";

import SignModal from "@/components/commons/Modals/SignModal/SignModal";
import NiceModal from "@ebay/nice-modal-react";

const cx = classNames.bind(styles);

export default function ProfileChangeForm() {
  const { data: userMeData } = useQuery({
    queryKey: ["userMe"],
    queryFn: () => getUsersMe(accessToken),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: "",
    },
  });

  const [profileImageUrl, setProfileImageUrl] = useState(userMeData?.profileImageUrl);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>("");
  const [showBasicProfile, setShowBasicProfile] = useState(false);

  const { accessToken } = useAuth();

  const showModal = (text: string) => {
    NiceModal.show(SignModal, { text });
  };

  useEffect(() => {
    if (userMeData) {
      setValue("nickname", userMeData.nickname);
    }
  }, [userMeData]);

  const onSubmit: SubmitHandler<FieldValues> = data => {
    
    if (profileImageUrl === "" || showBasicProfile) {
      putChangeUserProfile(data.nickname, null, accessToken);
    } else {
      putChangeUserProfile(data.nickname, profileImageUrl, accessToken);
    }
  };

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    const extension = file?.name.split(".").pop();

    const MAX_SIZE = 1024 * 1024 * 4;

    if (!extension || !["jpg", "jpeg", "png", "gif"].includes(extension.toLowerCase())) {
      showModal("이미지 파일을 선택해주세요.");
      return false;
    }

    if (!file || file.size > MAX_SIZE) {
      showModal("4MB 이하 파일을 선택해 주세요.");
      return false;
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
        setShowBasicProfile(false);
      };

      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axiosCSRInstance.post("users/me/image", formData, {
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
        });

        setProfileImageUrl(res.data.profileImageUrl);
      } catch (e) {
        throw new Error(`${e}`);
      }
    }
  }

  function handleChangeDefaultImage() {
    setShowBasicProfile(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cx("mypage-container-profile")}>
        <div className={cx("title")}>프로필</div>
        <div className={cx("contents")}>
          <div className={cx("contents-upload-area")}>
            {!showBasicProfile ? (
              <div className={cx("contents-upload-image")}>
                {userMeData?.profileImageUrl ? (
                  <Image fill src={userMeData?.profileImageUrl} alt="현재 이미지" style={{ objectFit: "cover" }} />
                ) : (
                  <div className={cx("contents-basic-image")}>
                    <span className={cx("nickname")}>{extractFirstLetter(userMeData?.nickname)}</span>
                  </div>
                )}
                {previewImage && typeof previewImage === "string" && (
                  <Image fill src={previewImage} alt="미리 보기" style={{ objectFit: "cover" }} />
                )}
                <label htmlFor="upload-image">
                  <div className={cx("lable-file-type")}>
                    <Image
                      width={28}
                      height={28}
                      src="/assets/icons/ic-plus-without-background.svg"
                      alt="이미지 추가하기"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </label>

                <div style={{ display: "none" }} onChange={handleUploadImage}>
                  <Input name="upload-image" labelName="" type="file" control={control as any} />
                </div>
              </div>
            ) : (
              <div className={cx("contents-basic-image")}>
                <span className={cx("nickname")}>{extractFirstLetter(userMeData?.nickname)}</span>
                <label htmlFor="basic-to-image">
                  <div className={cx("lable-file-type")}>
                    <Image
                      width={28}
                      height={28}
                      src="/assets/icons/ic-plus-without-background.svg"
                      alt="이미지 추가하기"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ display: "none" }} onChange={handleUploadImage}>
                    <Input name="basic-to-image" labelName="" type="file" control={control as any} />
                  </div>
                </label>
              </div>
            )}

            <div onClick={handleChangeDefaultImage}>
              <span className={cx("basic-image-btn")}>기본 이미지로 변경</span>
            </div>
          </div>

          <div className={cx("contents-input-area")}>
            <div className={cx("contents-input-area-email")}>
              <span className={cx("label")}>이메일</span>
              <input className={cx("input-box")} value={`${userMeData?.email}`} disabled />
            </div>
            <div className={cx("contents-input-area-nickname")}>
              <Input
                name="nickname"
                labelName="닉네임"
                type="text"
                control={control as any}
                placeholder="닉네임을 입력해 주세요"
                rules={{
                  required: "닉네임을 입력해 주세요.",
                  maxLength: { value: 10, message: "열 자 이하로 작성해 주세요." },
                  pattern: {
                    value: /^[0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\x20]*$/gi,
                    message: "닉네임에 특수문자 및 이모티콘을 사용할 수 없습니다.",
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className={cx("contents-btn")}>
          <ResponseBtn state="accept" type="submit" disabled={!isValid} ph={0.8}>
            저장
          </ResponseBtn>
        </div>
      </div>
    </form>
  );
}
