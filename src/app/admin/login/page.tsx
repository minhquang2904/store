"use client";

import { Formik, Form } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import ErrorInput from "@/app/components/errorInput/errorInput";
import FieldInput from "@/app/components/fieldInput/fieldInput";
import LabelInput from "@/app/components/labelInput/labelInput";
import ErrorMessage from "@/app/components/errorMessage/errorMessage";

const LoginAmin = () => {
  const usernameRef: any = useRef(null);
  const { push } = useRouter();
  const [error, setError] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password needs to be 6 characters or more")
      .required("Password is required"),
  });

  const handleSubmit = (values: any, setSubmitting: any) => {
    try {
      fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            push("/admin");
          }
          if (data.status == 400) {
            setError(true);
          }
          setSubmitting(false);
        });
    } catch (error: any) {
      console.log("Login failed", error.message);
    }
  };
  return (
    <>
      <div className="bg-[#F3F4F4] flex min-h-[100vh] justify-center items-center">
        <div className="p-[15px] max-w-[400px] w-full">
          <h2 className="text-text uppercase text-[2.4em] font-medium mb-[32px] text-center">
            Admin Dashboard
          </h2>
          {error && (
            <ErrorMessage message="Your account or password is incorrect" />
          )}
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, setSubmitting)
            }
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-y-[20px]">
                <div>
                  <LabelInput id="username" name="User Name" />
                  <FieldInput
                    type="text"
                    name="username"
                    id="username"
                    placeholder="User Name"
                    refer={usernameRef}
                    autocomplete="username"
                  />
                  <ErrorInput name="username" />
                </div>
                <div>
                  <LabelInput name="password" />
                  <FieldInput
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    autocomplete="current-password"
                  />
                  <ErrorInput name="password" />
                </div>
                <BtnAccount
                  disabled={isSubmitting}
                  type="submit"
                  title="Login"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default LoginAmin;
