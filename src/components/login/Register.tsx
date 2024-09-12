"use client";
import React, { useState } from "react";
import InputField from "./InputField";

type Props = {};

const Register = (props: Props) => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div>
      <p className=" text-[32px] text-black font-[600px] mb-[28px]">Sign up</p>
      <div className=" flex flex-col gap-[38px] w-full">
        <InputField
          inpputValue={email}
          inputName="email"
          inputPlaceHolder="Enter email or phone"
          iconShow={false}
          isShow={false}
          setIsShow={setShow}
          setInputValue={setEmail}
        />
        <InputField
          inpputValue={email}
          inputName="email"
          inputPlaceHolder="Enter email or phone"
          iconShow={false}
          isShow={false}
          setIsShow={setShow}
          setInputValue={setEmail}
        />
      </div>
    </div>
  );
};

export default Register;
