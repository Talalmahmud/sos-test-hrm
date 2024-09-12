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
import { semesterLabel } from "@/utils/staticData";
import { toast } from "react-toastify";

// const semesterLabel = (value: any) => {
//   if (value === 1) {
//     return "1st";
//   }
//   if (value === 2) {
//     return "2nd";
//   }
//   if (value === 3) {
//     return "3rd";
//   }
//   if (value === 4) {
//     return "4th";
//   }
//   if (value === 5) {
//     return "5th";
//   }
//   if (value === 6) {
//     return "6th";
//   }
//   if (value === 7) {
//     return "7th";
//   }
//   if (value === 8) {
//     return "8th";
//   } else {
//     return "Not Add";
//   }
// };

type Props = {
  supportId: any;
  supportStatus: any;
};

const SupportDetails = ({ supportId, supportStatus }: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [detail, setDetail] = useState<any>(null);
  const [toggle, setToggle] = useState(false);
  const [transferToggle, setTransferToggle] = useState(false);
  const [videoToggle, setVideoToggle] = useState(false);
  const [supportList, setSupportList] = useState([]);

  const [transferDetails, setTransferDetails] = useState<any>({
    receiver: "",
    transfer_reason: "",
  });

  const supportTeacher = async () => {
    try {
      if (supportId) {
        const res = await axios.get(EndPoint.SUPPORT_TEACHER);
        const result = await res.data;
        // setSupportList(
        //   result.results
        //     ?.map((item: any) => {
        //       if (item.value !== user?.phone_number) {
        //         return item; // Return the item if condition is true
        //       }
        //       // Return null for items that don't meet the condition
        //       return null;
        //     })
        //     .filter((item:any) => item !== null) // Filter out null values
        // );

        setSupportList(
          result.results?.filter(
            (item: any) => item.value !== user?.phone_number
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transferSubmit = async () => {
    const bodyData = {
      sender: user?.phone_number,
      receiver: transferDetails?.receiver,
      support_id: supportId,
      transfer_reason: transferDetails.transfer_reason,
    };
    try {
      const res = await axios.post(EndPoint.SUPPORT_TRANSFER, bodyData);
      router.push("/management/support/history");
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const supportDeatials = async () => {
    if (supportId && supportStatus && user !== null) {
      try {
        const res = await axios.post(EndPoint.SUPPORT_DETAILS, {
          support_id: supportId,
          teacher_mobile: user?.phone_number,
          status: supportStatus === "completed" ? "completed" : "processing",
        });
        const result = await res?.data;
        setDetail(result);
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };
  const supportCompleteSubmit = async () => {
    if (supportId) {
      try {
        const res = await axios.post(EndPoint.SUPPORT_DETAILS, {
          support_id: supportId,
          teacher_mobile: user?.phone_number,
          status: "completed",
        });
        const result = await res.data;
        setDetail(result);
        router.push("/management/support/completed");
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };
  useEffect(() => {
    supportTeacher();
    supportDeatials();
  }, [supportId, supportStatus, user]);
  return (
    <div className=" w-full flex flex-col gap-[16px]">
      <div className=" flex items-center justify-between">
        <div className=" w-[856px] h-[140px] flex items-center justify-between border-[1px] border-[#CED1D7] rounded-[16px] p-[8px]">
          <div className=" w-[249px] h-full flex items-center justify-center gap-[24px] bg-bg_orange rounded-[8px] ">
            <div className=" relative overflow-auto h-[71px] w-[71px] rounded-full">
              <Image
                src={detail?.profile?.profile_picture || "/assets/im2.jpeg"}
                fill
                alt=""
              />
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
                {semesterLabel(detail?.semester?.level)} Semester (
                {detail?.session?.title})
              </p>
            </div>
            <div className=" flex gap-[4px] ">
              <div className=" overflow-auto relative h-[16px] w-[16px]">
                <Image src={"/icons/roll-icon.png"} fill alt="" />
              </div>
              <p>
                Board Roll No:{" "}
                {detail?.user?.board_roll === null
                  ? "Not added"
                  : detail?.user?.board_roll}
              </p>
            </div>
          </div>
          <div className=" w-[156px] p-[16px]  h-full flex flex-col items-start justify-center gap-[8px] bg-bg_orange rounded-[8px] ">
            <div className=" flex flex-col gap-[2px]">
              <p className=" text-[10px]">Category:</p>
              <p className=" text-[13px] font-semibold ">
                {detail?.category?.name}
              </p>
            </div>
            <div className=" flex flex-col gap-[2px]">
              <p className=" text-[10px]">Package:</p>
              <p className=" text-[13px] font-semibold ">{detail?.package}</p>
            </div>
          </div>
        </div>

        <div className=" w-[276px] flex flex-col gap-[8px]">
          <div className="  items-center grid grid-cols-2">
            <div className=" flex gap-[8px]">
              <div>
                <Select
                  options={supportList}
                  onChange={(e: any) =>
                    setTransferDetails({
                      ...transferDetails,
                      receiver: e.value,
                    })
                  }
                  className=" min-w-[175px] min-h-[32px] text-[13px] text-black"
                  placeholder="Select teacher"
                  maxMenuHeight={150}
                />
              </div>
              <button
                disabled={
                  transferDetails?.receiver === "" ||
                  detail?.status === "completed"
                    ? true
                    : false
                }
                onClick={() => setTransferToggle(true)}
                className=" min-w-[89px] min-h-[32px] text-[13px] text-white rounded-[8px] flex justify-center items-center bg-[#474D5C]"
              >
                Transfer
              </button>
              {transferToggle && (
                <CustomModal setClose={() => setTransferToggle(false)}>
                  <div className=" w-[461px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
                    <div className=" flex flex-col gap-[4px] text-[16px] ">
                      <p className=" text-white">Transfer Reason:</p>
                      <textarea
                        onChange={(e) =>
                          setTransferDetails({
                            ...transferDetails,
                            transfer_reason: e.target.value,
                          })
                        }
                        placeholder="Enter Catagory Name"
                        className=" px-[8px] rounded-[8px] text-black"
                        rows={5}
                      />
                    </div>

                    <div className=" flex justify-end items-center gap-[16px]">
                      <button
                        onClick={() => setTransferToggle(false)}
                        className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => transferSubmit()}
                        className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </CustomModal>
              )}
            </div>
          </div>

          <div className="  items-center grid ">
            <div className=" flex gap-[8px]">
              <button className=" w-full min-h-[32px] text-[25px] text-white font-semibold rounded-[8px] flex justify-center items-center border-[1px] border-gray_dark  ">
                <div className=" flex items-center gap-[4px]">
                  <div>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 13.3789 2.77907 14.6926 3.28382 15.8877C3.56278 16.5481 3.70226 16.8784 3.71953 17.128C3.7368 17.3776 3.66334 17.6521 3.51642 18.2012L2.5 22L6.29877 20.9836C6.84788 20.8367 7.12244 20.7632 7.37202 20.7805C7.62161 20.7977 7.95185 20.9372 8.61235 21.2162C9.80745 21.7209 11.1211 22 12.5 22Z"
                        stroke="#247B54"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.08815 12.3773L9.95909 11.2956C10.3262 10.8397 10.7799 10.4153 10.8155 9.80826C10.8244 9.65494 10.7166 8.96657 10.5008 7.58986C10.416 7.04881 9.91086 7 9.47332 7C8.90314 7 8.61805 7 8.33495 7.12931C7.97714 7.29275 7.60979 7.75231 7.52917 8.13733C7.46539 8.44196 7.51279 8.65187 7.60759 9.07169C8.01023 10.8548 8.95481 12.6158 10.4195 14.0805C11.8842 15.5452 13.6452 16.4898 15.4283 16.8924C15.8481 16.9872 16.058 17.0346 16.3627 16.9708C16.7477 16.8902 17.2072 16.5229 17.3707 16.165C17.5 15.8819 17.5 15.5969 17.5 15.0267C17.5 14.5891 17.4512 14.084 16.9101 13.9992C15.5334 13.7834 14.8451 13.6756 14.6917 13.6845C14.0847 13.7201 13.6603 14.1738 13.2044 14.5409L12.1227 15.4118"
                        stroke="#247B54"
                        stroke-width="1.5"
                      />
                    </svg>
                  </div>
                  {/* <Link href={`https://wa.me/+8801826559551`}>
                    <p className=" text-[25px] font-semibold text-black ">
                      +8801795257742
                      {detail?.profile?.whatsapp_number || " Not added"}
                    </p>
                  </Link> */}
                  <Link
                    target="__blank"
                    href={`https://wa.me/${
                      detail?.whatsapp_number?.includes("+880")
                        ? detail?.profile?.whatsapp_number
                        : "+880" + detail?.profile?.whatsapp_number
                    }`}
                  >
                    <p className=" text-[25px] font-semibold text-black ">
                      {detail?.profile?.whatsapp_number || " Not added"}
                    </p>
                  </Link>
                </div>
              </button>
            </div>
          </div>

          <button
            onClick={() => supportCompleteSubmit()}
            disabled={supportStatus === "completed" ? true : false}
            className={` min-w-[150px] min-h-[32px] text-[25px] text-white font-semibold rounded-[8px] flex justify-center items-center ${
              detail?.status === "completed" ? "bg-green" : "bg-border_orange"
            } `}
          >
            {detail?.status === "completed" ? "Completed" : "Complete"}
          </button>
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
            {/* <audio
              controls
              className=" w-full border-[1px] h-[40px] border-gray_title rounded-full"
            >
              <source src={detail?.audio} />
              Your browser does not support the audio element.
            </audio> */}

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
            {detail?.image ? (
              <Image src={detail?.image || "/assets/im2.jpeg"} fill alt="" />
            ) : (
              <div className=" h-[324px] animate-pulse bg-gray_light shadow-md"></div>
            )}
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

export default SupportDetails;
