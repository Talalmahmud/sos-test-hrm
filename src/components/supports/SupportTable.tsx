import { EndPoint } from "@/utils/api";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../ContextProvider";

type Props = {
  title: string;
  listData: any;
};

const SupportTable = ({ title, listData }: Props) => {
  const { user } = useContext(AuthContext);
  const urlRouter = useRouter();
  const router = usePathname();
  const routerArray = router.split("/");
  const lastPath = routerArray[routerArray.length - 1];

  const nevigateToDetials = async (supportId: any, supportStatus: any) => {
    const res = await axios.get(
      EndPoint.SUPPORT_STATUS_CHECK +
        `?support_id=${supportId}&teacher_phone_number=${user?.phone_number}`
    );
    const result = await res.data;
    if (result?.processing) {
      window.location.reload();
      // urlRouter.refresh();
      toast.success("This support is being processed by another teacher.");
    } else {
      urlRouter.push(
        `/management/support-details/${supportId}/${supportStatus}`
      );
    }
  };
  return (
    <div className=" w-full">
      {listData?.length !== 0 ? (
        <div className=" w-full flex flex-col justify-center items-center  rounded-[16px] ">
          <h2 className=" text-[24px]   font-smibold">{title}</h2>
          <div className=" shadow-md w-full ">
            <div className="w-full text-center text-[#121212] rounded-[8px]">
              <div className="bg-[#A6ABB7] flex">
                <div className="px-4 py-2 text-[16px] font-semibold flex-1">
                  Serial Number
                </div>
                <div className="px-4 py-2 text-[16px] font-semibold flex-1">
                  Student
                </div>
                <div className="px-4 py-2 text-[16px] font-semibold flex-1">
                  Subject
                </div>
                <div className="px-4 py-2 text-[16px] font-semibold flex-1">
                  Video Title
                </div>
                {lastPath === "completed" && (
                  <div className="px-4 py-2 text-[16px] font-semibold flex-1">
                    Support Time
                  </div>
                )}
                <div className="px-4 py-2 text-[16px] font-semibold flex-1">
                  Status
                </div>
                <div className="px-4 py-2 text-[16px] font-semibold flex-1">
                  View
                </div>
              </div>
              <div className=" w-full overflow-auto rounded-br-[16px] rounded-bl-[16px]">
                {listData?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="w-full py-[10px] text-[16px]  hover:bg-bg_card bg-white border-b-[1px] border-gray_light flex"
                  >
                    <div className={`py-[10px] px-4 flex-1 `}>
                      <div className="flex flex-col">
                        <p>{item?.id}</p>
                        <p className="text-[12px]">
                          {lastPath === "processing"
                            ? item?.updated_at
                            : item?.created_at}
                        </p>
                      </div>
                    </div>
                    <div className="py-[10px] px-4 flex-1">
                      {item?.user?.name}
                    </div>
                    <div className="py-[10px] px-4 flex-1 flex flex-col">
                      <p>{item?.subject?.name}</p>
                      <span className="text-[12px]">{item?.chapter?.name}</span>
                    </div>
                    <div className="py-[10px] px-4 flex-1">
                      {item?.video_title}
                    </div>
                    {lastPath === "completed" && (
                      <div className="py-[10px] px-4 flex-1 text-[12px] font-semibold">
                        {item?.support_duration}
                      </div>
                    )}
                    <div className="py-[10px] px-4 flex-1">{item?.status}</div>
                    <div
                      className="py-[10px] px-4 flex-1 cursor-pointer"
                      onClick={() => nevigateToDetials(item?.id, item?.status)}
                    >
                      <div className="flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#1fcf33"
                          className="w-6 h-6"
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SupportTable;
