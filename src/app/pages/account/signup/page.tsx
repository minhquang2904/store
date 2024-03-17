"use client";

import { useState, useRef, useEffect } from "react";
import style from "./signUp.module.scss";
import Link from "next/link";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import SubTitleAccount from "@/app/components/subTitleAccount/subTitleAccount";
import InputAccount from "@/app/components/inputAccount/inputAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import LayoutAccount from "../layoutAccount/page";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputName: any = useRef(null);

  useEffect(() => {
    console.log("123456");
    inputName.current.focus();
  }, []);
  const handleInputChangeName = (e: any) => {
    setName(e.target.value);
  };
  const handleInputChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleInputChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e: any) => {};

  return (
    <LayoutAccount>
      <TitleAccount title="Create New Account" />
      <Link href="/pages/account/login">
        <SubTitleAccount title="Please login here" />
      </Link>
      <form>
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
              refer={inputName}
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
              refer={null}
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
              refer={null}
            />
          </div>
        </div>
        <BtnAccount title="Sign up" onClick={handleSignUp} />
      </form>
    </LayoutAccount>
  );
}
