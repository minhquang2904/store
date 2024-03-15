"use client";
import React, { useState, useRef, useEffect } from "react";
import style from "./login.module.scss";
import Link from "next/link";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import SubTitleAccount from "@/app/components/subTitleAccount/subTitleAccount";
import InputAccount from "@/app/components/inputAccount/inputAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import LayoutAccount from "../layoutAccount/page";
import ShowError from "@/app/components/showError/page";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inputRef: any = useRef(null);

  const handleInputChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleInputChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: any) => {
    if (email == "") {
      setError("Empty email");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <LayoutAccount>
      <TitleAccount title="Welcome 👋" />
      <Link href="/pages/account/signup">
        <SubTitleAccount title="Please sign up here" />
      </Link>
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
              style={{}}
              refer={inputRef}
            />
          </div>
          <div className={`${style.formGroup}`} style={{ marginBottom: "0" }}>
            <h4>Password</h4>
            <InputAccount
              value={password}
              onChange={handleInputChangePassword}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className=""
              style={{}}
              refer={null}
            />
          </div>
        </div>
        {error ? (
          <ShowError style={{ visibility: "visible" }} error={error} />
        ) : (
          <ShowError style={{ visibility: "hidden" }} error={error} />
        )}
        <div className={`${style.forgotPassword}`}>
          <Link href="/pages/account/forgotPassword">
            <p>Forgot Password?</p>
          </Link>
        </div>
        <BtnAccount title="Login" onClick={handleLogin} />
      </form>
    </LayoutAccount>
  );
}
