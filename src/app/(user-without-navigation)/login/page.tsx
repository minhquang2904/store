"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import SubTitleAccount from "@/app/components/subTitleAccount/subTitleAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import FieldInput from "@/app/components/fieldInput/fieldInput";
import ErrorInput from "@/app/components/errorInput/errorInput";
import LabelInput from "@/app/components/labelInput/labelInput";
import ErrorMessage from "@/app/components/errorMessage/errorMessage";
import LoadingModal from "@/app/components/loadingModal/loadingModal";

export default function Login() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dataError, setDataError] = useState(null) as any;
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password needs to be 6 characters or more")
      .required("Password is required"),
  });

  const handleSubmit = (values: any, setSubmitting: any) => {
    setLoading(true);
    setSubmitting(true);
    try {
      fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            push("/");
          }
          if (data.status == 400) {
            setDataError(data.message);
            setError(true);
          }
          if (data.status == 403) {
            setDataError(data.message);
            setError(true);
          }
          setLoading(false);
          setSubmitting(false);
        });
    } catch (error: any) {
      console.log("Login failed", error.message);
    }
  };
  return (
    <>
      <TitleAccount title="Welcome" />
      <Link href="/signup" className="inline-block mb-[30px]">
        <SubTitleAccount title="Please sign up here" />
      </Link>
      {error && <ErrorMessage message={dataError} />}
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
                autocomplete="email"
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
                autocomplete="password"
              />
              <ErrorInput name="password" />
            </div>
            <BtnAccount disabled={isSubmitting} type="submit" title="Login" />
          </Form>
        )}
      </Formik>
      <LoadingModal title="Login" loading={loading} />
    </>
  );
}
