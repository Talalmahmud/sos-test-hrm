import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div
      className=" flex justify-center items-center h-full w-full flex-col gap-[16px]
  "
    >
      <p className=" text-[20px] font-semibold">Page not found </p>
      <Link
        href={"/management/student/list/due"}
        className=" text-[14px] bg-purple text-white rounded-md px-[4px] py-[2px]"
      >
        Go to list page
      </Link>
    </div>
  );
};

export default page;
