"use client";
import React from "react";

type Props = {
  title: string;
  amount: string;
};

const SummaryField = ({ title, amount }: Props) => {
  return (
    <div className=" w-full h-[35px] bg-bg_card px-[16px] rounded-[8px] text-[13px] flex items-center justify-between">
      <p>{title}</p>
      <p className=" text-orange">{amount}</p>
    </div>
  );
};

export default SummaryField;
