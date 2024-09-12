import React from "react";
import ProgressBar from "../ProgressBar";

type Props = {};

const SemesterCard = (props: Props) => {
  return (
    <div className=" bg-[#F0F7FF] h-auto md:h-[75px] px-[15px] flex flex-col-reverse md:flex-row justify-between items-center rounded-[8px]">
      <div className=" text-[13px] flex flex-col gap-[4px]">
        <p className=" font-semibold">1st Semester</p>
        <p className=" text-[#9E9E9E]">{80} Registed</p>
        <p className=" text-[#9E9E9E]">{`Pass:53, Fail: 23`}</p>
      </div>
      <div>
        <ProgressBar pValue={20} size={75} />
      </div>
    </div>
  );
};

export default SemesterCard;
