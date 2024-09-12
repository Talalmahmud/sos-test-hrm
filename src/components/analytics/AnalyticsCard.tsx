import React from "react";

type Props = {
  title: any;
  itemDetails: any;
};

const AnalyticsCard = ({ title, itemDetails }: Props) => {
  return (
    <div className=" p-2 rounded-[8px] border-gray_light border-[1px] shadow-md flex flex-col gap-1">
      <p className=" text-[14px] font-semibold border-b-[1px] border-gray_light">
        {title}
      </p>
      <div className=" grid grid-cols-2 gap-2 text-[12px]">
        <div className=" flex flex-col gap-1">
          <p className=" font-semibold">Active student:</p>
          <div className=" flex items-center gap-1">
            <p>Entry:</p>
            <p>{itemDetails?.entry_active_student}</p>
          </div>

          <div className=" flex items-center gap-1">
            <p>Enroll:</p>
            <p>{itemDetails?.enroll_active_student}</p>
          </div>
        </div>

        <div className=" flex flex-col gap-1">
          <p className=" font-semibold">Lifetime student:</p>
          <div className=" flex items-center gap-1">
            <p>Entry:</p>
            <p>{itemDetails?.entry_lifetime_student}</p>
          </div>

          <div className=" flex items-center gap-1">
            <p>Enroll:</p>
            <p>{itemDetails?.enroll_lifetime_student}</p>
          </div>
        </div>
      </div>
      {/* <div className=" flex  justify-center items-center gap-2">
        <p>{itemDetails?.enroll_active_student}</p>
        <div className=" h-[20px] w-[2px] bg-gray_light"></div>
        <p>{itemDetails?.entry_active_student}</p>
        <div className=" h-[20px] w-[2px] bg-gray_light"></div>
        <p>{itemDetails?.enroll_lifetime_student}</p>{" "}
        <div className=" h-[20px] w-[2px] bg-gray_light"></div>
        <p>{itemDetails?.entry_lifetime_student}</p>
      </div> */}
    </div>
  );
};

export default AnalyticsCard;
