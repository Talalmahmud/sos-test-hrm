"use client";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  inputName: string;
  inpputValue: string;
  inputPlaceHolder: string;
  isShow: boolean;
  setIsShow: any;
  setInputValue: any;
  iconShow: boolean;
  enterPress?: any;
};

const InputField = ({
  inputName,
  inpputValue,
  setInputValue,
  inputPlaceHolder,
  isShow,
  setIsShow,
  enterPress,
}: Props) => {
  const [showVisible, setShowVisible] = useState(false);
  return (
    <div className=" relative w-[342px] xl:w-[326px] h-[62px] border-[1px] border-black rounded-[8px] px-[24px] flex items-center justify-center ">
      {enterPress ? (
        <input
          type={showVisible ? "phone" : "password"}
          className=" w-full h-full text-input_text outline-none text-[16px] caret-orange "
          value={inpputValue}
          name={inputName}
          placeholder={inputPlaceHolder}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={enterPress}
        />
      ) : (
        <input
          type={"text"}
          className=" w-full h-full text-input_text outline-none text-[16px] caret-orange "
          value={inpputValue}
          name={inputName}
          placeholder={inputPlaceHolder}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
      {isShow && (
        <div onClick={() => setShowVisible(!showVisible)}>
          <Image
            src={showVisible ? "/icons/invisible.svg" : "/icons/show.svg"}
            height={24}
            width={24}
            alt="imgInvisible"
            className=" cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default InputField;
