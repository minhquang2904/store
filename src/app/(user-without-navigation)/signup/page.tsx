"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import style from "./signup.module.scss";
import TitleAccount from "@/app/components/titleAccount/titleAccount";
import SubTitleAccount from "@/app/components/subTitleAccount/subTitleAccount";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import FieldInput from "@/app/components/fieldInput/fieldInput";
import ErrorInput from "@/app/components/errorInput/errorInput";
import LabelInput from "@/app/components/labelInput/labelInput";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import ErrorMessage from "@/app/components/errorMessage/errorMessage";
import Cookies from "js-cookie";
import LoadingModal from "@/app/components/loadingModal/loadingModal";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password needs to be 6 characters or more")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (
    values: any,
    setSubmitting: any,
    resetForm: any
  ) => {
    try {
      setSubmitting(true);
      setLoading(true);
      fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            setModalSuccess(true);
            error && setError(false);
            resetForm();
          }
          if (data.status == 400) {
            setError(true);
          }
          setLoading(false);
          setSubmitting(false);
        });
    } catch (error: any) {
      console.log("SignUp failed", error.message);
    }
  };

  const handleCloseModalSuccess = () => {
    setModalSuccess(false);
    router.push("/login");
  };

  return (
    <>
      <TitleAccount title="Create New Account" />
      <Link href="/login" className="inline-block mb-[30px]">
        <SubTitleAccount title="Please login here" />
      </Link>
      {error && <ErrorMessage message=" User already exists" />}
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          handleSubmit(values, setSubmitting, resetForm)
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
                autocomplete="new-password"
              />
              <ErrorInput name="password" />
            </div>
            <div>
              <LabelInput name="Confirm Password" id="confirmPassword" />
              <FieldInput
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                autocomplete="new-password"
              />
              <ErrorInput name="confirmPassword" />
            </div>
            <BtnAccount disabled={isSubmitting} type="submit" title="Sign Up" />
          </Form>
        )}
      </Formik>
      <LoadingModal title="SignUp" loading={loading} />
      <ModalSuccess isOpen={modalSuccess} onClick={handleCloseModalSuccess} />
    </>
  );
}

const ModalSuccess = (props: any) => {
  const { isOpen, onClose, data, onClick } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px"}
        margin={"auto 15px auto 15px"}
      >
        <ModalHeader padding={"15px 20px 0 20px"}>
          <div className="flex justify-center">
            <div className="success-animation">
              <svg
                className={`${style.checkmark}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
                width="24"
                height="24"
              >
                <circle
                  className={`${style.checkmark__circle}`}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className={`${style.checkmark__check}`}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center" paddingTop={"0"}>
          <h1 className="text-[3em] text-[#30B87B] font-semibold mt-[16px] mb-[16px]">
            Success
          </h1>
          <p className="text-text text-[2em] text-center">
            Your account has been create successfully
          </p>
          <button
            className="text-white bg-[#30B87B] px-[60px] py-[8px] text-[2em] mt-[32px] mb-[7px] rounded-[30px]"
            onClick={onClick}
          >
            LOGIN
          </button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
