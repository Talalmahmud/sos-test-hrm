"use client";
import Image from "next/image";
import React, { useContext } from "react";
import NavMenu from "./NavMenu";
import Link from "next/link";
import NavRight2 from "./NavRight2";
import OtherTask from "./OtherTask";
import { AuthContext } from "../ContextProvider";

type Props = {};

const Navbar = (props: Props) => {
  const { globalToggle, setGolbalToggle } = useContext(AuthContext);
  return (
    <div className=" w-full flex items-center px-[16px] h-[64px] border-b-[1px] shadow-md border-gray_light fixed top-0 left-0 z-[30] bg-white ">
      <div className=" xl:w-[1440px] lg:w-[1024px] w-full mx-auto flex justify-between items-center  ">
        <div className=" flex items-center gap-x-[24px] md:gap-x-[72px]">
          <Link href={"/management/dashboard/admin"}>
            <div className=" h-[40px] w-[124px] relative overflow-auto cursor-pointer">
              <Image src={"/assets/sos_logo.svg"} alt="sosLogo" fill priority />
            </div>
          </Link>

          <div
            onClick={() => setGolbalToggle(!globalToggle)}
            className=" h-[24px] w-[22px] relative overflow-auto cursor-pointer"
          >
            <Image src={"/icons/menu_bar.svg"} alt="sosLogo" fill priority />
          </div>
        </div>
        <div className=" flex items-center justify-between w-full">
          <NavMenu />
          {/* <NavRight /> */}
          <div className=" flex items-center gap-[24px]">
            <OtherTask />
            <NavRight2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
