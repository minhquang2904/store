"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import SubTitleAccount from "@/app/components/subTitleAccount/subTitleAccount";
import InputAccount from "@/app/components/inputAccount/inputAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import ShowError from "@/app/components/showError/page";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inputRef: any = useRef(null);

  const handleLogin = (e: any) => {
    if (email == "") {
      setError("Empty email");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <TitleAccount title="Welcome 👋" />
      <Link href="/signup">
        <SubTitleAccount title="Please sign up here" />
      </Link>
      <form>
        <div className="flex flex-col">
          <div className="mb-[16px] ">
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
              refer={inputRef}
              autoComplete="Email"
            />
          </div>
          <div className="mb-0">
            <h4 className="text-[1.4em] text-text font-[450] mb-[5px]">
              Password
            </h4>
            <InputAccount
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
        </div>
        {error ? (
          <ShowError style={{ visibility: "visible" }} error={error} />
        ) : (
          <ShowError style={{ visibility: "hidden" }} error={error} />
        )}
        <div className="flex justify-end mb-[32px]">
          <Link href="/forgotPassword">
            <p className="!text-text text-[1.4em] font-medium mb-0 hover:opacity-90">
              Forgot Password?
            </p>
          </Link>
        </div>
        <BtnAccount title="Login" onClick={handleLogin} />
      </form>
    </>
  );
}
