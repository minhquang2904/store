"use client";

import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./forgotPassword.module.scss";
import Link from "next/link";
import Image from "next/legacy/image";
import TitleAccount from "@/app/components/titleAccount/page";
import InputAccount from "@/app/components/inputAccount/page";
import { ArrowLeft } from "../../../data";
import BtnAccount from "@/app/components/btnAccount/page";
import LayoutAccount from "../layoutAccount/page";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = (e) => {
    if (email == "lmquang2904@gmail.com") {
      setCheckEmail(true);
    }
  };

  useLayoutEffect(() => {
    if (checkEmail) {
      router.push("/pages/account/enterOTP");
    }
  }, [checkEmail]);

  return (
    <LayoutAccount>
      <Link href="/pages/account/login">
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
      <TitleAccount title="Forgot Password" />
      <p className={`${style.subTitleCustom}`}>
        Enter your registered email address. we’ll send you a code to reset your
        password.
      </p>
      <form>
        <div className={`${style.formColumn}`}>
          <div className={`${style.formGroup}`}>
            <h4>Email Address</h4>
            <InputAccount
              value={email}
              onChange={handleInputChangeEmail}
              type="text"
              name="email"
              id="email"
              placeholder="Email@gmail.com"
              className=""
              style={{ margin: "0 0 16px 0" }}
            />
          </div>
        </div>
        <BtnAccount title="Send OTP" onClick={handleSendOTP} />
      </form>
    </LayoutAccount>
  );
}
