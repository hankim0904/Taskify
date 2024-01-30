import Link from "next/link";
import Button from "@/components/commons/button/ResponseButton";

export default function Home() {
  return (
    <>
      <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <div>
          <Link href="/button-example">
            <Button state="reject">button-example</Button>
          </Link>
        </div>
        <div>
          <Link href="/scss-example">
            <Button state="reject">scss-example</Button>
          </Link>
        </div>
        <div>
          <Link href="/signin">
            <Button state="reject">signIn</Button>
          </Link>
        </div>
        <div>
          <Link href="/signup">
            <Button state="reject">signUp</Button>
          </Link>
        </div>
        <div>
          <Link href="/landing">
            <Button state="reject">landing</Button>
          </Link>
        </div>
        <div>
          <Link href="/modal-wh">
            <Button state="reject">modal-wh</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
