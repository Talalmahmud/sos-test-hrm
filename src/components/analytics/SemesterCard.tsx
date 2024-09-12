import React from "react";

type Props = {
  title: any;
  itemDetails: any;
};

const SemesterCard = ({ title, itemDetails }: Props) => {
  return (
    <div className=" p-2 rounded-[8px] border-gray_light border-[1px] shadow-md flex flex-col gap-1">
      <p className=" text-[14px] font-semibold border-b-[1px] border-gray_light">
        {title}
      </p>
      <div className=" flex justify-center items-center gap-2">
        <div className=" flex flex-col gap-1">
          <p className=" text-[12px] border-b-[1px] border-gray_light">Entry</p>
          <p>{itemDetails?.entry_student}</p>
        </div>
        <div className=" h-full w-[2px] bg-gray_light"></div>
        <div className=" flex flex-col gap-1">
          <p className=" text-[12px] border-b-[1px] border-gray_light">
            Enroll
          </p>
          <p>{itemDetails?.enrolled_student}</p>
        </div>
      </div>
    </div>
  );
};

export default SemesterCard;
