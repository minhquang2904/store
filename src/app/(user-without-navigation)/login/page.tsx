"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import SubTitleAccount from "@/app/components/subTitleAccount/subTitleAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import FieldInput from "@/app/components/fieldInput/fieldInput";
import ErrorInput from "@/app/components/errorInput/errorInput";
import LabelInput from "@/app/components/labelInput/labelInput";

export default function Login() {
  const emailRef: any = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password needs to be 6 characters or more")
      .required("Password is required"),
  });

  const handleSubmit = (values: any, setSubmitting: any) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <>
      <TitleAccount title="Welcome" />
      <Link href="/signup">
        <SubTitleAccount title="Please sign up here" />
      </Link>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-y-[20px]">
            <div>
              <LabelInput name="email" />
              <FieldInput
                type="email"
                name="email"
                id="email"
                placeholder="Example@gmail.com"
                refer={emailRef}
              />
              <ErrorInput name="email" />
            </div>
            <div>
              <LabelInput name="password" />
              <FieldInput
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <ErrorInput name="password" />
            </div>
            <BtnAccount disabled={isSubmitting} type="submit" title="Login" />
          </Form>
        )}
      </Formik>
    </>
  );
}
