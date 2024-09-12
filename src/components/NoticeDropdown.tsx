import React from "react";

type Props = {};

const NoticeDropdown = (props: Props) => {
  return (
    <div className=" top-[56px]  bg-orange z-10 absolute left-0 w-[260px]  rounded-[16px] px-[16px] py-[16px]  shadow-md text-white ">
      <div className=" flex flex-col gap-[16px] max-h-[296px] overflow-auto ">
        <div className=" flex flex-col  gap-[4px]">
          <p className=" text-[16px] font-bold">Title</p>
          <p className=" text-[14px]">This notice is</p>
        </div>
        <div className=" flex flex-col  gap-[4px]">
          <p className=" text-[16px] font-bold">Title</p>
          <p className=" text-[14px]">This notice is</p>
        </div>
        <div className=" flex flex-col  gap-[4px] ">
          <p className=" text-[16px] font-bold">Title</p>
          <p className=" text-[14px]">This notice is</p>
        </div>
        <div className=" flex flex-col  gap-[4px] ">
          <p className=" text-[16px] font-bold">Title</p>
          <p className=" text-[14px]">This notice is</p>
        </div>
        <div className=" flex flex-col  gap-[4px] ">
          <p className=" text-[16px] font-bold">Title</p>
          <p className=" text-[14px]">This notice is</p>
        </div>
        <div className=" flex flex-col  gap-[4px] ">
          <p className=" text-[16px] font-bold">Title</p>
          <p className=" text-[14px]">This notice is</p>
        </div>{" "}
        <div className=" flex flex-col  gap-[4px] ">
          <p className=" text-[16px] font-bold">Title</p>
          <p className=" text-[14px]">This notice is</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeDropdown;
