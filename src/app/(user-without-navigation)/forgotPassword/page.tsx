"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import InputAccount from "@/app/components/inputAccount/inputAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import BackForm from "@/app/components/backForm/backForm";

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
      <p className="text-[1.6em] text-[#a4a1aa] font-normal mb-[30px] inline-block">
        Enter your registered email address. we’ll send you a code to reset your
        password.
      </p>
      <form>
        <div className="flex flex-col">
          <div className="mb-[16px]">
            <h4 className="text-[1.4em] text-text font-[450] mb-[5px]">
              Email Address
            </h4>
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
