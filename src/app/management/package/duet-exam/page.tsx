import DuetPackage from "@/components/package/duet/DuetPackage";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className=" w-full">
      <DuetPackage />
    </div>
  );
};

export default page;
