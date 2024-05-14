"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import SubTitleAccount from "@/app/components/subTitleAccount/subTitleAccount";
import InputAccount from "@/app/components/inputAccount/inputAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import ShowError from "@/app/components/showError/page";
import TitleInput from "@/app/components/titleInput/titleInput";

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

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    return res;
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res: any) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  return (
    <>
      {/* {users.map((user: any) => {
        return <h1 key={user._id}>{user}</h1>;
      })} */}
      <TitleAccount title="Welcome" />
      <Link href="/signup">
        <SubTitleAccount title="Please sign up here" />
      </Link>
      <form>
        <div className="flex flex-col">
          <div className="mb-[16px]">
            <TitleInput title="email" />
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
            <TitleInput title="password" />
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
            <p className="!text-text text-subMobile xsm:text-smMobile sm:text-subTablet font-medium mb-0 hover:opacity-90">
              Forgot Password ?
            </p>
          </Link>
        </div>
        <BtnAccount title="Login" onClick={handleLogin} />
      </form>
    </>
  );
}
