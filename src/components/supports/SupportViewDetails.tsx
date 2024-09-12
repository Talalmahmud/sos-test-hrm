"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AuthContext } from "../ContextProvider";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import CustomModal from "../CustomModal";
import { useRouter } from "next/navigation";

type Props = {
  supportId: any;
  supportStatus: any;
};

const SupportViewDetails = ({ supportId, supportStatus }: Props) => {
  const { user } = useContext(AuthContext);
  const [detail, setDetail] = useState<any>(null);
  const [toggle, setToggle] = useState(false);
  const [videoToggle, setVideoToggle] = useState(false);

  const supportDeatials = async () => {
    if (supportId && user !== null) {
      try {
        const res = await axios.get(
          EndPoint.SUPPORT_VIEW_BY_ID + supportId + "/"
        );
        const result = await res?.data;
        setDetail(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    supportDeatials();
  }, [supportId, user]);
  return (
    <div className=" w-full flex flex-col gap-[16px]">
      <div className=" flex items-center justify-between">
        <div className=" w-[856px] h-[140px] flex items-center justify-between border-[1px] border-[#CED1D7] rounded-[16px] p-[8px]">
          <div className=" w-[249px] h-full flex items-center justify-center gap-[24px] bg-bg_orange rounded-[8px] ">
            <div className=" relative overflow-auto h-[71px] w-[71px] rounded-full">
              <Image src={"/assets/im2.jpeg"} fill alt="" />
            </div>
            <div className=" flex flex-col  gap-[4px]">
              <p className=" tex-[20px] font-semibold">{detail?.user?.name}</p>
              <p className=" text-[10px]">ID: {detail?.user?.id}</p>
              <p className=" text-[13px] font-semibold">
                {detail?.user?.phone_number}
              </p>
            </div>
          </div>
          <div className=" w-[419px] p-[8px] text-[13px] h-full flex flex-col  items-start justify-between  bg-bg_orange rounded-[8px] ">
            <div className=" flex gap-[8px] ">
              <div className=" overflow-auto relative h-[16px] w-[16px]">
                <Image src={"/icons/black-education.svg"} fill alt="" />
              </div>
              <p className="  whitespace-nowrap overflow-auto ">
                {detail?.profile?.institute?.name}
              </p>
            </div>
            <div className=" flex gap-[8px] ">
              <div className=" overflow-auto relative h-[16px] w-[16px]">
                <Image src={"/icons/department-icon.png"} fill alt="" />
              </div>
              <p className=" whitespace-nowrap  ">
                {detail?.profile?.department?.name}
              </p>
            </div>
            <div className=" flex gap-[4px] ">
              <div className=" overflow-auto relative h-[16px] w-[16px]">
                <Image src={"/icons/semester-icon.png"} fill alt="" />
              </div>
              <p>
                {detail?.semester?.level} Semester ({detail?.session?.title}){" "}
              </p>
            </div>
            <div className=" flex gap-[4px] ">
              <div className=" overflow-auto relative h-[16px] w-[16px]">
                <Image src={"/icons/roll-icon.png"} fill alt="" />
              </div>
              <p>
                Board Roll No:{" "}
                {detail?.user?.board_roll
                  ? detail?.user?.board_roll
                  : "Not added"}
              </p>
            </div>
          </div>
          <div className=" w-[156px] p-[16px]  h-full flex flex-col items-start justify-center gap-[8px] bg-bg_orange rounded-[8px] ">
            <div className=" flex flex-col gap-[2px]">
              <p className=" text-[10px]">Category:</p>
              <p className=" text-[13px] font-semibold pl-[16px]">
                {detail?.category?.name}
              </p>
            </div>
            <div className=" flex flex-col gap-[2px]">
              <p className=" text-[10px]">Package:</p>
              <p className=" text-[13px] font-semibold pl-[16px]">
                {detail?.package}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-col gap-[24px] bg-bg_orange p-[16px] rounded-[16px]">
        <p className=" text-[20px] font-semibold ">
          <span className=" text-orange">Course:</span>
          {detail?.course?.name}
        </p>
        <div className=" flex justify-between">
          <div className=" flex flex-col h-[91px] border-[1px] bg-white border-gray rounded-[8px] justify-center items-center gap-[4px] px-[8px]">
            <p className="text-[16px]  whitespace-nowrap  font-semibold">
              {detail?.subject?.name}
            </p>
            <p className="text-[13px]   whitespace-nowrap ">
              {detail?.chapter?.name}
            </p>
          </div>
          <div
            onClick={() => setVideoToggle(true)}
            className=" flex flex-col cursor-pointer  h-[91px] border-[1px] bg-white border-gray rounded-[8px] justify-center items-center gap-[4px] px-[8px]"
          >
            <p className="text-[16px] text-center overflow-auto whitespace-nowrap font-semibold">
              {detail?.video_title}
            </p>
            <div className=" flex items-center text-[13px] gap-[4px]">
              <p>Play Video</p>
              <div>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1719_11791)">
                    <path
                      d="M20.4833 4.01661C15.7949 -0.671853 8.20579 -0.672557 3.51667 4.01661C-1.17185 8.70504 -1.1726 16.2942 3.51667 20.9833C8.20513 25.6718 15.7942 25.6725 20.4833 20.9833C25.1718 16.2949 25.1726 8.70574 20.4833 4.01661ZM12 22.5264C6.47138 22.5264 1.97352 18.0285 1.97352 12.4999C1.97352 6.97137 6.47138 2.47356 12 2.47356C17.5285 2.47356 22.0264 6.97142 22.0264 12.5C22.0264 18.0286 17.5286 22.5264 12 22.5264Z"
                      fill="black"
                    />
                    <path
                      d="M15.609 11.7224L11.1041 8.21859C10.4578 7.71579 9.51367 8.1781 9.51367 8.99648V16.004C9.51367 16.8282 10.4639 17.2797 11.1041 16.7819L15.609 13.2781C16.1156 12.884 16.1162 12.1169 15.609 11.7224ZM11.4845 13.9891V11.0113L13.3989 12.5002L11.4845 13.9891Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1719_11791">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {videoToggle && (
          <CustomModal setClose={() => setVideoToggle(false)}>
            <iframe
              width="900"
              height="700"
              // src="https://www.youtube.com/embed/RqTEHSBrYFw?si=G4_nrHK5eJbYogEo&amp;start=5312"
              src={detail?.video_path}
              title="YouTube video player"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </CustomModal>
        )}
        <div className=" grid grid-cols-2 gap-[24px]">
          <div className=" min-h-[323px] bg-white rounded-[8px] flex flex-col items-center gap-[16px] p-[16px]">
            <p className=" text-[20px] font-semibold">Problem Statemant</p>
            <audio
              src={detail?.audio}
              controls
              className=" w-full border-[1px] h-[40px] border-gray_title rounded-full"
            ></audio>
            <p className=" text-[14px]  text-justify ">
              {detail?.problem_statement}
            </p>
          </div>
          <div
            onClick={() => setToggle(true)}
            className=" relative overflow-auto min-h-[323px] rounded-[8px] cursor-pointer"
          >
            <Image src={detail?.image || "/assets/im2.jpeg"} fill alt="" />
          </div>
          {toggle && (
            <CustomModal setClose={() => setToggle(false)}>
              <div className=" relative overflow-auto min-w-[1100px] min-h-[700px] m-[40px] rounded-[8px]">
                <Image src={detail?.image || "/assets/im2.jpeg"} fill alt="" />
              </div>
            </CustomModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportViewDetails;
