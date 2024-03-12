"use client";

import { useState } from "react";
import style from "./enterOTP.module.scss";
import Link from "next/link";
import Image from "next/legacy/image";
import TitleAccount from "@/app/components/titleAccount/page";
import SubTitleAccount from "@/app/components/subTitleAccount/page";
import InputAccount from "@/app/components/inputAccount/page";
import { ArrowLeft } from "../../../data";
import BtnAccount from "@/app/components/btnAccount/page";
import LayoutAccount from "../layoutAccount/page";

export default function ForgotPassword() {
  const [otp, setOTP] = useState("");

  const handleInputChangeEmail = (e: any) => {
    setOTP(e.target.value);
  };

  return (
    <LayoutAccount>
      <Link href="/pages/account/forgotPassword">
        <div className={`${style.backGroup}`}>
          <Image
            src={ArrowLeft}
            className={`${style.backIcon}`}
            alt="LOGO"
            layout="fill"
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
        <BtnAccount title="Verify" />
      </form>
    </LayoutAccount>
  );
}
