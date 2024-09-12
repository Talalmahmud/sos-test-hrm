"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import ProfileDropdown from "../ProfileDropdown";
import OthersDropdown from "../OthersDropdown";
import NoticeDropdown from "../NoticeDropdown";
import OutclickHandler from "../OutClickHandle";
import { AuthContext } from "../ContextProvider";

type Props = {};

const NavRight = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  const [otherToggle, setOtherToggle] = useState(false);
  const [noticeToggle, setNoticeToggle] = useState(false);
  const { user } = useContext(AuthContext);

  const handleOutclick = () => {
    setToggle(false);
  };
  // useEffect(() => {
  //   console.log(toggle);
  // }, [toggle]);
  return (
    <div className=" flex items-center gap-[32px]">
      <div
        className=" h-[40px] w-[40px] relative cursor-pointer"
        onClick={() => setOtherToggle(!otherToggle)}
      >
        <Image src={"/icons/menu.svg"} height={40} width={40} alt="img" />
        {otherToggle && <OthersDropdown />}
      </div>
      <div
        className=" relative cursor-pointer"
        onClick={() => setNoticeToggle(!noticeToggle)}
      >
        <Image
          src={"/icons/notification-bing.svg"}
          height={36}
          width={36}
          alt="img"
          className=" rounded-full"
        />
        <div className=" absolute -top-2 -right-[4px] bg-border_orange rounded-full h-[20px] w-[20px] flex items-center justify-center p-[2px] ">
          <span className=" text-white text-[10px] ">23</span>
        </div>
        {noticeToggle && <NoticeDropdown />}
      </div>
      <div className=" flex items-center gap-x-[32px] ">
        <div className=" relative overflow-auto h-[36px] w-[36px] bg-purple rounded-full object-contain">
          {/* <Image src={""} fill alt="img" /> */}
        </div>
        <div
          className=" flex items-center relative cursor-pointer "
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <p>{user?.name}</p>
          <Image
            src={"/icons/arrow-down.svg"}
            height={24}
            width={24}
            alt="img"
          />

          {toggle && (
            <OutclickHandler onOutclick={handleOutclick}>
              <ProfileDropdown />
            </OutclickHandler>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavRight;
