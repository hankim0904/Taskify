import ResponseBtn from "@/components/commons/button/ResponseButton";
import { SignButton } from "@/components/commons/button/SignButton";
import { MixButton } from "@/components/commons/button/MixButton";
import Image from "next/image";

export default function Index() {
  return (
    <>
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {/*state  : accept | reject | cancel | delete*/}
        <ResponseBtn state="accept">
          <Image src="/assets/images/plus.png" height={16} width={16} alt="sd" />
          수락
        </ResponseBtn>
        <ResponseBtn state="reject">취소</ResponseBtn>
        <ResponseBtn state="cancel">거절</ResponseBtn>
        <ResponseBtn state="delete">삭제</ResponseBtn>
      </div>

      <br />
      <div style={{ maxWidth: "700px", display: "flex", flexDirection: "column", gap: "15px" }}>
        <SignButton>로그인</SignButton>
        <SignButton isDisabled={true}>가입하기</SignButton>
      </div>

      <br />
      <div style={{ maxWidth: "700px", display: "flex", flexDirection: "column", gap: "15px" }}>
        <MixButton>새로운 컬럼 추가하기</MixButton>
        <MixButton />
      </div>
    </>
  );
}
