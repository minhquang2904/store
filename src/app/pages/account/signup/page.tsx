"use client";

import { useState } from "react";
import style from "./signUp.module.scss";
import Link from "next/link";
import ImageLogin from "@/app/components/imageLogin/page";
import TitleAccount from "@/app/components/titleAccount/page";
import SubTitleAccount from "@/app/components/subTitleAccount/page";
import InputAccount from "@/app/components/inputAccount/page";
import BtnAccount from "@/app/components/btnAccount/page";
import { Jost } from "next/font/google";
import { ImageLogin2 } from "../../../data";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleInputChangeName = (e: any) => {
    setName(e.target.value);
  };
  const handleInputChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleInputChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <main className={`bg-white min-h-screen ${style.main}`}>
      <ImageLogin src={ImageLogin2} />
      <div className={`${style.formLogin} ${jost.className}`}>
        <div className={`${style.formContainer}`}>
          <TitleAccount title="Create New Account" />
          <Link href="/pages/account/login">
            <SubTitleAccount title="Please login here" />
          </Link>
          <div className={`${style.formColumn}`}>
            <div className={`${style.formGroup}`}>
              <h4>First Name</h4>
              <InputAccount
                value={name}
                onChange={handleInputChangeName}
                type="text"
                name="name"
                id="name"
                placeholder="Julia Roberts"
                className=""
                style={{}}
              />
            </div>
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
                style={{}}
              />
            </div>
            <div className={`${style.formGroup}`}>
              <h4>Password</h4>
              <InputAccount
                value={password}
                onChange={handleInputChangePassword}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className=""
                style={{ margin: "0 0 16px 0" }}
              />
            </div>
          </div>
          <BtnAccount title="Sign up" />
        </div>
      </div>
    </main>
  );
}
