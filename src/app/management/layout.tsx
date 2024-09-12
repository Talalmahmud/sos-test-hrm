"use client";
import { AuthContext } from "@/components/ContextProvider";
import LeftNav from "@/components/LeftNav";
import MobileLeftNav from "@/components/MobileLeftNav";
import Navbar from "@/components/navbar/Navbar";
import React, { useContext } from "react";

type Props = {
  children: React.ReactNode;
};

const ManagementLayout = ({ children }: Props) => {
  const { globalToggle } = useContext(AuthContext);
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="mt-[64px] flex">
        <LeftNav />
        <MobileLeftNav />
        <div
          className={`${
            globalToggle ? "xl:ml-[260px] ml-0" : "xl:ml-[89px] ml-0"
          }  px-[16px] py-[8px] w-full h-[calc(100vh-20px)] overflow-y-auto`}
        >
          {children}
        </div>
      </div>
    </div>

    // <div className=" ">
    //   <Navbar />
    //   <div className="  flex pt-[80px]">
    //     <LeftNav />
    //     <div className=" ml-[264px] px-[16px] py-[24px] w-full ">
    //       {children}
    //     </div>
    //   </div>
    // </div>
  );
};

export default ManagementLayout;
