import React from "react";

type Props = {};

const ActivityCard = (props: Props) => {
  return (
    <div className="  flex-1 h-[80px] py-[16px] bg-white rounded-[16px]">
      <div className=" flex flex-col gap-[4px] items-center justify-center">
        <p className=" text-[13px]">Video watch</p>
        <p className=" text-[20px] font-semibold ">200</p>
      </div>
    </div>
  );
};

export default ActivityCard;
