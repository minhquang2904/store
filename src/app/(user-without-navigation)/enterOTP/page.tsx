"use client";

import { useState, useRef, useEffect } from "react";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import InputAccount from "@/app/components/inputAccount/inputAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import BackForm from "@/app/components/backForm/backForm";
import SubTitleOtp from "@/app/components/subTitleOTP/subTitleOTP";

export default function ForgotPassword() {
  const [otp, setOTP] = useState("");
  const inputOTP: any = useRef(null);

  useEffect(() => {
    inputOTP.current.focus();
  }, []);

  const handleSubmitOTP = (e: any) => {};

  return (
    <>
      <BackForm url="/forgotPassword" />
      <TitleAccount title="Enter OTP" />
      {/* <p className="text-[1.6em] text-[#a4a1aa] font-normal mb-[30px] inline-block">
        We have share a code of your registered email address
        robertfox@example.com.
      </p> */}
      <SubTitleOtp title=" We have share a code of your registered email address" />
      <form>
        <div className="flex flex-col">
          <div className="mb-[16px]">
            <InputAccount
              value={otp}
              onChange={(e: any) => setOTP(e.target.value)}
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              className=""
              style={{ margin: "0 0 16px 0" }}
              refer={inputOTP}
              autoComplete="OTP"
            />
          </div>
        </div>
        <BtnAccount title="Verify" onClick={handleSubmitOTP} />
      </form>
    </>
  );
}
