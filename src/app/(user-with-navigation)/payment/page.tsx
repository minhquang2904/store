"use client";

import SubTitleCheckOut from "@/app/components/subTitleCheckOut/subTitleCheckOut";
import TitleCheckOut from "@/app/components/titleCheckOut/titleCheckOut";
import Total from "@/app/components/total/total";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const PayMent = () => {
  const [valueRadio, setValueRadio] = useState("1");
  const [inputCardNumber, setInputCardNumber] = useState("");
  const [inputCardName, setInputCardName] = useState("");
  const [inputExpiryDate, setInputExpiryDate] = useState("");
  const [inputCvv, setInputCvv] = useState("");
  const inputCardNumberRef: any = useRef(null);
  const router = useRouter();

  useEffect(() => {
    valueRadio == "2" && inputCardNumberRef.current.focus();
  }, [valueRadio]);

  useEffect(() => {
    credit_card_format(inputCardNumber);
  }, [inputCardNumber]);

  useEffect(() => {
    credit_card_expires_format(inputExpiryDate);
  }, [inputExpiryDate]);

  useEffect(() => {
    credit_card_cvv_format(inputCvv);
  }, [inputCvv]);

  const credit_card_cvv_format = (value: any) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return setInputCvv(v);
  };

  const credit_card_format = (value: any) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return setInputCardNumber(parts.join(" "));
    } else {
      return setInputCardNumber(value);
    }
  };

  const credit_card_expires_format = (value: any) => {
    const v = value
      .replace(/[^0-9]/g, "")
      .replace(/^([2-9])$/g, "0$1")
      .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
      .replace(/^0{1,}/g, "0")
      .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
    return setInputExpiryDate(v);
  };

  const handlePaymentMethod = () => {
    if (valueRadio == "1") {
      router.push("/reviewOrder");
    } else if (valueRadio == "2") {
      router.push("/reviewOrder");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center px-pLayout">
        <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
          <TitleCheckOut title="Payment Method" />
          <div className="flex xsm:flex-col sm:flex-col l:flex-row xsm:w-full sm:w-full">
            <div className="shrink grow-0 l:basis-[70%] h-full xsm:overflow-x-scroll xsm:overflow-y-hidden">
              <SubTitleCheckOut title="Select a payment method" />
              <RadioGroup onChange={setValueRadio} value={valueRadio}>
                <Stack direction="column" spacing={4}>
                  <Radio size="md" value="1" colorScheme="gray">
                    <TitleRadio title="Cash on Delivery" />
                  </Radio>
                  <Radio size="md" value="2" colorScheme="gray">
                    <TitleRadio title="Debit/Credit Card" />
                  </Radio>
                </Stack>
              </RadioGroup>
              {valueRadio == "2" && (
                <div className="mt-[16px] max-w-[500px]">
                  <InputCard
                    title="Card Number"
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    refer={inputCardNumberRef}
                    value={inputCardNumber}
                    onChange={(e: any) => setInputCardNumber(e.target.value)}
                  />
                  <InputCard
                    title="Card Name"
                    type="text"
                    placeholder="eg. John Crest"
                    value={inputCardName}
                    onChange={(e: any) => setInputCardName(e.target.value)}
                  />
                  <div className="flex gap-x-[16px]">
                    <InputCard
                      title="Expiry Date"
                      type="data"
                      placeholder="MM/YY"
                      styleCustom="w-[50%]"
                      value={inputExpiryDate}
                      onChange={(e: any) => setInputExpiryDate(e.target.value)}
                      maxLength={5}
                    />
                    <InputCard
                      title="CVV"
                      type="text"
                      placeholder="XXX"
                      styleCustom="w-[50%]"
                      value={inputCvv}
                      onChange={(e: any) => setInputCvv(e.target.value)}
                      maxLength={3}
                    />
                  </div>
                </div>
              )}
              <button
                className="mt-[24px] px-[16px] py-[10px] bg-button hover:opacity-90 text-white text-[1.6em]
              max-w-[160px] w-full rounded-[16px]"
                onClick={handlePaymentMethod}
              >
                Continue
              </button>
            </div>
            <Total btn={false} />
          </div>
        </div>
      </div>
    </>
  );
};

const TitleRadio = (props: any) => {
  const { title } = props;
  return <h1 className="text-text text-[16px] font-medium">{title}</h1>;
};

const InputCard = (props: any) => {
  const {
    title,
    type,
    placeholder,
    styleCustom,
    refer,
    value,
    onChange,
    maxLength,
  } = props;
  return (
    <div className={`flex flex-col mb-[16px] ${styleCustom}`}>
      <label className="text-text capitalize text-[1.4em] mb-[8px] font-medium">
        {title}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        ref={refer}
        value={value}
        onChange={onChange}
        className="outline-none border-[1px] border-solid border-button px-[16px] py-[10px] rounded-[12px] text-[1.6em] text-text uppercase"
        maxLength={maxLength}
      />
    </div>
  );
};

export default PayMent;
