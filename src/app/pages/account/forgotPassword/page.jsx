"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import style from "./forgotPassword.module.scss";
import Link from "next/link";
import Image from "next/image";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import InputAccount from "@/app/components/inputAccount/inputAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import LayoutAccount from "../layoutAccount/page";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const router = useRouter();
  const inputEmail = useRef(null);

  useEffect(() => {
    inputEmail.current.focus();
  }, []);

  useEffect(() => {
    if (checkEmail) {
      router.push("/pages/account/enterOTP");
    }
  }, [checkEmail]);

  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = (e) => {
    if (email == "lmquang2904@gmail.com") {
      setCheckEmail(true);
    }
  };

  return (
    <LayoutAccount>
      <Link href="/pages/account/login">
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
              refer={inputEmail}
            />
          </div>
        </div>
        <BtnAccount title="Send OTP" onClick={handleSendOTP} />
      </form>
    </LayoutAccount>
  );
}
