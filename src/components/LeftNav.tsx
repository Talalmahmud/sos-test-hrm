"use client";
import { linkList } from "@/utils/staticData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useContext } from "react";
import { AuthContext } from "./ContextProvider";

type Props = {};

const LeftNav = (props: Props) => {
  const router = usePathname();
  const { user, globalToggle } = useContext(AuthContext);

  return (
    // <div className=" fixed left-0 top-[80px] z-20 bg-white border-r-[1px] px-[24px] py-[24px] border-gray_light rounded-[16px] h-[734px] shadow-md flex flex-col items-center gap-[12px]">
    <div
      className={` fixed top-[64px] left-0 h-[600px] no-scrollbar overflow-scroll z-10 bg-white border-r-[1px] px-[24px] py-[24px] border-gray_light rounded-[16px]  shadow-md hidden lg:flex flex-col items-center gap-[12px]`}
    >
      {linkList?.map((item, index) => (
        <Link
          href={item.urlLink}
          key={index}
          // className={`flex`}
          className={`${item?.role?.includes(user?.role) ? "flex" : "hidden"}`}
        >
          <div
            className={` ${
              router.includes(item.pathMatch)
                ? " bg-border_orange border-white"
                : ""
            } flex ${
              globalToggle ? "pl-[8px]" : "px-[8px]"
            }  items-center gap-[4px] ${
              globalToggle ? "w-[216px]" : ""
            } h-[40px] rounded-[8px] cursor-pointer shadow-md `}
          >
            <div>
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={
                router.includes(item.pathMatch) ? "white" : "currentColor"
              }
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg> */}
              <Image src={item?.imgUrl} height={24} width={24} alt="icon" />
            </div>
            {globalToggle && (
              <p
                className={` ${
                  router.includes(item.pathMatch) ? " text-white" : ""
                } `}
              >
                {item.title}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeftNav;
