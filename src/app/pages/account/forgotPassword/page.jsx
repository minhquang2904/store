"use client";

import { useState } from "react";
import style from "./forgotPassword.module.scss";
import Link from "next/link";
import Image from "next/image";
import ImageLogin from "@/app/components/imageLogin/page";
import TitleAccount from "@/app/components/titleAccount/page";
import SubTitleAccount from "@/app/components/subTitleAccount/page";
import InputAccount from "@/app/components/inputAccount/page";
import { Jost } from "next/font/google";
import { ImageLogin1, ArrowLeft } from "../../../data";
import BtnAccount from "@/app/components/btnAccount/page";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <main className={`bg-white min-h-screen ${style.main}`}>
      <ImageLogin src={ImageLogin1} />
      <div className={`${style.formLogin} ${jost.className}`}>
        <div className={`${style.formContainer}`}>
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
          <Link href="/pages/account/signup">
            <SubTitleAccount title="Enter your registered email address. we’ll send you a code to reset your password." />
          </Link>
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
          <BtnAccount title="Send OTP" />
        </div>
      </div>
    </main>
  );
}
