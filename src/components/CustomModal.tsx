"use client";
import React from "react";
import ReactNode from "react";

type Props = {
  children: React.ReactNode;
  setClose: any;
};

const CustomModal = ({ setClose, children }: Props) => {
  return (
    <div className=" h-[100%] min-w-full flex justify-center items-center bg-text_gray fixed top-0 left-0 z-50 transition-all">
      <div className=" fixed top-4 right-8 text-white">
        <div onClick={() => setClose(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 stroke-2 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CustomModal;
