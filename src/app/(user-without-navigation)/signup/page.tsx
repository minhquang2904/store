"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import SubTitleAccount from "@/app/components/subTitleAccount/subTitleAccount";
import InputAccount from "@/app/components/inputAccount/inputAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputName: any = useRef(null);

  useEffect(() => {
    inputName.current.focus();
  }, []);

  const handleSignUp = (e: any) => {};

  return (
    <>
      <TitleAccount title="Create New Account" />
      <Link href="/login">
        <SubTitleAccount title="Please login here" />
      </Link>
      <form>
        <div className="flex flex-col">
          <div className="mb-[16px]">
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
              refer={inputName}
              autoComplete="Email"
            />
          </div>
          <div className="mb-[16px]">
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
          <div className="mb-[16px]">
            <h4 className="text-[1.4em] text-text font-[450] mb-[5px]">
              Confirm Password
            </h4>
            <InputAccount
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
              style={{ margin: "0 0 16px 0" }}
              autoComplete="current-password"
            />
          </div>
        </div>
        <BtnAccount title="Sign up" onClick={handleSignUp} />
      </form>
    </>
  );
}
