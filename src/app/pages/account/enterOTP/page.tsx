"use client";

import { useState } from "react";
import style from "./enterOTP.module.scss";
import Link from "next/link";
import Image from "next/image";
import TitleAccount from "@/app/components/titleAccount/page";
import InputAccount from "@/app/components/inputAccount/page";
import BtnAccount from "@/app/components/btnAccount/page";
import LayoutAccount from "../layoutAccount/page";

export default function ForgotPassword() {
  const [otp, setOTP] = useState("");

  const handleInputChangeEmail = (e: any) => {
    setOTP(e.target.value);
  };

  const handleSubmitOTP = (e: any) => {};

  return (
    <LayoutAccount>
      <Link href="/pages/account/forgotPassword">
        <div className={`${style.backGroup}`}>
          <Image
            src="/icons/arrowLeft.svg"
            className={`${style.backIcon}`}
            alt="LOGO"
            sizes="100vw"
            width={16}
            height={16}
          />
          <h4 className={`${style.backTitle}`}>Back</h4>
        </div>
      </Link>
      <TitleAccount title="Enter OTP" />
      <p className={`${style.subTitleCustom}`}>
        We have share a code of your registered email address
        robertfox@example.com.
      </p>
      <form>
        <div className={`${style.formColumn}`}>
          <div className={`${style.formGroup}`}>
            <InputAccount
              value={otp}
              onChange={handleInputChangeEmail}
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              className=""
              style={{ margin: "0 0 16px 0" }}
            />
          </div>
        </div>
        <BtnAccount title="Verify" onClick={handleSubmitOTP} />
      </form>
    </LayoutAccount>
  );
}
