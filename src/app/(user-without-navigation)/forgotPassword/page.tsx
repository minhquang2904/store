"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import InputAccount from "@/app/components/inputAccount/inputAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import BackForm from "@/app/components/backForm/backForm";
import TitleInput from "@/app/components/titleInput/titleInput";
import SubTitleOtp from "@/app/components/subTitleOTP/subTitleOTP";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const router = useRouter();
  const inputEmail: any = useRef(null);

  useEffect(() => {
    inputEmail.current.focus();
  }, []);

  useEffect(() => {
    if (checkEmail) {
      router.push("/enterOTP");
    }
  }, [checkEmail]);

  const handleSendOTP = () => {
    if (email == "lmquang2904@gmail.com") {
      setCheckEmail(true);
    }
  };

  return (
    <>
      <BackForm url="/login" />
      <TitleAccount title="Forgot Password" />
      <SubTitleOtp
        title="Enter your registered email address. we’ll send you a code to reset your
        password."
      />
      <form>
        <div className="flex flex-col">
          <div className="mb-[16px]">
            <InputAccount
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              placeholder="Example@gmail.com"
              style={{ margin: "0 0 16px 0" }}
              refer={inputEmail}
              autoComplete="email"
            />
          </div>
        </div>
        <BtnAccount title="Send OTP" onClick={handleSendOTP} />
      </form>
    </>
  );
}
